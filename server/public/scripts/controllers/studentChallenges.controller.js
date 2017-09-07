myApp.controller('StudentChallengesController', function($http, UserService, ChallengesService, ItemsService, UsersService) {
  console.log('StudentChallengesController created');

  var scc = this;
  scc.userService = UserService;
  scc.userObject = UserService.userObject;
  scc.itemsService = ItemsService;
  scc.usersService = UsersService;
  scc.challengesService = ChallengesService;

  scc.challengesService.getChallenges();
  scc.userService.getuser();

  scc.acceptChallenge = function(challengeId) {
    ChallengesService.acceptChallenge(challengeId).then(function(response){
      console.log(response);
      scc.getAcceptedChallenges();
      scc.getUnacceptedChallenges().then(function(response) {
        scc.currentChallenges = response;
      });
    })
  }

  scc.getAcceptedChallenges = function() {
    return ChallengesService.getAcceptedChallenges().then(function(response){
      console.log(response);
      scc.acceptedChallenges = response.data;
      scc.acceptedChallenges.accepted = true;
      return scc.acceptedChallenges
    })
  }

  scc.getUnacceptedChallenges = function() {
    return ChallengesService.getUnacceptedChallenges().then(function(response){
      console.log(response);
      scc.unacceptedChallenges = response.data;
      scc.unacceptedChallenges.accepted = false;
      return scc.unacceptedChallenges
    })
  }

  scc.getAcceptedChallenges();
  scc.getUnacceptedChallenges().then(function(response) {
    scc.currentChallenges = response;
  });
});
