/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  //connection : 'mongoProduction',
  tableName       : 'our_users',

  attributes: {

    id: {
      type: 'integer',
      unique: true,
      primaryKey: true,
      columnName: 'the_primary_key',
      autoIncrement: true
    },

    username :{
  	 type: 'string',
  	 required: true
  	},
    telephone: {
      type: 'string'
      size: 15
    },
    password: {
      type: 'string',
      required: true,
      columnName: 'encrypted_password'
      size: 20
    },
    firstName: {
      type: 'string'
    },
    lastName: {
      type: 'string'
    },

  	active : {
  		type : 'boolean'

  	}
  }

};

