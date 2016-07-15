/*
Author:      jhonny lópez
descripción: aqui se agregan todas las url con las cuales se va tener acceso a los datos,
              en muchos casos las funciones del ORM pueden funcionar sin estar aqui, pero
              es una buena practica restringir las rutas.
*/

/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': {
    view: 'homepage'
  },

  /***************************************************************************
  *                                                                          *
  * Custom routes here...                                                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the custom routes above, it   *
  * is matched against Sails route blueprints. See `config/blueprints.js`    *
  * for configuration options and examples.                                  *
  *                                                                          *
  ***************************************************************************/

//recursos para los usuarios
  'get /users/:username': {
    controller: 'UserController',
    action    : 'find'
  },

  'get /users/': {
    controller: 'UserController',
    action    : 'findAll'
  },

  'post /users/:username': {
    controller: 'UserController',
    action    : 'create'
  },

  'delete /users/:username': {
    controller: 'UserController',
    action    : 'delete'
  },

  'get /statistics/users/': {
    controller: 'UserController',
    action    : 'statistic'
  },



// recursos para las lamparas
  'get /lamps/:identifier': {
    controller: 'LampController',
    action    : 'find'
  },

   'get /lamps/': {
    controller: 'LampController',
    action    : 'findAll'
  },

  'get /select/lamps/': {
    controller: 'LampController',
    action    : 'select'
  },

   'post /lamps/': {
    controller: 'LampController',
    action    : 'create'
  },

   'put /lamps/:id': {
    controller: 'LampController',
    action    : 'update'
  },

   'delete /lamps/:identifier': {
    controller: 'LampController',
    action    : 'delete'
  },

   'get /lamps/user/:username': {
    controller: 'LampController',
    action    : 'findUser'
  },

   'get /statistics/lamps/': {
    controller: 'LampController',
    action    : 'statistic'
  },

 // 'get /index/': {
 //    controller: 'LampController',
 //    action    : 'index'
 //  },


 //recursos para tipos de lamparas 

 'get /types/:name': {
    controller: 'TypeController',
    action    : 'find'
  },

  'get /types/': {
    controller: 'TypeController',
    action    : 'findAll'
  },

   'post /types/:name': {
    controller: 'TypeController',
    action    : 'create'
  },

   'put /types/:id': {
    controller: 'TypeController',
    action    : 'update'
  },

  'get /select/types/:username': {
    controller: 'TypeController',
    action    : 'select'
  },

  'get /types/user/:username': {
    controller: 'TypeController',
    action    : 'findUser'
  },

  'get /statistics/types/': {
    controller: 'TypeController',
    action    : 'statistic'
  },



   //recursos para comandos

  'post /commands/': {
    controller: 'CommandController',
    action    : 'create'
  },

  'get /commands/': {
    controller: 'CommandController',
    action    : 'findAll'
  },

  'get /commands/:identifier': {
  controller: 'CommandController',
  action    : 'findOrder'
  },

  'put /commands/:id': {
  controller: 'CommandController',
  action    : 'update'
  },

  'post /commands/bulk/': {
  controller: 'CommandController',
  action    : 'bulk'
  },

  'get /statistics/command/': {
    controller: 'CommandController',
    action    : 'statistic'
  },


   //recursos para reportes

  'get /reports/:identifier': {
    controller: 'ReportController',
    action    : 'find'
  },

  'post /reports/:identifier': {
    controller: 'ReportController',
    action    : 'create'
  },

   'get /reports/filter/:identifier': {
    controller: 'ReportController',
    action    : 'multiFields'
  },

   'get /statistics/report/': {
    controller: 'ReportController',
    action    : 'statistic'
  },


};
