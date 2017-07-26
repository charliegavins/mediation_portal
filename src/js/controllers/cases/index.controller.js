angular
  .module('afmPortal')
  .controller('CasesIndexCtrl', CasesIndexCtrl);

CasesIndexCtrl.$inject = ['Case'];
function CasesIndexCtrl(Case){
  const vm = this;
  vm.cases = Case.query();
}
