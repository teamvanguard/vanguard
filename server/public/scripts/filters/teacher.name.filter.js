myApp.filter('teacherName', function() {
  return function(teacherName) {
    if(teacherName == null) {
      teacherName = 'Former Employee';
    }
    return teacherName;
  };
});
