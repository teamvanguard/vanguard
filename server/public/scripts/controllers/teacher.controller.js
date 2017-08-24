myApp.controller('TeacherChallengesController', function(TeacherService) {
  console.log('TeacherChallengesController created');
  var vm = this;
  vm.teacherService = TeacherService;

  vm.getChallenges = function(teacherId) {
    console.log('in controller');
    TeacherService.getChallenges(teacherId).then(function() {
      vm.challenges = TeacherService.data;
      console.log('back in controller with:', vm.challenges);
    });
  }; // end getChallenges

  vm.getRewards = function(items) {
    console.log('in controller');
    TeacherService.getRewards(items).then(function(){
      vm.rewards = TeacherService.data;
      console.log('back in controller with:', vm.rewards);
    });
  }; // end getRewards


  vm.addChallenge = function(){
    var challengeToSend = {
      challenge: vm.challenge
    };
    console.log('challengeToSend');

    vm.challenge = '';
    TeacherService.addChallenge(challengeToSend).then(function(data) {
      console.log(data);
      vm.getChallenges();
    });
  }; // end addChallenge


  vm.deleteChallenge = function(challengeId) {
    console.log('challenge to delete:');
    TeacherService.deleteChallenge(challengeId).then(function() {
      console.log('back in controller', TeacherService.deletedChallenge);
      vm.delete = TeacherService.deletedChallenge;
      vm.getChallenges();
    });
  }; // end deleteChallenge
























});
