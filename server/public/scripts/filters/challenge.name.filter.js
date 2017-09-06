myApp.filter('challengeName', function() {
  //changes name of the challenge if the challenge has been deleted
  return function(challengeName) {
    if(challengeName == null) {
      challengeName = 'Expired Challenge';
    }
    return challengeName;
  };
});
