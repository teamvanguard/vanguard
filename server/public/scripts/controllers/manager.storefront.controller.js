myApp.controller('ManagerStorefrontController', function(UserService, $http) {
  console.log('ManagerStorefrontController created');
  var msc = this;
  msc.userService = UserService;
  msc.newItem = {};
  msc.submitNewItem = function(newItem){
    console.log(newItem);
    $http.post('/items', newItem).then(function(response){
      console.log(response);
      msc.getItems();
    });
  };
  msc.getItems = function(){
    console.log('get items');
    $http.get('/items').then(function(response){
      console.log(response);
      msc.itemList = response.data;
    });
  };
  msc.editItem = function(item) {
    console.log('editItem');
    console.log(item);
    item.item_name = 'hello';
    console.log(item);
    $http.put('/items', item).then(function(response){
      console.log(response);
      msc.getItems();
    });
  };
  msc.deleteItem = function(item) {
    console.log('deleteItem');
    console.log(item);
    $http.delete('/items/' + item.id).then(function(response){
      console.log(response);
      msc.getItems();
    });
  };
  msc.sellItem = function(){
    console.log('sell item');
    var item = msc.itemList[10];
    var student = {studentId: 372837};
    var data = {
      item: item,
      student: student
    };
    $http.put('/users/sell', data).then(function(response) {
      console.log(response);
    });
  };
  msc.getItems();
});
