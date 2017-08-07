angular
  .module('afmPortal')
  .controller('UsersEditCtrl', UsersEditCtrl);

UsersEditCtrl.$inject = ['$timeout','$resource','User','$http', 'API', '$state', '$stateParams','FileUploader', 'TokenService', 'CurrentUserService'];
function UsersEditCtrl($timeout, $resource, User, $http, API, $state, $stateParams, FileUploader, TokenService, CurrentUserService){
  const vm = this;
  const token = TokenService.getToken();
  const currentUser = CurrentUserService.currentUser;
  var uploader = vm.uploader = new FileUploader({
      url: `${API}/upload`,
      headers: {
        'Authorization': `Bearer ${token}`,
        '_ID': `${currentUser._id}`
      }
  });

  // FILTERS

  // a sync filter
  uploader.filters.push({
      name: 'syncFilter',
      fn: function(item /*{File|FileLikeObject}*/, options) {
          console.log('syncFilter');
          return this.queue.length < 10;
      }
  });

  // an async filter
  uploader.filters.push({
      name: 'asyncFilter',
      fn: function(item /*{File|FileLikeObject}*/, options, deferred) {
          console.log('asyncFilter');
          setTimeout(deferred.resolve, 1e3);
      }
  });

  // CALLBACKS

  uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
      console.info('onWhenAddingFileFailed', item, filter, options);
  };
  uploader.onAfterAddingFile = function(fileItem) {
      console.info('onAfterAddingFile', fileItem);
  };
  uploader.onAfterAddingAll = function(addedFileItems) {
      console.info('onAfterAddingAll', addedFileItems);
  };
  uploader.onBeforeUploadItem = function(item) {
      console.info('onBeforeUploadItem', item);
  };
  uploader.onProgressItem = function(fileItem, progress) {
      console.info('onProgressItem', fileItem, progress);
  };
  uploader.onProgressAll = function(progress) {
      console.info('onProgressAll', progress);
  };
  uploader.onSuccessItem = function(fileItem, response, status, headers) {
      console.info('onSuccessItem', fileItem, response, status, headers);
  };
  uploader.onErrorItem = function(fileItem, response, status, headers) {
      console.info('onErrorItem', fileItem, response, status, headers);
  };
  uploader.onCancelItem = function(fileItem, response, status, headers) {
      console.info('onCancelItem', fileItem, response, status, headers);
  };
  uploader.onCompleteItem = function(fileItem, response, status, headers) {
      console.info('onCompleteItem', fileItem, response, status, headers);
  };
  uploader.onCompleteAll = function() {
      console.info('onCompleteAll');
  };

  console.info('uploader', uploader);

User
    .show({id: $stateParams.id}).$promise
    .then((data) => {
      vm.user = data;
      console.log(data);
    }, err => {
      console.log(err);
    });

  vm.update = function usersUpdate(){
    User
    .update(vm.user).$promise
    .then((data) => {
    vm.updated = true;
      $timeout(function() {vm.updated = false;}, 1500);
    }, err => {
      console.log(err);
    });
  };
}
