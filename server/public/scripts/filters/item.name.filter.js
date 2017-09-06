myApp.filter('itemName', function() {
  //this filter changes the text of the item name in case item sold is deleted
  return function(itemName) {
    if(itemName == null) {
      itemName = 'Expired Item';
    }
    return itemName;
  };
});
