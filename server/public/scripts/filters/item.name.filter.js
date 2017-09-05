myApp.filter('itemName', function() {
  return function(itemName) {
    if(itemName == null) {
      itemName = 'Expired Item';
    }
    return itemName;
  };
});
