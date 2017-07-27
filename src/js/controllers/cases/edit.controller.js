angular
.module('afmPortal')
.controller('CasesEditCtrl', CasesEditCtrl);

CasesEditCtrl.$inject = ['$timeout','$resource','Case','$http', 'API', '$state', '$stateParams'];
function CasesEditCtrl($timeout, $resource, Case, $http, API, $state, $stateParams){
  const vm = this;

    Case
      .show({id: $stateParams.id}).$promise
      .then((data) => {
        console.log(data);
        //DRY UP??
        data.dateOfMarriage = new Date(data.dateOfMarriage);
        data.dateOfSeparation = new Date(data.dateOfSeparation);
        data.dateOfCohabitation = new Date(data.dateOfCohabitation);
        for (i=0; i<data.childrenInfo.length;i++){
          data.childrenInfo[i].DoB = new Date(data.childrenInfo[i].DoB)
        }
        vm.case = data;
      }, err => {
        console.log(err);
      });

  vm.update = function casesUpdate(){
    Case
    .update(vm.case).$promise
    .then((data) => {
      console.log(data);
vm.updated = true;
      $timeout(function() {vm.updated = false;}, 1500);
    }, err => {
      console.log(err);
    });
  };
}
