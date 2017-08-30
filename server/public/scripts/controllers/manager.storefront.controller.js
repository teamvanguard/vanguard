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


// msc.getStudents = function(){
//   console.log('Getting Students');
//   $http.get('/users/students').then(function(response){
//     console.log(response.data);
//     msc.studentsList = response.data;
//   });
// };
//
// msc.getStudents();
//
// msc.complete = function(string, array){
//   var searchOutput = [];
//   // console.log(array);
//   // console.log("Complete list of students", array);
//   // console.log("Typing: ", msc.students);
//   array.forEach(function(data){
//     // console.log(data);
//     if(string == ""){
//       msc.showMe = true;
//     }else{
//       msc.showMe = false;
//     }
//     //students.name refers to the list of students that will appear while typing
//     //all strings are set to lowercase to prevent case sensitivity.
//     //students are pushed to an array, 'searchOutput'
//     if(data.name.toLowerCase().indexOf(string.toLowerCase()) >=0 ){
//       searchOutput.push(data);
//       // console.log(data.name);
//     }
//   });
//   msc.filterData = searchOutput;
// };
//
// msc.textbox = function(string){
//   msc.selectedData = string;
//   msc.students = msc.selectedData.name;
//   console.log("The selected data's information: ", msc.selectedData);
//   if(string){
//     msc.showMe = true;
//   }
// };
