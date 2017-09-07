myApp.controller('TeacherChallengesController', function(UserService, $http, ChallengesService) {
  console.log('TeacherChallengesController created');
  var tcc = this;
  tcc.userService = UserService;
  tcc.newChallenge = {};

  tcc.challengesService = ChallengesService;
  tcc.challenges = ChallengesService.challenges;

  tcc.challengesService.getChallenges();

  tcc.view = 'challenges';

  tcc.currentChallenge = {};
  tcc.picker = { start_date: false, end_date:false };
  tcc.openCalender = OpenCalender;
  tcc.openCalender2 = OpenCalender2;

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

  tcc.today = function() {
  tcc.dt = new Date();
};
tcc.today();

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
    tcc.changeView = function(){
    if (tcc.view == 'challenges') {
      tcc.view = 'students';
    } else if (tcc.view == 'students') {
      tcc.view = 'challenges'
    }
  }

  tcc.getStudents = function(challengeId) {
    console.log('controller get students');
    ChallengesService.getStudents(challengeId).then(function(response){
      console.log(response);
      tcc.currentChallenge.id = challengeId;
      tcc.currentChallenge.students = response.data;
      if(tcc.view != 'students'){
        tcc.changeView();
      }
    });
  }

  tcc.failStudent = function(studentId, challengeId) {
    console.log('failStudent');
    console.log(studentId);
    console.log(challengeId);
    var data = {
      studentId: studentId,
      challengeId: challengeId,
      pass: false
    };

    $http.put('/challenges/students', data).then(function(response){
      console.log(response);
      tcc.getStudents(challengeId);
    })
  }

  tcc.readdStudent = function(studentId, challengeId) {
    console.log('failStudent');
    console.log(studentId);
    console.log(challengeId);
    var data = {
      studentId: studentId,
      challengeId: challengeId,
      pass: true
    };

    $http.put('/challenges/students', data).then(function(response){
      console.log(response);
      tcc.getStudents(challengeId);
    })
  }

}); // end TeacherChallengesController
