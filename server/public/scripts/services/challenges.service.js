myApp.factory('ChallengesService', function($http, $location) {
  console.log('ChallengesService Loaded');

 var challengesService = {

   challenges: [],

   getChallenges: function() {
      console.log('get challenges');
      $http.get('/challenges').then(function(response) {
        console.log(response);
        challengesService.challenges = response.data;
      });
    }, // end getChallenges


// Ale start
    acceptStudentChallenge: function() {
      console.log('accept student challenges');
      $http.get('/challenges/:studentId').then(function(response){
        console.log(response);
        challengesService.challenges = response.data;
      });
    }, // end acceptStudentChallenge
// Ale end

   addChallenge: function(newChallenge) {
      console.log(newChallenge);
      $http.post('/challenges', newChallenge).then(function(response) {
        console.log(response);
        challengesService.getChallenges();
      });
    }, // end addChallenge

// Ale start
    addChallengeToStudent: function(newStudent) {
       console.log(newStudent);
       $http.post('/challenges/addStudent', newStudent).then(function(response) {
         console.log(response);
         challengesService.acceptStudentChallenge();
       });
     }, // end addChallenge
     // Ale end


   updateChallenge: function(challenge) {
      console.log('update challenge');
      console.log(challenge);
      $http.put('/challenges', challenge).then(function(response) {
        console.log(response);
        challengesService.getChallenges();
      });
    }, // end updateChallenge


   deleteChallenge: function(challenge) {
      console.log('deleteChallenge');
      console.log(challenge);
      $http.delete('/challenge/' + challenge.id).then(function(response) {
        console.log(response);
        challengesService.getChallenges();
      });
    } // end deleteChallenge
  };

 return challengesService;

}); // end challenges service
