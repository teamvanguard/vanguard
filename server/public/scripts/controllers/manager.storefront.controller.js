myApp.controller('ManagerStorefrontController', function(UserService, $http) {
  console.log('ManagerStorefrontController created');
  var msc = this;
  msc.userService = UserService;
  msc.newItem = {};

  msc.studentsArray = [];

  msc.getStudents = function(){
    console.log('Getting Students');
    $http.get('/users/students').then(function(response){
      console.log(response);
      msc.studentsList = response.data;
      for (var i = 0; i < msc.studentsList.length; i++) {
        msc.studentsArray.push(msc.studentsList[i]);
      }
      console.log(msc.studentsArray);
    });
  };
  msc.getStudents();
  // msc.showStudent = function(student, students) {
  //   console.log(student);
  //   console.log(students);
  // }
  msc.complete = function(string){
    var output = [];
    console.log(msc.studentsArray);
    console.log(msc.students);
    msc.studentsArray.forEach(function(students){
      if(string == ""){
        msc.showMe = true;
      }else{
        msc.showMe = false;
      }
      if(students.name.toLowerCase().indexOf(string.toLowerCase()) >=0 ){
        output.push(students);
        console.log(students);
      }
    });
    msc.filterStudents = output;
  };
  msc.textbox = function(string){
    msc.selectedStudent = string;
    msc.students = msc.selectedStudent.name;
    if(string){
      msc.showMe = true;
    }
  };


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
    })
  };




}); //end of controller
