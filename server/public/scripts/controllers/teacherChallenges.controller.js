myApp.controller('TeacherChallengesController', function(UserService, $http, ChallengesService) {
  console.log('TeacherChallengesController created');
  var tcc = this;
  tcc.userService = UserService;
  tcc.newChallenge = {};

  tcc.challengesService = ChallengesService;
  tcc.challenges = ChallengesService.challenges;

  tcc.challengesService.getChallenges();

}); // end TeacherChallengesController
