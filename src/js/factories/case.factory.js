angular
  .module('afmPortal')
  .factory('Case', caseFactory);

caseFactory.$inject = ['API', '$resource'];
function caseFactory(API, $resource){
  return $resource(`${API}/cases/:id`, { id: '@_id'}, {
      show: { method: 'GET', url: `${API}/cases/:id` },
      update: { method: 'PUT', url: `${API}/cases/:id`},
      delete: { method: 'DELETE', url: `${API}/cases/:id`}
  });
}
