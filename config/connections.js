/*
Author:      jhonny lópez
descripción: aqui se crean todas las posibles conecciones a bases de datos que
              podamos usar, en cada modelo se puede definir cual usar o se puede usar 
              la que definimos por defecto en conf/model.js
*/

/**
 * Connections
 * (sails.config.connections)
 *
 * `Connections` are like "saved settings" for your adapters.  What's the difference between
 * a connection and an adapter, you might ask?  An adapter (e.g. `sails-mysql`) is generic--
 * it needs some additional information to work (e.g. your database host, password, user, etc.)
 * A `connection` is that additional information.
 *
 * Each model must have a `connection` property (a string) which is references the name of one
 * of these connections.  If it doesn't, the default `connection` configured in `config/models.js`
 * will be applied.  Of course, a connection can (and usually is) shared by multiple models.
 * .
 * Note: If you're using version control, you should put your passwords/api keys
 * in `config/local.js`, environment variables, or use another strategy.
 * (this is to prevent you inadvertently sensitive credentials up to your repository.)
 *
 * For more information on configuration, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.connections.html
 */

module.exports.connections = {

  /***************************************************************************
  *                                                                          *
  * Local disk storage for DEVELOPMENT ONLY                                  *
  *                                                                          *
  * Installed by default.                                                    *
  *                                                                          *
  ***************************************************************************/
  localDiskDb: {
    adapter: 'sails-disk'
  },

  /***************************************************************************
  *                                                                          *
  * MySQL is the world's most popular relational database.                   *
  * http://en.wikipedia.org/wiki/MySQL                                       *
  *                                                                          *
  * Run: npm install sails-mysql                                             *
  *                                                                          *
  ***************************************************************************/
  someMysqlServer: {
    adapter: 'sails-mysql',
    host: 'YOUR_MYSQL_SERVER_HOSTNAME_OR_IP_ADDRESS',
    user: 'YOUR_MYSQL_USER',
    password: 'YOUR_MYSQL_PASSWORD',
    database: 'YOUR_MYSQL_DB'
  },

  /***************************************************************************
  *                                                                          *
  * MongoDB is the leading NoSQL database.                                   *
  * http://en.wikipedia.org/wiki/MongoDB                                     *
  *                                                                          *
  * Run: npm install sails-mongo                                             *
  *                                                                          *
  ***************************************************************************/
 mongoProduction: {
    adapter: 'sails-mongo',
    url: process.env.MONGOLAB_URI, //|| 'mongodb://localhost:27017/prueba',
    schema : true
},

/*mongoLocal: {
   adapter: 'sails-mongo',
    url: 'mongodb://localhost:27017/prueba',
    schema : true
}
*/

  /***************************************************************************
  *                                                                          *
  * PostgreSQL is another officially supported relational database.          *
  * http://en.wikipedia.org/wiki/PostgreSQL                                  *
  *                                                                          *
  * Run: npm install sails-postgresql                                        *
  *                                                                          *
  *                                                                          *
  ***************************************************************************/
  //Adaptador para conectarse a la base de datos local

/*  posgrestLocal: {
    adapter: 'sails-postgresql',
    host: 'localhost',
    user: 'postgres',
    port: 5432,
    password: 'jhonny1234',
    database: 'mydb',
    pool: false,
    ssl: true
  },

   //Adaptador para conectarse a la base de datos en linea
  posgrestRemote: {
    adapter: 'sails-postgresql',
    host: '',
    user: '',
    port: 5432, 
    password: '',
    database: '',
    pool: false,
    ssl: true
  },

  posgrestProduction: {
  adapter: 'sails-postgresql',
  url: process.env.HEROKU_POSTGRESQL_BROWN_URL,
  ssl: true

},*/


  /***************************************************************************
  *                                                                          *
  * More adapters: https://github.com/balderdashy/sails                      *
  *                                                                          *
  ***************************************************************************/

};
