angular
  .module('afmPortal')
  .controller('UsersEditCtrl', UsersEditCtrl);

UsersEditCtrl.$inject = ['$timeout','$resource','User','$http', 'API', '$state', '$stateParams'];
function UsersEditCtrl($timeout, $resource, User, $http, API, $state, $stateParams){
  const vm = this;

User
    .show({id: $stateParams.id}).$promise
    .then((data) => {
      vm.user = data;
      console.log(data);
    }, err => {
      console.log(err);
    });

  vm.update = function usersUpdate(){
    User
    .update(vm.user).$promise
    .then((data) => {
    vm.updated = true;
      $timeout(function() {vm.updated = false;}, 1500);
    }, err => {
      console.log(err);
    });
  };
}
