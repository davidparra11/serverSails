/**
* Type.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  tableName       : 'type',

  attributes: {

 	name :{
  	 type: 'string',
  	 required: true
  	},
 
  	description :{
  	 type: 'text'
  	},

  	privated :{
  	 type: 'boolean'
  	},

    active : {
      type : 'boolean'
    },

    userId :{
      type: 'string',
      required : true
    },

  },
};

