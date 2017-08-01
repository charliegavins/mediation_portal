angular
.module('afmPortal')
.controller('CasesEditCtrl', CasesEditCtrl);

CasesEditCtrl.$inject = ['$timeout','$resource','Case','$http', 'API', '$state', '$stateParams'];
function CasesEditCtrl($timeout, $resource, Case, $http, API, $state, $stateParams){
  const vm = this;
  vm.updated = false;
  let childObject = {
    DoB: "", firstName: "", lastName: "", middleNames: ""
  };

  vm.addChildField = function addChild(){
    childObject = {
      DoB: "", firstName: "", lastName: "", middleNames: ""
    };
    vm.case.childrenInfo.push(childObject);
  }
  vm.removeChild = function removeChild(index){
    vm.case.childrenInfo.splice(index, 1);
    console.log(vm.case.childrenInfo.length);
  }

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
    removeBlankChildren();
      Case
      .update(vm.case).$promise
      .then((data) => {
        console.log(data);
        vm.updated = true;
        $timeout(function() {vm.updated = false;}, 1500);
      }, err => {
        console.log(err);
      });
    }

function removeBlankChildren(){
  for (i=0; i<vm.case.childrenInfo.length; i++){
    if (vm.case.childrenInfo[i].firstName == "" && vm.case.childrenInfo[i].lastName == "" && vm.case.childrenInfo[i].middleNames == ""){
      vm.case.childrenInfo.splice(i, 1);
      i = i-1;
    };
};
};

}
