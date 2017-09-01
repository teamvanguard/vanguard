myApp.controller('StudentItemsController', function(UserService, ItemsService, UsersService, ChallengesService) {
  console.log('StudentItemsController created');
  var sic = this;
  sic.userService = UserService;
  sic.userObject = UserService.userObject
  sic.itemsService = ItemsService;
  sic.usersService = UsersService;
  sic.challengesService = ChallengesService;

  sic.itemsService.getItems();


});
