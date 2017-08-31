myApp.controller('TeacherItemsController', function(UserService, ItemsService, UsersService, ChallengesService) {
  console.log('TeacherItemsController created');
  var tic = this;
  tic.userService = UserService;
  tic.userObject = UserService.userObject
  tic.itemsService = ItemsService;
  tic.usersService = UsersService;
  tic.challengesService = ChallengesService;
});
