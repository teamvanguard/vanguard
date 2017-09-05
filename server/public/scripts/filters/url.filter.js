myApp.filter('resize', function(){
  return function(url){
    //removing the last 6 characters of the url ' ?sz=50 '
    url = url.substr(0, url.length-6);
    return url;
  };
})
