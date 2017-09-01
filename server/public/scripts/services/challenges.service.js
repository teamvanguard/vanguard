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


   addChallenge: function(newChallenge) {
      console.log(newChallenge);
      $http.post('/challenges', newChallenge).then(function(response) {
        console.log(response);
        challengesService.getChallenges();
      });
    }, // end addChallenge


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
    }, // end deleteChallenge

    acceptChallenge : function(challengeId) {
      $http.post('/students/' + challengeId).then(function(response) {
      console.log(response);
      swal("Challenge Accepted");
    });
  } // end acceptChallenge

  };

 return challengesService;

}); // end challenges service
