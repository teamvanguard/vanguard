myApp.filter('challengeName', function() {
  return function(challengeName) {
    if(challengeName == null) {
      challengeName = 'Expired Challenge';
    }
    return challengeName;
  };
});
