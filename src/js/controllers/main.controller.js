angular
  .module('angularAuthentication')
  .controller('MainCtrl', MainCtrl);

MainCtrl.$inject = ['$rootScope', '$state', 'CurrentUserService'];
function MainCtrl($rootScope, $state, CurrentUserService) {

  $rootScope.$on('loggedIn', () => {
    console.log('Inside MainCtrl');
});
}
