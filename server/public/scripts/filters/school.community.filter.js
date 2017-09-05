myApp.filter('itemType', function() {
  return function(item) {
    if(item == true) {
      item = 'School';
    } else if (item == false) {
      item = 'Community';
    }
    return item;
  };
});
