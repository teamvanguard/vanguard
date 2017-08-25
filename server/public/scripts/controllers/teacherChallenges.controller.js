myApp.controller('TeacherChallengesController', function(ChallengesService) {
  console.log('TeacherChallengesController created');
  var tcc = this;
  tcc.challengesService = ChallengesService;

  tcc.getChallenges = function() {
    console.log('in controller');
    ChallengesService.getChallenges().then(function() {
      tcc.challenges = ChallengesService.data;
      console.log('back in controller with:', tcc.challenges);
    });
  }; // end getChallenges

  tcc.getRewards = function() {
    console.log('in controller');
    ChallengesService.getRewards().then(function() {
      tcc.rewards = ChallengesService.data;
      console.log('back in controller with:', tcc.rewards);
    });
  }; // end getRewards


  tcc.addChallenge = function() {
    var challengeToSend = {
      challenge: tcc.challenge
    };
    console.log('challengeToSend');

    tcc.challenge = '';
    ChallengesService.addChallenge(challengeToSend).then(function(data) {
      console.log(data);
      tcc.getChallenges();
    });
  }; // end addChallenge

  tcc.updateChallenge = function(challengeId) {
    console.log('in updateChallenge');
    ChallengesService.updateChallenge(challengeId).then(function() {
      console.log('back in controller', ChallengesService.updateChallenge);
      tcc.getChallenges();
    });
  }; // end updateChallenge


  tcc.deleteChallenge = function(challengeId) {
    console.log('challenge to delete:');
    ChallengesService.deleteChallenge(challengeId).then(function() {
      console.log('back in controller', ChallengesService.deletedChallenge);
      tcc.delete = ChallengesService.deletedChallenge;
      tcc.getChallenges();
    });
  }; // end deleteChallenge







}); // end TeacherChallengesController
