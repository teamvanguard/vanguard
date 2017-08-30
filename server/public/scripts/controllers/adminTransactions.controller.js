myApp.controller('AdminTransactionsController', function(UserService, ItemsService, UsersService, ChallengesService) {
  console.log('AdminTransactionsController created');
  var atc = this;
  atc.userService = UserService;
  atc.userObject = UserService.userObject
  atc.itemsService = ItemsService;
  atc.usersService = UsersService;
  atc.challengesService = ChallengesService;
});
