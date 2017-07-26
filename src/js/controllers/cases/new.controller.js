angular
  .module('afmPortal')
  .controller('CasesNewCtrl', CasesNewCtrl);

CasesNewCtrl.$inject = ['Case'];
function CasesNewCtrl(Case){
  const vm = this;
  vm.cases = Case.query();
}
