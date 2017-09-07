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
