angular
  .module('afmPortal')
  .controller('CasesEditCtrl', CasesEditCtrl);

CasesEditCtrl.$inject = ['$http', 'API', '$state', '$stateParams'];
function CasesEditCtrl($http, API, $state, $stateParams){
  const vm = this;

  casesShow();

  function casesShow(){
    return $http
      .get(`${API}/cases/${$stateParams.id}`)
      .then(response => {
        vm.case = response.data;
        vm.case.dateOfMarriage = new Date(vm.case.dateOfMarriage);
        vm.case.dateOfSeparation = new Date(vm.case.dateOfSeparation);
        vm.case.dateOfCohabitation = new Date(vm.case.dateOfCohabitation);
        console.log(vm.case);
      });
  }

  vm.update = function casesUpdate(){
    return $http
      .put(`${API}/users/${vm.case._id}`, vm.case)
      .then(() => {
        $state.go('casesIndex');
      });
  };
}
