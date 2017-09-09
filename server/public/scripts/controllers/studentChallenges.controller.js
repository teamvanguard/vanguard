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

  scc.acceptedChallenges = {};
  scc.unacceptedChallenges = {};

  scc.acceptChallenge = function(challengeId) {
    ChallengesService.acceptChallenge(challengeId)
    .then(function(response){
      console.log('controller', response);
      swal(
        'Good job!',
        'You selected a challange!',
        'success'
      );
      scc.getAcceptedChallenges();
      ChallengesService.getUnacceptedChallenges().then(function(response) {
        scc.currentChallenges.challenges = response.data;
        console.log(scc.currentChallenges);
      });
    })
  }

  scc.getAcceptedChallenges = function() {
    return ChallengesService.getAcceptedChallenges().then(function(response){
      console.log('acceptedChallenges', response);
      scc.acceptedChallenges.challenges = response.data;
      scc.acceptedChallenges.accepted = true;
      return scc.acceptedChallenges
    })
  }

  scc.getUnacceptedChallenges = function() {
    return ChallengesService.getUnacceptedChallenges().then(function(response){
      console.log('unacceptedChallenges', response);
      scc.unacceptedChallenges.challenges = response.data;
      scc.unacceptedChallenges.accepted = false;
      return scc.unacceptedChallenges
    })
  }

  scc.getAcceptedChallenges();
  scc.getUnacceptedChallenges().then(function(response) {
    console.log('currentChallenges', response.challenges);
    scc.currentChallenges = response;
  });
});
