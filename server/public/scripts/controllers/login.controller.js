myApp.controller('LoginController', function($http, $location, UserService) {
  console.log('LoginController created');
  var vm = this;
  vm.user = {
    username: '',
    password: ''
  };
  vm.message = '';
  vm.login = function() {
    console.log('LoginController -- login');
    if(vm.user.username === '' || vm.user.password === '') {
      vm.message = "Enter your username and password!";
    } else {
      console.log('LoginController -- login -- sending to server...', vm.user);
      $http.post('/', vm.user).then(function(response) {
        if(response.data.username) {
          console.log('LoginController -- login -- success: ', response.data);
          // location works with SPA (ng-route)
          if(response.data.role == STUDENT_ROLE){
             $location.path('/student');
          }else if (response.data.role == TEACHER_ROLE){
             $location.path('/teacher');
          }else if(response.data.role == STORE_MANAGER_ROLE){
             $location.path('/storefront');
          }else if(response.data.role == ADMIN_ROLE){
            $location.path('/adminusers');
          }else {
             $location.path('/user');
          }
          // $location.path('/user'); // http://localhost:5000/#/user
        } else {
          console.log('LoginController -- login -- failure: ', response);
          vm.message = "Please check your username or password";
        }
      }).catch(function(response){
        console.log('Please check your username or password', response);
        vm.message = "Please check your username or password";
      });
    }
  };
  vm.registerUser = function() {
    console.log('LoginController -- registerUser');
    if(vm.user.username === '' || vm.user.password === '') {
      vm.message = "Choose a username and password!";
    } else {
      console.log('LoginController -- registerUser -- sending to server...', vm.user);
      $http.post('/register', vm.user).then(function(response) {
        console.log('LoginController -- registerUser -- success');
        $location.path('/home');
      }).catch(function(response) {
        console.log('LoginController -- registerUser -- error');
        vm.message = "Please try again."
      });
    }
  };
});
