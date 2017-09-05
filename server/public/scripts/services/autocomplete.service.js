myApp.factory('AutocompleteService', function($http, $location , ItemsService){
  console.log('AutocompleteService Loaded');

  var autocompletePackage = {}

  var itemsService = ItemsService;

  var AutocompleteService = {

    autocompletePackage : autocompletePackage,

    getStudents : function(){
      console.log('Getting Students');
      $http.get('/users/students').then(function(response){
        // console.log(response.data);
        autocompletePackage.studentsList = response.data;
      });
    },

    getItems: function(){
      console.log('get items');
      $http.get('/items').then(function(response){
        // console.log(response);
        autocompletePackage.itemList = response.data;
        // console.log(autocompletePackage.itemList);
      });
    },

    complete : function(string, array, input){
      var searchOutputItems = [];
      var searchOutputUsers = [];
      autocompletePackage.filterData = {};
      // console.log(array);
      array.forEach(function(data){
        // console.log(data);
        if(string == ""){
          autocompletePackage.showMe = true;
        }
        else{
          autocompletePackage.showMe = false;
        }
        //students.name refers to the list of students that will appear while typing
        if(input == 'items'){
          // console.log(data.item_name);
          //all strings are set to lowercase to prevent case sensitivity.
          if(data.item_name.toLowerCase().indexOf(string.toLowerCase()) >=0 ){
          //students are pushed to an array, 'searchOutputItems or searchOutputUsers'
            searchOutputItems.push(data);
          }
        }
        else if( input == 'users'){
          // console.log(data.name);
          if(data.name.toLowerCase().indexOf(string.toLowerCase()) >=0 ){
            searchOutputUsers.push(data);
          }
        }

      });
      autocompletePackage.filterData.items = searchOutputItems;
      autocompletePackage.filterData.users = searchOutputUsers;
    }, //end of complete function

    studentTextbox : function(string){
      // console.log(string);
      autocompletePackage.selectedStudent = string;
      //the selected item becomes the ng-model
      autocompletePackage.students = autocompletePackage.selectedStudent.name;
      console.log("The selected data's information: ", autocompletePackage.selectedStudent);
      if(string){
        autocompletePackage.showMe = true;
      }
    },

    itemsTextbox : function(string){
      // console.log(string);
      autocompletePackage.selectedItem = string;
      autocompletePackage.itemName = autocompletePackage.selectedItem.item_name;
      if(string){
        autocompletePackage.showMe = true;
      }
    }

  } //end managerService

  return AutocompleteService;
});
