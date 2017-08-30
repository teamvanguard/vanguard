myApp.controller('StudentHomeController', function(UserService, ItemsService, UsersService, ChallengesService) {
  console.log('StudentHomeController created');
  var shc = this;
  shc.userService = UserService;
  shc.userObject = UserService.userObject
  shc.itemsService = ItemsService;
  shc.usersService = UsersService;
  shc.challengesService = ChallengesService;
});
