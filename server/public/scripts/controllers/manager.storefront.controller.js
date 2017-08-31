myApp.controller('ManagerStorefrontController', function(UserService, $http, ItemsService, AutocompleteService) {
  console.log('ManagerStorefrontController created');
  var msc = this;
  msc.userService = UserService;
  msc.newItem = {};

  msc.autocompleteService = AutocompleteService;
  msc.autocompletePackage = AutocompleteService.autocompletePackage;
  msc.autocompleteService.getStudents();
  msc.autocompleteService.getItems();

  msc.itemsService = ItemsService;
  msc.itemList = ItemsService.itemList;

  msc.itemsService.getItems();


}); //end of controller
