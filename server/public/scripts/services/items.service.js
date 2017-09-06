myApp.factory('ItemsService', function($http, $location){
  console.log('ItemsService Loaded');


  var itemsService = {

    itemList: [],

// submit a new item
    submitNewItem: function(newItem){
      console.log('submitNewItem');
      //make sure newItem has all needed information
      if (newItem.name && newItem.description && newItem.pts_value && newItem.qty && newItem.school_community) {
        $http.post('/items', newItem).then(function(response){
          // refresh items
          itemsService.getItems();
        });
      }
      else {
        // item doesn't have all of the needed info
        console.log('fill out all the info');
      }
    },

// get list of items
    getItems: function(){
      console.log('get items');
      $http.get('/items').then(function(response){
        itemsService.itemList = response.data;
      });
    },

// edit an item
    editItem: function(item) {
      console.log('editItem');
      $http.put('/items', item).then(function(response){
        // refresh items
        itemsService.getItems();
      });
    },

// delete an item
    deleteItem: function(item) {
      console.log('deleteItem');
      $http.delete('/items/' + item.id).then(function(response){
        //refresh items
        itemsService.getItems();
      });
    },

// sell an item
    sellItem: function(item, student){
      console.log('sell item');
      // define item to send to server
      var data = {
        item: item,
        student: student
      };
      $http.put('/users/sell', data).then(function(response) {
        // refresh item list
        itemsService.getItems();
      });
      // give user feedback
      swal(
        'Great',
        'The item has been sold!',
        'success'
      );
    }
  }

  return itemsService
});
