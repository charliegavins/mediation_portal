angular
  .module('afmPortal')
  .controller('LoginCtrl', LoginCtrl);

  LoginCtrl.$inject = ['User', 'TokenService', 'CurrentUserService', '$state'];
  function LoginCtrl(User, TokenService, CurrentUserService, $state) {
    const vm = this;

    vm.login = () => {
      User.login(vm.user)
      .$promise
      .then(() => {
          CurrentUserService.getUser();
          $state.go('home');
        }, err => {
          console.log(err);
        });
    };
  }
