//-----------------------------------------  userDataFactory factory-----------------------------------------

myApp.factory('userDataFactory', ['$http', '$rootScope', '$location', '$cookies', '$window', function($http, $rootScope, $location, $cookies, $window) {

  // $rootScope.userAdminCheck = $cookies.get('userPermissionAdmin');
  // $rootScope.userAuthCheck = $cookies.get('userAuthPermission');
  // $rootScope.loggedInUser = $cookies.get('loggedInUser');
  // $rootScope.stories = []; // array that holds all stories from database
  // $rootScope.tempNewStoryArray = []; // temporary array holding only newly added story
  // $rootScope.tempIndex = 0; // temporarily holds object index ID, very important!
  // $rootScope.userIndex = '';
  // $rootScope.saveStoryArray = [];
  // $rootScope.usersArray = [];
  // $rootScope.badWordsArray = [];
  // $rootScope.wordByElementId = ''; // needed for modal textPopup
  // $rootScope.tempIdNum = 0; // needed for modal textPopup
  // $rootScope.pageIndex = 0; // needed for modal textPopup
  // $rootScope.characters = []; // needed for modal textPopup
  // $rootScope.nameChangeArray = []; // needed for modal textPopup
  // $rootScope.page = [];
  // $rootScope.tempPageId = ''; // holds object array number/spot
  // $rootScope.storyArrayIndex = 0;
  // $rootScope.tempStoryName = '';
  // $rootScope.isNewOrEdit = 0; // determines whether or not called function is as New (0) or Edit (1)
  // $rootScope.userBtns = false; // comment out to turn off authorizations
  // $rootScope.adminBtns = false; // comment out to turn off authorizations


  var setPrivileges = function(getUserInfo){
    // $http({
    //   method: 'POST',
    //   url: '/getUserCheck',
    //   data: getUserInfo
    // }).then(function(response){
    //   console.log('response::', response);
    //   debugger;
    //   $window.localStorage.myFavorite = 'chocole chip';
    //   $window.localStorage.userPermissionAdmin = response.data.admin;
    //   $window.localStorage.userAuthPermission = response.data.auth;
    //   $window.localStorage.loggedInUser = response.data.username;
    //   console.log('localStorage::', localStorage);
    //   debugger;
    //   localStorage.setItem("userPermissionAdmin", response.data.admin);
    //   localStorage.setItem('userAuthPermission', response.data.auth);
    //   localStorage.setItem('loggedInUser', response.data.username);
    //   localStorage["p"] = 'chocole chip';
    //   $cookies.put('myFavorite', 'chocole chip');
    //   $cookies.put('userPermissionAdmin', response.data.admin);
    //   $cookies.put('userAuthPermission', response.data.auth);
    //   $cookies.put('loggedInUser', response.data.username);
    //   if (typeof(Storage) !== undefined) {
    //     $cookies.put('userPermissionAdmin', response.data.admin);
    //     $cookies.put('userAuthPermission', response.data.auth);
    //     $cookies.put('loggedInUser', response.data.username);
    //   } // end if
    // }); // end $http

    // $http.post('/getUserCheck', getUserInfo).success(function(response){
    //   console.log('in controller response::::::',response);
    //
    // }).catch(function(err){
    //   // Erase the token if the user fails to log in
    //   console.log('in factory .error Error confirming account::', err);
    //   // delete $window.localStorage.token;
    // });

    $http({
      method: 'POST',
      url: '/getUserCheck'
    }).then(function successCallback(response) {
        // this callback will be called asynchronously
        // when the response is available
        console.log('in controller response::::::',response);

      }, function errorCallback(err) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        console.log('in factory .error Error confirming account::', err);

      });

    // $http.post("/getUserCheck", getUserInfo).then(function(response){
    //         console.log('response::', response);
    //         console.log('response.data::', response.data);
    // });
  };



  // var adminCheck = function() {
  //   var admin = $rootScope.userAdminCheck;
  //   if (admin === false || admin === 'false' || admin === undefined || admin === null || admin === '') {
  //     var path = "#login";
  //     window.location.href = path;
  //   } // end if
  // }; // end adminCheck

  // determines user's permisson and makes sure other variables are accounted for
  var checkAuth = function() {
    var user = $rootScope.userAuthCheck;
    if (user === false || user === 'false' || user === undefined || user === null || user === '') {
      var path = "#login";
      window.location.href = path;
      console.log('please see me!', $rootScope.userAuthCheck);
    }  // end if
  }; // end checkAuth

  // function to create probalistically unique IDs. Not used in program, but is an option for later use
  var randomId = function() {
    var text = [];
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var idLength = 24;
    for(var i = 0; i < idLength; i++)
      text.push(possible.charAt(Math.floor(Math.random() * possible.length)));
    return text.join('');
  }; // end randomId

  // function to create probalistically random numbers. Not used in program, but is an option for later use
  var randomNum = function (max, min) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }; // end randomNum

  // primary function that returns all stories from DB to be stored locally. Needs review
  var getAllStories = function() {
    $http({
      method: 'GET',
      url: '/getStories',
      }).then(function(response) {
        $rootScope.stories = response.data;
      }); // end http GET
  }; // end getStories

  // Returns all bad words to be stored locally then is used to compare new words (madlibs).
  var getBadWords = function() {
    $http({
      method: 'GET',
      url: '/getBadWords', }).then(function(response) {
        $rootScope.badWordsArray = response.data;
    }); // end http GET
  }; // end getUsers

  // based on user permissions, makes certain buttons visible to user
  var setBtnsView = function() {
    if ($rootScope.userAdminCheck === 'false' || $rootScope.userAdminCheck === false) {
      $rootScope.userBtns = true;
    } else {
      $rootScope.userBtns = true;
      $rootScope.adminBtns = true;
    } // end else
  }; // end setBtnsView


  return {
    checkAuth: checkAuth,
    randomId: randomId,
    randomNum: randomNum,
    getAllStories: getAllStories,
    getBadWords: getBadWords,
    setBtnsView: setBtnsView,
    setPrivileges: setPrivileges
    }; // end return

}]);
