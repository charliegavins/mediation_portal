angular
  .module('afmPortal')
  .config(Router);

Router.$inject = ['$stateProvider', '$locationProvider', '$urlRouterProvider'];
function Router($stateProvider, $locationProvider, $urlRouterProvider){
  $locationProvider.html5Mode(true);

  $stateProvider
  .state('home', {
    url: '/',
    templateUrl: '/js/views/home.html'
  })
  .state('register', {
    url: '/register',
    templateUrl: '/js/views/register.html',
    controller: 'RegisterCtrl',
    controllerAs: 'register'
  })
  .state('registerLongForm', {
    url: '/register-long-form',
    templateUrl: '/js/views/registerLongForm.html',
    controller: 'EditCtrl',
    controllerAs: 'usersEdit'
  })
  .state('login', {
    url: '/login',
    templateUrl: '/js/views/login.html',
    controller: 'LoginCtrl',
    controllerAs: 'login'
  })
  .state('usersIndex', {
    url: '/users',
    templateUrl: '/js/views/users/index.html',
    controller: 'UsersIndexCtrl',
    controllerAs: 'usersIndex'
  })
  .state('usersNew', {
  url: '/users/new',
  templateUrl: '/js/views/users/new.html',
  controller: 'UsersNewCtrl',
  controllerAs: 'usersNew'
})
.state('usersShow', {
  url: '/users/:id',
  templateUrl: '/js/views/users/show.html',
  controller: 'UsersShowCtrl',
  controllerAs: 'usersShow'
})
.state('usersFinance', {
  url: '/users/:id/finance',
  templateUrl: '/js/views/users/finance.html',
  controller: 'UsersShowCtrl',
  controllerAs: 'usersShow'
})
.state('usersEdit', {
  url: '/users/:id/edit',
  templateUrl: '/js/views/users/edit.html',
  controller: 'UsersEditCtrl',
  controllerAs: 'usersEdit'
})
.state('usersFinanceEdit', {
  url: '/users/:id/finance/edit',
  templateUrl: '/js/views/users/financeEdit.html',
  controller: 'UsersEditCtrl',
  controllerAs: 'usersEdit'
})
.state('casesIndex', {
  url: '/cases',
  templateUrl: '/js/views/cases/index.html',
  controller: 'CasesIndexCtrl',
  controllerAs: 'casesIndex'
})
.state('casesNew', {
url: '/cases/new',
templateUrl: '/js/views/cases/new.html',
controller: 'CasesNewCtrl',
controllerAs: 'casesNew'
})
.state('casesShow', {
url: '/cases/:id',
templateUrl: '/js/views/cases/show.html',
controller: 'CasesShowCtrl',
controllerAs: 'casesShow'
})
.state('casesEdit', {
url: '/cases/:id/edit',
templateUrl: '/js/views/cases/edit.html',
controller: 'CasesEditCtrl',
controllerAs: 'casesEdit'
});

  $urlRouterProvider.otherwise('/');
}
