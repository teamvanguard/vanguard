myApp.filter('resize', function(){
  return function(url){
    //removing the last 6 characters of the url ' ?sz=50 '
    if(url){
      url = url.substr(0, url.length-6);
      return url;
    }else{
      //if url is undefined, it is set to a default image
      url ='/views/img/highschool.jpg';
      return url;
    }
  };
})
