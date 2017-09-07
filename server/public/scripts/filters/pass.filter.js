myApp.filter('pass', function() {
  //this filter changes the text of the item name in case item sold is deleted
  return function(pass) {
    if(pass == true) {
      pass = 'Passing';
    }
    else if (pass == false) {
      pass = "Failing"
    }
    return pass;
  };
});
