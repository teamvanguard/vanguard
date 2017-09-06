myApp.filter('teacherName', function() {
  //changes the name of the teacher if they no longer work at the school
  return function(teacherName) {
    if(teacherName == null) {
      teacherName = 'Former Employee';
    }
    return teacherName;
  };
});
