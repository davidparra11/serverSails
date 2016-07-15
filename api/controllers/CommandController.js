/**
 * CommandController
 *
 * @description :: Server-side logic for managing commands
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
function verifydata(data){
	var dict = {}
		var k = data.split(';')
		for (var name in k) {
			tmp = k[name].split(':')
			if(tmp[0]=='' || tmp[1]=='')
				return 0; 
			else
				dict[tmp[0]] = tmp[1]   
		}
		return dict; 
	}

function addBulk(data){
    var initialDate = new Date();
    var verify = false;

    var data = JSON.parse(data);
    for (var index in data) {
            data[index]['initialDate'] = initialDate ; 
            data[index]['verify'] = verify ; 
        }
    return data; 
}    

module.exports = {

	 /**
     * {SERVER_URL}:{SERVER_PORT}/commands/:identifier
     * GET
     * obtiene las ordenes asignadas a una lampara
     * params
     *    verify
     *  
            {
			    "code": 200,
			    "message": "Data of orders",
			    "data": [
			        {
			            "parameter": "calor",
			            "value": "34"
			        },
			        {
			            "parameter": "frio",
			            "value": "34"
			        },
			        {..............}
			    ]
			}       
     *
     * 
     **/
     findOrder: function(req,res){
        console.log(req.param('verify'));
        var para= req.param('verify') ? {identifier: req.param('identifier'),verify: req.param('verify')} : {identifier: req.param('identifier')};
        Lamp.find({identifier: req.param('identifier') })
                .exec(function(error,lamp){
                if (error){
                    sails.log.error({"code":500,"response":"ERROR","method":"findOrder","controller":"Command"});
                    return res.send({"code":500,"message":"Error to get lamp","data":error});
                }
                if(lamp.length!=0){
                    Command.find(para).sort('initialDate DESC')
                        .exec(function(error, cmd) {
                        if (error){
                            sails.log.error({"code":500,"response":"ERROR","method":"findOrder","controller":"Command"});
                            return res.send({"code":500,"message":"Error to get command","data":error});
                        }
                        else{
                            sails.log.info({"code":200,"response":"OK","method":"findOrder","controller":"Command"});
                            return res.send({"code":200,"message": "Data of orders","data":cmd});
                        }
                    });         
                }
                else{
                    sails.log.info({"code":404,"response":"WARNING","method":"finOrder","controller":"Command"});
                    return res.send({"code":404, "message":'Lamp does not exist',"data":[]});
                }
        });            
     }, 

	/**
     * {SERVER_URL}:{SERVER_PORT}/commands/
     *  GET    
            {
    "code": 200,
    "message": "Data of all commands",
    "data": [
		        {
		            "identifier": "pepe",
		            "parameter": "calor",
		            "value": "34",
		            "order": true,
		            "finalDate": "2015-08-26T04:38:28.821Z",
		            "id": "55dd42c450ecf2cc1a7c2f1e"
		        },
		        {............
		        },
		    ]
		}
     *
     * 
     **/
   findAll: function(req,res){ 
   	var dateObj = new Date();
    var month = dateObj.getUTCMonth() ; //months from 1-12
    var day = dateObj.getUTCDate()-1;
    var year = dateObj.getUTCFullYear();
      console.log(dateObj);
      console.log(year + "/" + month + "/" + day);
   	    req.allParams().initialDate= new Date();
        Command.find({initialDate: { '>=': new Date(year,month,day)}, verify:false})
            .exec(function(error, cmd) {
                    if (error){
                        sails.log.error({"code":500,"response":"ERROR","method":"findAll","controller":"command"});
                        return res.send({"code":500,"message":"Error to get lamps","data":error});
                    }
                     else{
                        sails.log.info({"code":200,"response":"OK","method":"findAll","controller":"command"});
                        return res.send({"code":200,"message":"Data of all commands" ,"data": cmd});
                    }
            });
     }, 

    /**
     * {SERVER_URL}:{SERVER_PORT}/reports/:identifier
     *  POST
     crea una entrada de las variables que reporta una lampara.
     *   params:
     *        - identifier*
     *        - parameters*
     *        - finalDate
     *
           {
			    "code": 201,
			    "message": "Create success",
			    "data": [
			        {
			            "id": "55e7d60ed5b58991167f1901"
			        }
			    ]
			}
     *
     * 
     **/
    create: function(req, res){
        if(!req.param('initialDate'))
            req.allParams().initialDate= new Date();
        if(!req.param('verify'))
            req.allParams().verify= false;

    	if (!req.param('identifier') || !req.param('parameters') || !req.param('username')){
            sails.log.info({"code":400,"response":"WARNING","method":"create","controller":"Command"});
            return res.send({"code":400, "message":'Invalid parameter to command',"data":[]});
        }
        else{
        	User.find({username: req.param('username') })
                .exec(function(error,user){
                if (error){
                    sails.log.error({"code":500,"response":"ERROR","method":"findUser","controller":"Command"});
                    return res.send({"code":500,"message":"Error to get user","data":error});
                }
                if(user.length!=0){
                	 Lamp.find({identifier: req.param('identifier') })
			            .exec(function(error,lamp){
			                if (error){
			                    sails.log.error({"code":500,"response":"ERROR","method":"create","controller":"Command"});
			                    return res.send({"code":500,"message":"Error to get lamp","data":error});
			                }
			                if(lamp.length!=0){
			                	t =verifydata(req.param('parameters'))
			                	if(t){
			                		req.allParams().parameters= t;
			                		 Command.create( req.allParams() )
			            					.exec(function(error,report){ 
								                if (error){
								                    sails.log.error({"code":500,"response":"ERROR","method":"create","controller":"Command"});
								                    return res.send({"code":500,"message":"Error creating report","data":error});
								                          }
								                else{
								                      sails.log.info({"code":201,"response":"OK","method":"create","controller":"Command"});
								                      return res.send({"code":201,"message":"Create success" ,"data": [{id: report.id}]});
								                    }
								            });
								}
			                	else{
			                		sails.log.info({"code":404,"response":"WARNING","method":"finLamp","controller":"Command"});
			                    	return res.send({"code":404, "message":'malformed parameters',"data":[]});
			                	}
			                }
			                else{
			                    sails.log.info({"code":404,"response":"WARNING","method":"finLamp","controller":"Command"});
			                    return res.send({"code":404, "message":'Lamp does not exist',"data":[]});
			                }
		            	});
                }
                else{
                    sails.log.info({"code":404,"response":"WARNING","method":"finUser","controller":"Command"});
                    return res.send({"code":404, "message":'User does not exist',"data":[]});
                }
            });   
    	}
    },	

     /**
     * {SERVER_URL}:{SERVER_PORT}/lamps/:id
     *  PUT
        actualiza una lampara por su identificador de base de datos
     *   params:
     *        - id*
     *
     *
     *     
            {
                "code": 200,
                "message": "Update success",
                "data": [
                    {
                        "id": "1"
                    }
                ]
            }
    
     *
     * 
     **/
        update: function(req, res){
	        if(!req.param('finalDate'))
	            req.allParams().finalDate= new Date();
	        if(!req.param('verify'))
	            req.allParams().verify= true;

	    	if (!req.param('id')){
	            sails.log.info({"code":400,"response":"WARNING","method":"update","controller":"Command"});
	            return res.send({"code":400, "message":'Invalid parameter to command',"data":[]});
	        }
	        else{
	        	Command.find({id: req.param('id') })
                	.exec(function(error,cmd){
                	if (error){
		                sails.log.error({"code":500,"response":"ERROR","method":"update","controller":"Command"});
		                return res.send({"code":500,"message":"Error to get command","data":error});
		            }	
	                if (cmd.length!=0){
	                	console.log(cmd);
			        	Command.update( {id: req.param('id')},req.allParams() )
						       .exec(function(error,report){ 
									if (error){
										sails.log.error({"code":500,"response":"ERROR","method":"update","controller":"Command"});
									    return res.send({"code":500,"message":"Error updating command","data":error});
									}
								    else{
										sails.log.info({"code":201,"response":"OK","method":"update","controller":"Command"});
									    return res.send({"code":201,"message":"Update success" ,"data": [{id: cmd[0].id}]});
									}
								});
					}
					else{
						sails.log.info({"code":404,"response":"WARNING","method":"update","controller":"Command"});
		                return res.send({"code":404, "message":'Id does not exist',"data":[]});
					}	       
				});
			}	
        },	


        /**
     * {SERVER_URL}:{SERVER_PORT}/commands/bulk
     *  POST
     *     
        {
    "code": 201,
    "message": "Create bulk success",
    "data": [
        {
            "id": [
                {
                    "parameters": {
                        "ID": "15",
                        "ESTADO": "1"
                    },
                    "identifier": "0015",
                    "username": "test",
                    "id": "5620616de737252b138f54d3"
                },
                {
                    "parameters": {
                        "ID": "15",
                        "ESTADO": "1"
                    },
                    "identifier": "0016",
                    "username": "test",
                    "id": "5620616ee737252b138f54d4"
                }, 
                .......
            ]
        }
    ]
}
    
     *
     * 
     **/
        bulk: function(req, res){
            if (!req.param('data')){
                sails.log.info({"code":400,"response":"WARNING","method":"bulk","controller":"Command"});
                return res.send({"code":400, "message":'Invalid parameter to command',"data":[]});
            }
            else{
                var data = addBulk(req.param('data'))
                Command.create( data )
                    .exec(function(error,report){ 
                        if (error){
                            sails.log.error({"code":500,"response":"ERROR","method":"bulk","controller":"Command"});
                            return res.send({"code":500,"message":"Error creating commands","data":error});
                        }
                        else{
                            sails.log.info({"code":201,"response":"OK","method":"bulk","controller":"Command"});
                            return res.send({"code":201,"message":"Create bulk success" ,"data": [{id: report}]});
                        }
                    });
                }
            },



            /**
     * {SERVER_URL}:{SERVER_PORT}/statistics/command/
     * GET
     *    
        params: 
           - username 

        {
            "code": 200,
            "message": "Success statistics",
            "data": [
                {
                    "_id": "006",
                    "lamps": 2,
                    "verifytrue": 2,
                    "verifyfalse": 0
                },
                {
                    "_id": "005",
                    "lamps": 4,
                    "verifytrue": 3,
                    "verifyfalse": 1
                }, .........
            ]
}
    
     *
     * 
     **/
       statistic: function(req, res){
        var match;
        if (!req.param('username')){
            sails.log.info({"code":400,"response":"WARNING","method":"statistics","controller":"Command"});
            return res.send({"code":400, "message":'Invalid parameter',"data":[]});
        }
        else{
            User.find({username: req.param('username') })
                .exec(function(error,user){
                    if(user.length !==0){
                        match = {'$match': {username: user[0].username}};          
                               console.log(user[0].username);
                        Command.native(function(err, collection) {
                            if (err) return res.serverError(err);
                            collection.aggregate([
                                     match,
                                    { '$group': { _id: "$identifier", 
                                                   lamps: {'$sum': 1}, 
                                                   verifytrue: { "$sum": { "$cond": [ "$verify", 1, 0 ]}},
                                                   verifyfalse: { "$sum": {
                                                                         "$cond": [ { "$eq": [ "$verify", false ] }, 1, 0 ]
                                                                        }},                             
                                                }
                                    }]).toArray(function (error, lamp) {
                                if (error){
                                    sails.log.error({"code":500,"response":"ERROR","method":"statistics","controller":"Command"});
                                    return res.send({"code":500,"message":"Error to get statistics","data":error});
                                }
                                else{
                                    sails.log.info({"code":200,"response":"OK","method":"statistics","controller":"Command"});
                                    return res.send({"code":200,"message":"Success statistics" ,"data": lamp});
                                }
                            });
                        });
                    }
                    else{
                        sails.log.info({"code":404,"response":"WARNING","method":"statistics","controller":"Lamp"});
                        return res.send({"code":404, "message":'User does not exist',"data":[]});
                    }
                });
            }
       }


};


