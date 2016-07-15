/**
* Command.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
   //connection : 'mongoProduction',
    tableName       : 'command',

  attributes: {

  	username :{
  	type: 'string',
  	required: true
  	},

    identifier :{
  	type: 'string',
  	required: true
  	},

 	parameters :{
  	type: 'json',
  	required: true
  	},

  	verify :{
  	type: 'boolean'	
  	},

  	initialDate :{
  	type: 'datetime'
  	},

  	finalDate :{
  	type: 'datetime'
  	},

  	

  },

};

