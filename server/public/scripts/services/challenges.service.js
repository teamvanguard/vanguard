myApp.factory('ChallengesService', function($http, $location) {
  console.log('ChallengesService Loaded');

  var challengesService = {

    challenges: [],

    getStudents: function(challengeId) {
      console.log('getStudents');
      console.log(challengeId);
      return $http.get('/challenges/students/' + challengeId).then(function(response) {
        return response
      });
    },

//get the list of all challenges
    getChallenges: function() {
      console.log('get challenges');
      $http.get('/challenges').then(function(response) {
        challengesService.challenges = response.data;
      });
    }, // end getChallenges


    // Ale start
    // acceptStudentChallenge: function() {
    //   console.log('accept student challenges');
    //   $http.get('/challenges/:student_id').then(function(response){
    //     console.log(response);
    //     challengesService.challenges = response.data;
    //   });
    // }, // end acceptStudentChallenge
    // Ale end

// add a new challenge (only teachers)
    addChallenge: function(newChallenge) {
      // check if newChallenge has all of the needed info
      if (newChallenge.challenge_name && newChallenge.description && newChallenge.start_date
        && newChallenge.end_date && newChallenge.pts_value) {
          console.log('addChallenge');
          $http.post('/challenges', newChallenge).then(function(response) {
            //refresh challenges
            challengesService.getChallenges();
          });
        }
        else {
          // newChallenge is missing some info
          console.log('please fill out all the info');
        }
      }, // end addChallenge

      // // Ale start
      //     addChallengeToStudent: function(newStudent) {
      //        console.log(newStudent);
      //        $http.post('/challenges/addStudent', newStudent).then(function(response) {
      //          console.log(response);
      //          challengesService.acceptStudentChallenge();
      //        });
      //      }, // end addChallenge
      //      // Ale end

// make updates to the challenge
      updateChallenge: function(challenge) {
        console.log('update challenge');
        $http.put('/challenges', challenge).then(function(response) {
          // refresh challenges
          challengesService.getChallenges();
        });
      }, // end updateChallenge

//delete a challenge
      deleteChallenge: function(challenge) {
        console.log('deleteChallenge');
        $http.delete('/challenges/' + challenge.id).then(function(response) {
          // refresh challenges
          challengesService.getChallenges();
        });
      }, // end deleteChallenge

// students accept a challenge
      acceptChallenge : function(challengeId) {
        console.log('acceptChallenge');
        $http.post('/students/' + challengeId).then(function(response) {
          //refresh challenges
          challengesService.getChallenges();
          // provide user feedback
          swal(
            'Good job!',
            'You selected a challange!',
            'success'
          );
        });
      } // end acceptChallenge
    };


  return challengesService;

  }); // end challenges service
