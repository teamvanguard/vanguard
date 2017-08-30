myApp.controller('StudentChallenegesController', function(UserService, ItemsService, UsersService, ChallengesService) {
  console.log('StudentChallenegesController created');
  var scc = this;
  scc.userService = UserService;
  scc.userObject = UserService.userObject
  scc.itemsService = ItemsService;
  scc.usersService = UsersService;
  scc.challengesService = ChallengesService;
});
