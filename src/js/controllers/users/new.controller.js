angular
  .module('afmPortal')
  .controller('UsersNewCtrl', UsersNewCtrl);

UsersNewCtrl.$inject = ['User'];
function UsersNewCtrl(User){
  const vm = this;
  vm.users = User.query();
}
