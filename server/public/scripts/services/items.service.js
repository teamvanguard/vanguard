myApp.factory('ItemsService', function($http, $location){
  console.log('ItemsService Loaded');


  var itemsService = {

    itemList: [],

    submitNewItem: function(newItem){
      console.log(newItem);
      $http.post('/items', newItem).then(function(response){
        console.log(response);
        itemsService.getItems();
      });
    },

    getItems: function(){
      console.log('get items');
      $http.get('/items').then(function(response){
        console.log(response);
        itemsService.itemList = response.data;
        console.log(itemsService.itemList);
      });
    },

    editItem: function(item) {
      console.log('editItem');
      console.log(item);
      console.log(item);
      $http.put('/items', item).then(function(response){
        console.log(response);
        itemsService.getItems();
      });
    },

    deleteItem: function(item) {
      console.log('deleteItem');
      console.log(item);
      $http.delete('/items/' + item.id).then(function(response){
        console.log(response);
        itemsService.getItems();
      });
    },

    sellItem: function(item, student){
      console.log('sell item');
      console.log(item);
      console.log(student);
      var data = {
        item: item,
        student: student
      };
      console.log(data);
      $http.put('/users/sell', data).then(function(response) {
        console.log(response);
        itemsService.getItems();
      });
    },

    itemsTextbox : function(string){
      itemList.selectedData = string;
      itemList.items = itemList.selectedData.name;
      console.log("The selected data's information: ", itemsList.selectedData);
      if(string){
        msc.autocompletePackage.showMe = true;
      }
    }
  }

  return itemsService
});
