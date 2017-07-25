angular
  .module('afmPortal')
  .controller('UsersEditCtrl', UsersEditCtrl);

UsersEditCtrl.$inject = ['$http', 'API', '$state', '$stateParams'];
function UsersEditCtrl($http, API, $state, $stateParams){
  const vm = this;

vm.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };

  usersShow();

  function usersShow(){
    return $http
      .get(`${API}/users/${$stateParams.id}`)
      .then(response => {
        vm.user = response.data;
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
