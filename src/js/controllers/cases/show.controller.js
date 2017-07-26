angular
  .module('afmPortal')
  .controller('CasesShowCtrl', CasesShowCtrl);

CasesShowCtrl.$inject = ['Case', 'CurrentUserService', '$stateParams', '$http', 'API'];
function CasesShowCtrl(Case, CurrentUserService, $stateParams, $http, API){
const vm = this;
function casesShow(){
  return $http
    .get(`${API}/cases/${$stateParams.id}`)
    .then(response => {
      vm.case = response.data;
      console.log(vm.case.caseID);
    });
}
  casesShow();
}
