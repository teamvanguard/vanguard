myApp.controller('StudentChallengesController', function(UserService, $http, ChallengesService) {
  console.log('StudentChallengesController created');
  var scc = this;
  scc.userService = UserService;
  scc.newStudent = {};
  scc.challengesService = ChallengesService;
  scc.challenges = ChallengesService.challenges;
  scc.challengesService.getChallenges();
  console.log(scc.challenges);
}); // end TeacherChallengesController
