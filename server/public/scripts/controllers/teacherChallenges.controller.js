myApp.controller('TeacherChallengesController', function(UserService, $http) {
  console.log('TeacherChallengesController created');
  var tcc = this;
  tcc.userService = UserService;
  tcc.challenges = [];
  tcc.rewards = [];
  tcc.newChallenge = {};


  tcc.getChallenges = function() {
    console.log('get challenges');
    $http.get('/challenges').then(function(response) {
      console.log(response);
      tcc.challenges = response.data;
    });
  }; // end getChallenges


  tcc.addChallenge = function(newChallenge) {
    console.log(newChallenge);
    $http.post('/challenges', newChallenge).then(function(response) {
      console.log(response);
      tcc.getChallenges();
    });
  }; // end addChallenge


  tcc.updateChallenge = function(challenge) {
    console.log('update challenge');
    console.log(challenge);
    $http.put('/challenges', challenge).then(function(response) {
      console.log(response);
      tcc.getChallenges();
    });
  }; // end updateChallenge


  tcc.deleteChallenge = function(challenge) {
    console.log('deleteChallenge');
    console.log(challenge);
    $http.delete('/challenge/' + challenge.id).then(function(response) {
      console.log(response);
      tcc.getChallenges();
    });
  }; // end deleteChallenge

  tcc.getChallenges();


}); // end TeacherChallengesController
