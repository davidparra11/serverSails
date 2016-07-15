/*
Author:      jhonny lópez
descripción: aqui se definen propiedades como la conección por defecto para los modulos y el tipo
              de migración el cual nos indica si vamos a leer de un DB, a alterarla o si podremos
              borrarla y recontruirla.
*/

/**
 * Default model configuration
 * (sails.config.models)
 *
 * Unless you override them, the following properties will be included
 * in each of your models.
 *
 * For more info on Sails models, see:
 * http://sailsjs.org/#!/documentation/concepts/ORM
 */

module.exports.models = {

  /***************************************************************************
  *                                                                          *
  * Your app's default connection. i.e. the name of one of your app's        *
  * connections (see `config/connections.js`)                                *
  *                                                                          *
  ***************************************************************************/
   connection: 'localDiskDb',

  /***************************************************************************
  *                                                                          *
  * How and whether Sails will attempt to automatically rebuild the          *
  * tables/collections/etc. in your schema.                                  *
  *                                                                          *
  * See http://sailsjs.org/#!/documentation/concepts/ORM/model-settings.html  *
  *                                                                          *
  ***************************************************************************/

  /********************************************************************************************
  * migrate: 'alter', // adds and/or removes columns on changes to the schema                 *
  * migrate: 'drop', // drops all your tables and then re-creates them. All data is deleted.  *
  * migrate: 'safe', doesn't do anything on sails lift- for use in production.                *
  *                                                                                           *
  *********************************************************************************************/
    migrate    : 'safe',             //safe - alter  - drop  
    connection : 'mongoProduction',
    //connection : 'productionPosgrest',
    //schema     : false,             // habilita el uso de esquemas en DB

    /* 
    Por defecto sails busca y crea con estos campos, asi que es bueno deshabilitarnos 
    si se trabaja con una DB que no ha sido creada por completo con el ORM
    */
    autoCreatedAt   : false,
    autoUpdatedAt   : false

};
