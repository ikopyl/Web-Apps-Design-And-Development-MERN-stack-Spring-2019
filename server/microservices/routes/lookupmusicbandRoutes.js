const {
  searchAlbums,
  getSearchResultById,
  getSearchResultByName,
  getSearchResults,
  saveSearchResult
} = require('../controllers/lookupmusicbandController');

const { logRequest } = require('../middleware/logger');

const routes = (app) => {
  app.route('/search').get(searchAlbums); // query iTunes API

  app
    .route('/search_result')
    .get((req, res, next) => {
      logRequest(req);
      next();
    }, getSearchResultByName)
    .post((req, res, next) => {
      logRequest(req);
      next();
    }, saveSearchResult);

  app
    .route('/search_result/:search_result_id')
    .get((req, res, next) => {
      logRequest(req); 
      next();
    }, getSearchResultById);

  app
    .route('/search_results')
    .get((req, res, next) => {
    logRequest(req);
    next();
  }, getSearchResults);

  app
    .route('/search_results/:search_result_id')
    .get((req, res, next) => {
      logRequest(req); 
      next();
    }, getSearchResultById);

};

module.exports = routes;
