myApp.filter('itemType', function() {
  // This filter changes the value of true or false to school or Community
  return function(item) {
    if(item == true) {
      item = 'School';
    } else if (item == false) {
      item = 'Community';
    }
    return item;
  };
});
