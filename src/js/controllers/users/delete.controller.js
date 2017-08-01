angular
  .module('afmPortal')
  .controller('UsersDeleteCtrl', UsersDeleteCtrl);

UsersDeleteCtrl.$inject = ['$resource','User','$http', 'API', '$state', '$stateParams'];
function UsersDeleteCtrl($resource, User, $http, API, $state, $stateParams){
  const vm = this;

  User
    .delete({ id: user._id })
    .$promise
    .then(() => {
      $state.go('home');
    });

}
