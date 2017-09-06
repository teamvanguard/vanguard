myApp.controller('ManagerStorefrontController', function(UserService, $http, ItemsService, AutocompleteService) {
  console.log('ManagerStorefrontController created');
  var msc = this;
  msc.userService = UserService;
  msc.newItem = {
    school_community: 'true'
  };

  msc.autocompleteService = AutocompleteService;
  msc.autocompletePackage = AutocompleteService.autocompletePackage;
  msc.autocompleteService.getStudents();
  msc.autocompleteService.getItems();

  msc.itemsService = ItemsService;
  msc.itemList = ItemsService.itemList;

  msc.itemsService.getItems();
  msc.orderBy = 'item_name';
  msc.filterType = "";

  msc.changeOrderBy = function(property) {
    console.log(property);
    if (msc.orderBy != property) {
      msc.orderBy = property;
    } else {
      msc.orderBy = '-' + property;
    }
  }


}); //end of controller
