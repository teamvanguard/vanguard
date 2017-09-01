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

  scc.acceptChallenge =  function(challengeId) {
    $http.post('/students/' + challengeId).then(function(response) {
    console.log(response);
    })
   } // end addChallenge

});
