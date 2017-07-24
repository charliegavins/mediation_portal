angular
  .module('angularAuthentication')
  .controller('LoginCtrl', LoginCtrl);

  LoginCtrl.$inject = ['User', 'TokenService', 'CurrentUserService'];
  function LoginCtrl(User, TokenService, CurrentUserService) {
    const vm = this;

    vm.login = () => {
      User.login(vm.user)
      .$promise
      .then(() => {
          CurrentUserService.getUser();
        }, err => {
          console.log(err);
        });
    };
  }
