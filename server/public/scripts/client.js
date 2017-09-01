var myApp = angular.module('myApp', ['xeditable', 'ngRoute', 'ngAnimate', 'ui.bootstrap']);

/// Routes ///
myApp.config(function($routeProvider, $locationProvider) {
  $locationProvider.hashPrefix('');
  console.log('myApp -- config')
  $routeProvider
    .when('/home', {
      templateUrl: '/views/templates/home.html',
      controller: 'LoginController as lc',
    })
    .when('/register', {
      templateUrl: '/views/templates/register.html',
      controller: 'LoginController as lc'
    })
    .when('/student', {
      templateUrl: '/views/templates/student.html',
      // controller: 'TeacherController as tc'
    })
    .when('/user', {
      templateUrl: '/views/templates/user.html',
      controller: 'UserController as uc',
      resolve: {
        getuser : function(UserService){
          return UserService.getuser();
        }
      }
    })
    .when('/storefront', {
      templateUrl: '/views/templates/storefront.html',
      controller: 'ManagerStorefrontController as msc',
      resolve: {
        getuser : function(UserService){
          return UserService.getuser();
        }
      }
    })
    .when('/info', {
      templateUrl: '/views/templates/info.html',
      controller: 'InfoController',
      resolve: {
        getuser : function(UserService){
          return UserService.getuser();
        }
      }
    })
    .when('/teachers', {
      templateUrl: '/views/templates/teachers.html',
      controller: 'TeacherChallengesController as tcc',
      resolve: {
        getuser : function(UserService){
          return UserService.getuser();
        }
      }
    })
    .when('/adminusers', {
      templateUrl: '/views/templates/admin.view.users.html',
      controller: 'AdminViewUsersController as avuc',
      resolve: {
        getuser : function(UserService){
          return UserService.getuser();
        }
      }
    })
    .otherwise({
      redirectTo: 'home'
    });
});
