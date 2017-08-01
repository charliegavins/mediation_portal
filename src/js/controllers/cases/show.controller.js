angular
  .module('afmPortal')
  .controller('CasesShowCtrl', CasesShowCtrl);

CasesShowCtrl.$inject = ['$resource','Case', 'CurrentUserService', '$stateParams', '$http', 'API', '$state'];
function CasesShowCtrl($resource, Case, CurrentUserService, $stateParams, $http, API, $state){
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


}
