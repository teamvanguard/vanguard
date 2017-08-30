myApp.factory('AutocompleteService', function($http, $location){
  console.log('AutocompleteService Loaded');

  var autocompletePackage = {}

  var AutocompleteService = {

    autocompletePackage : autocompletePackage,

    getStudents : function(){
      console.log('Getting Students');
      $http.get('/users/students').then(function(response){
        console.log(response.data);
        autocompletePackage.studentsList = response.data;
      });
    },

    complete : function(string, array){
      var searchOutput = [];
      // console.log(array);
      // console.log("Complete list of students", array);
      // console.log("Typing: ", msc.students);
      array.forEach(function(data){
        // console.log(data);
        if(string == ""){
          autocompletePackage.showMe = true;
        }else{
          autocompletePackage.showMe = false;
        }
        //students.name refers to the list of students that will appear while typing
        //all strings are set to lowercase to prevent case sensitivity.
        //students are pushed to an array, 'searchOutput'
        if(data.name.toLowerCase().indexOf(string.toLowerCase()) >=0 ){
          searchOutput.push(data);
          // console.log(data.name);
        }
      });
      autocompletePackage.filterData = searchOutput;
    },

    studentTextbox : function(string){
      autocompletePackage.selectedData = string;
      autocompletePackage.students = autocompletePackage.selectedData.name;
      console.log("The selected data's information: ", autocompletePackage.selectedData);
      if(string){
        autocompletePackage.showMe = true;
      }
    }

  } //end managerService

  return AutocompleteService;
});
