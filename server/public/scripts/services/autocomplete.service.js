myApp.factory('AutocompleteService', function($http, $location , ItemsService){
  console.log('AutocompleteService Loaded');

  var autocompletePackage = {}

  var itemsService = ItemsService;

  var AutocompleteService = {

    autocompletePackage : autocompletePackage,

    getStudents : function(){
      console.log('Getting Students');
      $http.get('/users/students').then(function(response){
        console.log(response.data);
        autocompletePackage.studentsList = response.data;
      });
    },

    getItems: function(){
      console.log('get items');
      $http.get('/items').then(function(response){
        console.log(response);
        autocompletePackage.itemList = response.data;
        console.log(autocompletePackage.itemList);
      });
    },

    complete : function(string, array, input){
      var searchOutputItems = [];
      var searchOutputUsers = [];
      autocompletePackage.filterData = {};
      console.log(array);
      array.forEach(function(data){
        console.log(data);
        if(string == ""){
          autocompletePackage.showMe = true;
        }
        else{
          autocompletePackage.showMe = false;
        }
        //students.name refers to the list of students that will appear while typing
        //all strings are set to lowercase to prevent case sensitivity.
        //students are pushed to an array, 'searchOutput'
        if(input == 'items'){
          console.log(data);
          console.log(data.item_name);
          if(data.item_name.toLowerCase().indexOf(string.toLowerCase()) >=0 ){
            searchOutputItems.push(data);
            // console.log(data.name);
          }
        }
        else if( input == 'users'){
          console.log(data.name);
          if(data.name.toLowerCase().indexOf(string.toLowerCase()) >=0 ){
            searchOutputUsers.push(data);
            // console.log(data.name);
          }
        }

      });
      autocompletePackage.filterData.items = searchOutputItems;
      console.log(autocompletePackage.filterData.items);
      autocompletePackage.filterData.users = searchOutputUsers;
    },

    studentTextbox : function(string){
      autocompletePackage.selectedData = string;
      autocompletePackage.students = autocompletePackage.selectedData.name;
      console.log("The selected data's information: ", autocompletePackage.selectedData);
      if(string){
        autocompletePackage.showMe = true;
      }
    },

    itemsTextbox : function(string){
      autocompletePackage.item = string;
      autocompletePackage.itemName = itemList.item.name;
      console.log("The selected data's information: ", itemsList.selectedData);
      if(string){
        autocompletePackage.showMe = true;
      }
    }

  } //end managerService

  return AutocompleteService;
});
