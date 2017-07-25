angular
  .module('afmPortal')
  .controller('UsersShowCtrl', UsersShowCtrl);

UsersShowCtrl.$inject = ['User', 'CurrentUserService', '$stateParams', '$http', 'API'];
function UsersShowCtrl(User, CurrentUserService, $stateParams, $http, API){
const vm = this;
function usersShow(){
  return $http
    .get(`${API}/users/${$stateParams.id}`)
    .then(response => {
      vm.user = response.data;
      console.log(vm.user.firstName);
    });
}
  usersShow();
}
