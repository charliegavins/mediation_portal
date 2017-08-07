angular
  .module('afmPortal')
  .controller('UsersShowCtrl', UsersShowCtrl);

UsersShowCtrl.$inject = ['User', 'CurrentUserService', '$stateParams', '$http', 'API'];
function UsersShowCtrl(User, CurrentUserService, $stateParams, $http, API){
const vm = this;

  User
    .show({id: $stateParams.id}).$promise
    .then((data) => {
      vm.user = data;
      console.log(data);
    }, err => {
      console.log(err);
    });

    vm.delete = function usersDelete(){
      User
        .delete({ id: vm.user._id })
        .$promise
        .then(() => {
          $state.go('home');
        });
    }

}
