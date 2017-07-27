angular
  .module('afmPortal')
  .controller('UsersEditCtrl', UsersEditCtrl);

UsersEditCtrl.$inject = ['User','$http', 'API', '$state', '$stateParams'];
function UsersEditCtrl(User, $http, API, $state, $stateParams){
  const vm = this;

  usersShow();



  function usersShow(){
    vm.user = User.query()
    console.log(vm.user);
    return $http
      .get(`${API}/users/${$stateParams.id}`)
      .then(response => {
        // vm.user = response.data;
        // console.log(response.data);
      });
  }

  vm.update = function usersUpdate(){
    return $http
      .put(`${API}/users/${vm.user._id}`, vm.user)
      .then(() => {
        $state.go('usersIndex');
      });
  };
}
