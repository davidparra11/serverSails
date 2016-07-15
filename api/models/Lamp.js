/**
* Lamp.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
   //connection : 'mongoProduction',
    tableName       : 'lamp',

  attributes: {

    identifier :{
  	 type: 'string',
  	 required: true
  	},

 	  name :{
  	 type: 'string',
  	 required: true
  	},
 
  	description :{
  	 type: 'text'
  	},

  	location :{
  	 type: 'json',
  	 required: true
  	},

  	privated :{
  	 type: 'boolean'
  	},

    type_lamp:{
      type: 'json'
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


