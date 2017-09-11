myApp.factory('AutocompleteService', function($http, $location , ItemsService){
  console.log('AutocompleteService Loaded');

  var autocompletePackage = {}

  var itemsService = ItemsService;

  var AutocompleteService = {

    autocompletePackage : autocompletePackage,

// get list of students to use in autocomplete
    getStudents : function(){
      console.log('Getting Students');
      return $http.get('/users/students').then(function(response){
        autocompletePackage.studentsList = response.data;
        return response.data;
        // console.log(response.data);
      });
    },

// get list of items to use in autocomplete
    getItems: function(){
      console.log('get items');
      $http.get('/items').then(function(response){
        autocompletePackage.itemList = response.data;
      });
    },

// autocomplete function that runs everytime there is user input
    complete : function(userInput, arrayOfData, type){
      var searchOutputItems = [];
      var searchOutputUsers = [];
      autocompletePackage.filterData = {};
      arrayOfData.forEach(function(data){
        if(userInput == ""){
          autocompletePackage.showMe = true;
        }
        else{
          autocompletePackage.showMe = false;
        }
        //students.name refers to the list of students that will appear while typing
        if(type == 'items'){
          //all strings are set to lowercase to prevent case sensitivity.
          if(data.item_name.toLowerCase().indexOf(userInput.toLowerCase()) >=0 ){
          //students are pushed to an array, 'searchOutputItems or searchOutputUsers'
            searchOutputItems.push(data);
          }
        }
        else if( type == 'users'){
          if(data.name.toLowerCase().indexOf(userInput.toLowerCase()) >=0 ){
            searchOutputUsers.push(data);
          }
        }

      });
      autocompletePackage.filterData.items = searchOutputItems;
      autocompletePackage.filterData.users = searchOutputUsers;
    }, //end of complete function

// regulates the drop down of options for the student autocomplete
    studentTextbox : function(selectedData){
      autocompletePackage.selectedStudent = selectedData;
      //the selected item becomes the ng-model
      autocompletePackage.students = autocompletePackage.selectedStudent.name;
      if(selectedData){
        autocompletePackage.showMe = true;
      }
    },

// regulates the drop down of options for the student autocomplete
    itemsTextbox : function(selectedData){
      autocompletePackage.selectedItem = selectedData;
      //the selected item becomes the ng-model
      autocompletePackage.itemName = autocompletePackage.selectedItem.item_name;
      if(selectedData){
        autocompletePackage.showMe = true;
      }
    }

  } //end managerService

  return AutocompleteService;
});
