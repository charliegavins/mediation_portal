angular
  .module('afmPortal')
  .factory('User', userFactory);

userFactory.$inject = ['API', '$resource'];
function userFactory(API, $resource){
  return $resource(`${API}/users/:id`, { id: '@_id'}, {
     register: { method: 'POST', url: `${API}/register` },
      login: { method: 'POST', url: `${API}/login` },
      update: { method: 'PUT', url: `${API}/users/:id`},
      show: { method: 'GET', url: `${API}/users/:id` }
  });
}
