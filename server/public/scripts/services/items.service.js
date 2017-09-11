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
          swal(
            'Great!',
            'New item has been added to the store',
            'success'
          );

          // refresh items
          itemsService.getItems();
        });
      }
      else {
        // item doesn't have all of the needed info
        swal(
          'Missing information!',
          'Please for missing fields.',
          'error'
        );
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
      swal({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!'
      }).then(function () {
        $http.delete('/items/' + item.id).then(function(response){
          //refresh items
          itemsService.getItems();
        });
        swal(
        'Deleted!',
        'The item has been deleted',
        'success'
      )
      })
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
