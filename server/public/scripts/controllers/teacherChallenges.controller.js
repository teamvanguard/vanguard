myApp.controller('TeacherChallengesController', function(UserService, $http, ChallengesService, AutocompleteService) {
  console.log('TeacherChallengesController created');
  var tcc = this;
  tcc.userService = UserService;
  tcc.newChallenge = {};

  tcc.myChallenges = false;

  tcc.challengesService = ChallengesService;
  tcc.challenges = ChallengesService.challenges;

  tcc.view = 'challenges';

  tcc.currentChallenge = {};
  tcc.picker = { start_date: false, end_date:false };
  tcc.openCalender = OpenCalender;
  tcc.openCalender2 = OpenCalender2;

  tcc.deleteChallenge = function(challenge) {
    ChallengesService.deleteChallenge(challenge).then(function(response) {
      console.log('challenge deleted');
      swal(
        'Deleted',
        'Your challenge has been deleted',
        'error'
      );
      tcc.getChallenges();
    });
  }

  tcc.addChallenge = function(newChallenge) {
    ChallengesService.addChallenge(newChallenge).then(function(response) {
      console.log(response);
      tcc.getChallenges();
      swal(
        'Great!',
        'New challenge has been added',
        'success'
      );
    });
  }

  tcc.awardPoints = function(student, challenge){
    ChallengesService.awardPoints(student, challenge).then(function(response){
      console.log(response);
      tcc.getStudents(challenge.id)
    });
  }

  tcc.getChallenges = function() {
    if(tcc.myChallenges == true){
      ChallengesService.getMyChallenges().then(function(response) {
        console.log(response);
        tcc.challenges = response
        tcc.myChallenges = true;
      });
    }
    else if (tcc.myChallenges == false) {
      ChallengesService.getChallenges().then(function(response) {
        console.log(response);
        tcc.challenges = response;
        tcc.myChallenges = false;
      });
    }
  }

  tcc.toggleChallenges = function() {
    if(tcc.myChallenges == false) {
      ChallengesService.getMyChallenges().then(function(response) {
        console.log(response);
        tcc.challenges = response
        tcc.myChallenges = true;
      });
    }
    else if(tcc.myChallenges == true) {
      ChallengesService.getChallenges().then(function(response) {
        console.log(response);
        tcc.challenges = response;
        tcc.myChallenges = false;
      });
    }
  }

  tcc.completeChallenge = function(data) {
    ChallengesService.completeChallenge(data).then(function(response){
      tcc.currentChallenge.students = response;
    })
  }

  //tcc.changeView = function(){
    function OpenCalender($event) {
      $event.preventDefault();
      $event.stopPropagation();
      tcc.picker.start_date = !tcc.picker.start_date;
    }

    function OpenCalender2($event) {
      $event.preventDefault();
      $event.stopPropagation();
      tcc.picker.end_date = !tcc.picker.end_date;
    }


  //}
  tcc.fixDate = function(challenge) {
    challenge.end_date = new Date(challenge.end_date);
    challenge.start_date = new Date(challenge.start_date);
  }
  // tcc.endDate = {
  //   end = new Date(tcc.end_date);
  // };

  //tcc.today();

  tcc.clear = function() {
    tcc.dt = null;
  };

  tcc.inlineOptions = {
    customClass: getDayClass,
    minDate: new Date(),
    showWeeks: true
  };

  tcc.dateOptions = {
    dateDisabled: disabled,
    formatYear: 'yy',
    maxDate: new Date(2020, 5, 22),
    minDate: new Date(),
    startingDay: 1
  };

  // Disable weekend selection
  function disabled(data) {
    var date = data.date,
    mode = data.mode;
    return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
  }

  tcc.toggleMin = function() {
    tcc.inlineOptions.minDate = tcc.inlineOptions.minDate ? null : new Date();
    tcc.dateOptions.minDate = tcc.inlineOptions.minDate;
  };

  tcc.toggleMin();

  tcc.open1 = function() {
    tcc.popup1.opened = true;
  };

  tcc.open2 = function() {
    tcc.popup2.opened = true;
  };

  tcc.setDate = function(year, month, day) {
    tcc.dt = new Date(year, month, day);
  };

  tcc.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  tcc.format = tcc.formats[0];
  tcc.altInputFormats = ['M!/d!/yyyy'];

  tcc.popup1 = {
    opened: false
  };

  tcc.popup2 = {
    opened: false
  };

  var tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  var afterTomorrow = new Date();
  afterTomorrow.setDate(tomorrow.getDate() + 1);
  tcc.events = [
    {
      date: tomorrow,
      status: 'full'
    },
    {
      date: afterTomorrow,
      status: 'partially'
    }
  ];

  function getDayClass(data) {
    var date = data.date,
    mode = data.mode;
    if (mode === 'day') {
      var dayToCheck = new Date(date).setHours(0,0,0,0);

      for (var i = 0; i < tcc.events.length; i++) {
        var currentDay = new Date(tcc.events[i].date).setHours(0,0,0,0);

        if (dayToCheck === currentDay) {
          return tcc.events[i].status;
        }
      }
    }
    return '';
  }
  tcc.toggleView = function(){
    if (tcc.view == 'challenges') {
      tcc.view = 'students';
    } else if (tcc.view == 'students') {
      tcc.view = 'challenges'
    }
  }

  tcc.getStudents = function(challenge_id) {
    console.log('controller get students');
    ChallengesService.getStudents(challenge_id).then(function(response){
      console.log(response);
      tcc.currentChallenge.id = challenge_id;
      tcc.currentChallenge.students = response.data;
      if(tcc.view != 'students'){
        tcc.toggleView();
      }
    });
  }

  tcc.failStudent = function(student_id, challenge_id) {
    console.log('failStudent');
    console.log(student_id);
    console.log(challenge_id);
    var data = {
      student_id: student_id,
      challenge_id: challenge_id,
      pass: false
    };

    $http.put('/challenges/students', data).then(function(response){
      console.log(response);
      tcc.getStudents(challenge_id);
    })
  }

  tcc.readdStudent = function(student_id, challenge_id) {
    console.log('failStudent');
    console.log(student_id);
    console.log(challenge_id);
    var data = {
      student_id: student_id,
      challenge_id: challenge_id,
      pass: true
    };

    $http.put('/challenges/students', data).then(function(response){
      console.log(response);
      tcc.getStudents(challenge_id);
    })
  }

  tcc.sendMail = function(){
    //using the getStudents function, returning response as an array with student objects
    //email will not be sent unless form is completely filled
    if (tcc.newChallenge.challenge_name && tcc.newChallenge.description && tcc.newChallenge.start_date &&
      tcc.newChallenge.end_date && tcc.newChallenge.pts_value){
        AutocompleteService.getStudents().then(function(response){
          var emailList = [];
          var emails = {};
          //looping through each object and calling a funtion that pulls each student's email
          response.forEach(output);
          function output(students){
            emailList.push(students.email);
            // console.log(emailList);
            //converting to object to send in http
            emails.emailList = emailList;
          }
          $http.post('/send', emails).then(function(response){
            console.log(response);
          });
          console.log("EMAIL SENT TO ALL STUDENTS!");
        });
      }else{
        console.log("PLEASE FILL OUT ALL CHALLENGE INFORMATION");
      }
    } //end of sendMail function

    tcc.getChallenges();
  }); // end TeacherChallengesController
