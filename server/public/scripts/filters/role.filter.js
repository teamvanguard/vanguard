myApp.filter('role', function() {
  // This filter changes the value of true or false to school or Community
  return function(role) {
    if (role == ADMIN_ROLE) {
      role = 'Admin';
    } else if (role == STORE_MANAGER_ROLE) {
      role = 'Store Manager';
    } else if (role == TEACHER_ROLE) {
      role = 'Teacher';
    } else if (role == STUDENT_ROLE) {
      role = 'Student';
    }
    return role;
  };
});
