myApp.factory('ChallengesService', function($http, $location) {
  console.log('ChallengesService Loaded');

  var challengesService = {

    challenges: [],

    getMyChallenges: function(){
      console.log('getMyChallenges');
      return $http.get('/challenges/myChallenges').then(function(response) {
        return response.data;
      });
    },

    getAcceptedChallenges: function() {
      return $http.get('/challenges/acceptedChallenges').then(function(response) {
        return response;
      });
    },

    getUnacceptedChallenges: function() {
      return $http.get('/challenges/unacceptedChallenges').then(function(response){
        return response;
      });
    },

    getStudents: function(challengeId) {
      console.log('getStudents');
      console.log(challengeId);
      return $http.get('/challenges/students/' + challengeId).then(function(response) {
        return response;
      });
    },

    //get the list of all challenges
    getChallenges: function() {
      console.log('get challenges');
      return $http.get('/challenges').then(function(response) {
        challengesService.challenges = response.data;
        return response.data
      });
    }, // end getChallenges

    // add a new challenge (only teachers)
    addChallenge: function(newChallenge) {
      // check if newChallenge has all of the needed info
      if (newChallenge.challenge_name && newChallenge.description && newChallenge.start_date &&
        newChallenge.end_date && newChallenge.pts_value) {
          console.log('addChallenge');
          return $http.post('/challenges', newChallenge).then(function(response) {
            return response
            swal(
              'Great!',
              'New challenge has been added',
              'success'
            );
            //refresh challenges
            challengesService.getChallenges();
          });
        } else {
          swal(
            'Missing information!',
            'Please check for missing fields.',
            'error'
          );
          // newChallenge is missing some info
          console.log('please fill out all the info');
        }
      }, // end addChallenge

    // make updates to the challenge
    updateChallenge: function(challenge) {
      console.log('update challenge');
      $http.put('/challenges', challenge).then(function(response) {
        // refresh challenges
        swal(
          'Challenge saved',
          'Challenge has been updated successfully',
          'success'
        );
        challengesService.getChallenges();
      });
    }, // end updateChallenge

    //delete a challenge
    deleteChallenge: function(challenge) {
      console.log('deleteChallenge');
      return $http.delete('/challenges/' + challenge.id).then(function(response) {
        return response
        // refresh challenges
        challengesService.getChallenges();
      });
    }, // end deleteChallenge


    // students accept a challenge
    acceptChallenge: function(challenge_id) {
      console.log('acceptChallenge');
      return $http.post('/students/' + challenge_id).then(function(response) {
        return response
        //refresh challenges
        challengesService.getChallenges();
        // provide user feedback
      });
    }, // end acceptChallenge

    // award (Update) points for students
    awardPoints: function(student, challenge) {
      console.log('award points');
      console.log("student", student);
      console.log("challenge", challenge);
      var data = {
        student: student,
        challenge: challenge
      }
      return $http.put('/challenges/award', data).then(function(response) {
        return challengesService.getStudents(challenge.id);
      });
    }, // end awardPoints

    // Send users' id in url
    completeChallenge: function(data) {
      console.log('completeChallenge');
      console.log(data);
      var student = data.student.id;
      var challenge = data.challenge.id;

      // console.log(info);
      return $http.delete('/users/complete' + '/' + student + '/' + challenge).then(function(response) {
        return response.data;
      });
    }

  }; // end challenges service
  return challengesService;
}); // end of factory
