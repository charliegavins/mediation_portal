angular
  .module('afmPortal')
  .controller('CasesIndexCtrl', CasesIndexCtrl);

CasesIndexCtrl.$inject = ['Case'];
function CasesIndexCtrl(Case){
  const vm = this;

  Case
    .query().$promise
    .then((data) => {
      vm.cases = data;
    }, err => {
      console.log(err);
    });

}
