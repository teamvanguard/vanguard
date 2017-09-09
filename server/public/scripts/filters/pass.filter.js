myApp.filter('pass', function() {
  //this filter changes the text of the item name in case item sold is deleted
  return function(pass) {
    if(pass == true) {
      pass = 'Complete';
    }
    else if (pass == false) {
      pass = "Incomplete"
    }
    return pass;
  };
});
