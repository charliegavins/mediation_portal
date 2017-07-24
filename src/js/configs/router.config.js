angular
  .module('angularAuthentication')
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
.state('usersEdit', {
  url: '/users/:id/edit',
  templateUrl: '/js/views/users/edit.html',
  controller: 'UsersEditCtrl'
  controllerAs: 'usersEditCtrl'
});

  $urlRouterProvider.otherwise('/');
}
