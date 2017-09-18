angular
  .module('afmPortal')
  .controller('MainCtrl', MainCtrl);

MainCtrl.$inject = ['$rootScope', '$state', 'CurrentUserService'];
function MainCtrl($rootScope, $state, CurrentUserService) {
const vm = this;



  $rootScope.$on('loggedIn', () => {
    vm.user = CurrentUserService.currentUser;
  });
  vm.logout = () => {
  CurrentUserService.removeUser();
}
$rootScope.$on('loggedOut', () => {
  vm.user = null;
  $state.go('login');
});
}
