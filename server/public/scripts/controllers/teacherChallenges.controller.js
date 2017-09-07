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

  tcc.changeView = function(){
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
        tcc.changeView();  
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

}); // end TeacherChallengesController
