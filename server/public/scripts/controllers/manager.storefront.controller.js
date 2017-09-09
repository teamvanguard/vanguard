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
  msc.orderBy = '';
  msc.filterType = "";

  msc.changeOrderBy = function(property) {
    console.log(property);
    if (msc.orderBy != property) {
      msc.orderBy = property;
    } else {
      msc.orderBy = '-' + property;
    }
  }

  msc.client = filestack.init('AKuV0DiBTT5OJNRrMUmTTz');

     msc.showPicker = function() {
         msc.client.pick({
         }).then(function(result) {
           msc.newItem.item_image = result.filesUploaded[0].url;
           console.log(result.filesUploaded[0].url);
            //  console.log(JSON.stringify(result.filesUploaded));
             swal("Image Successfully Uploaded");
            //  console.log(msc.newItem.image);
         });
     }
}); //end of controller
