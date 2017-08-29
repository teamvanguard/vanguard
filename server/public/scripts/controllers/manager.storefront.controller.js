myApp.controller('ManagerStorefrontController', function(UserService, $http, ItemsService) {
  console.log('ManagerStorefrontController created');
  var msc = this;
  msc.userService = UserService;
  msc.newItem = {};
  msc.itemsService = ItemsService;
  msc.itemList = ItemsService.itemList;
  msc.itemsService.getItems();
  console.log(msc.itemList);
});
