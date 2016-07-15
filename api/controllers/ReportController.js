/**
 * ReportController
 *
 * @description :: Server-side logic for managing reports
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

/**
 * CommandController
 *
 * @description :: Server-side logic for managing commands
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	/**
     * {SERVER_URL}:{SERVER_PORT}/reports/:identifier
     *  GET    
        {
        "code": 200,
        "message": "Data of all commands to lamp",
        "data": [
            {
                "parameters": {
                    "ID": "nombre",
                    "ESTADO": "encen_apag",
                    "MARANGA": "changos"
                },
                "identifier": "07346",
                "finalDate": "2015-09-03T06:03:24.768Z",
                "id": "55e7e2acaeb52f8e191e4dbc"
            },
            {.......
            }
        ]
        }
     *
     * 
     **/
   find: function(req,res){   
        if(!req.param('limit'))
            req.allParams().limit= 100;
        Report.find({where: {identifier:req.param('identifier')}, limit: req.param('limit'), sort: 'finalDate DESC'})
            .exec(function(error, report) {
                    if (error){
                        sails.log.error({"code":500,"response":"ERROR","method":"find","controller":"Report"});
                        return res.send({"code":500,"message":"Error to get report", "data":error});
                    }
                     else{
                        sails.log.info({"code":200,"response":"OK","method":"findAll","controller":"Report"});
                        return res.send({"code":200,"message":"Data of all report to lamp" ,"data": report});
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
        if(!req.param('finalDate'))
            req.allParams().finalDate= new Date();
    	if (!req.param('identifier') || !req.param('parameters')){
            sails.log.info({"code":400,"response":"WARNING","method":"create","controller":"Report"});
            return res.send({"code":400, "message":'Invalid parameter',"data":[]});
        }
        else{
	        Lamp.find({identifier: req.param('identifier') })
	            .exec(function(error,lamp){
	                if (error){
	                    sails.log.error({"code":500,"response":"ERROR","method":"create","controller":"Report"});
	                    return res.send({"code":500,"message":"Error to get lamp","data":error});
	                }
	                if(lamp.length!=0){
	                	t =verifydata(req.param('parameters'))
	                	if(t){
	                		req.allParams().parameters= t;
	                		 Report.create( req.allParams() )
	            					.exec(function(error,report){ 
						                if (error){
						                    sails.log.error({"code":500,"response":"ERROR","method":"create","controller":"Report"});
						                    return res.send({"code":500,"message":"Error creating report","data":error});
						                          }
						                else{
						                      sails.log.info({"code":201,"response":"OK","method":"create","controller":"Report"});
						                      return res.send({"code":201,"message":"Create success" ,"data": [{id: report.id}]});
						                    }
						            });
						}
	                	else{
	                		sails.log.info({"code":404,"response":"WARNING","method":"finLamp","controller":"Report"});
	                    	return res.send({"code":404, "message":'malformed parameters',"data":[]});
	                	}
	                }
	                else{
	                    sails.log.info({"code":404,"response":"WARNING","method":"finLamp","controller":"Report"});
	                    return res.send({"code":404, "message":'Lamp does not exist',"data":[]});
	                }
            	});
    	}
    },		


    /**
     * {SERVER_URL}:{SERVER_PORT}/reports/filter/:identifier
     *  GET
     *  Obtine los campos entre las lamparas pasadas como parámetros.
     *   params:
     *        - identifier*
     *
      {
        "code": 200,
        "message": "intersect fields",
        "data": [
            "ID",
            "ESTADO33"
        ]
        }
    **/
    multiFields: function(req, res){
        if (!req.param('identifier')){
            sails.log.info({"code":400,"response":"WARNING","method":"create","controller":"Report"});
            return res.send({"code":400, "message":'Invalid parameter',"data":[]});
        }
        else{
            var ar= argu(req.param('identifier'))
            Report.native(function(err, collection) {
              if (err) return res.serverError(err);
              collection.aggregate(
                    [ { '$match' :{ '$or':ar} },
                      { '$sort': { finalDate: 1} },
                      { '$group' : { _id : "$identifier", lastparameters: { '$last': "$parameters" }
                       } } ]
                ).toArray(function (err, results) {
                if (err){
                    sails.log.error({"code":500,"response":"ERROR","method":"multiFields","controller":"Report"});
                    return res.send({"code":500,"message":"Error to get intersect","data":err});
                }
                sails.log.info({"code":200,"response":"OK","method":"multiFields","controller":"Report"});
                if(ar.length === results.length)
                   return res.send({"code":200, "message":'intersect fields',"data":intersectField(results)});
                 return res.send({"code":200, "message":'intersect fields',"data":[]});
              });
            });
        }
    },


     /**
     * {SERVER_URL}:{SERVER_PORT}/statistics/report/
     * GET
     *    
        {
            "code": 200,
            "message": "Success statistics",
            "data": [
                {
                    "_id": "002",
                    "total": 1
                },
                {
                    "_id": "005",
                    "total": 2
                },
                {
                    "_id": "07346",
                    "total": 5
                },
                {
                    "_id": "0012",
                    "total": 18
                }
            ]
        }
    
     *
     * 
     **/
       statistic: function(req, res){
                            Report.native(function(err, collection) {
                            if (err) return res.serverError(err);
                            collection.aggregate([
                                    { '$group': { _id: "$identifier", 
                                                   total: {'$sum': 1}, 
                                                                         
                                                }
                                    }]).toArray(function (error, lamp) {
                                if (error){
                                    sails.log.error({"code":500,"response":"ERROR","method":"statistics","controller":"Report"});
                                    return res.send({"code":500,"message":"Error to get statistics","data":error});
                                }
                                else{
                                    sails.log.info({"code":200,"response":"OK","method":"statistics","controller":"Report"});
                                    return res.send({"code":200,"message":"Success statistics" ,"data": lamp});
                                }
                            });
                        });
                    }
	
	
};

 /**
    Función para tratar el formato trasmitido desde las lamparas
    data   = key1:valu1;key2:value2;keyn:valuen
    return =  {
                "key1": "value1",
                "key2": "value2",
                "keyn": "valuen"
            }
 **/
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
            return JSON.stringify(dict); 
        }

    /**
     Función para convertir la entrada de los parámetros 
     como los necesita multifield
     data   = identifier1,identifier2,identifierN
     return = [{'identifier': identifier1}, {'identifier': identifierN}]
    **/
    function argu(data){
        var array =[]
        k = data.split(',')
            for (var name in k) {
                var iden={}
                iden['identifier'] = k[name]
                array.push(iden)
            }
        return array
    }

    /**
     Función para encontrar los campos comunes de los ultimos comandos de una 
     lampara
     data   = [
            {
                "_id": "07346",
                "lastparameters": {
                    "ID": "nombre",
                    "ESTADO": "ultimo",
                    "MARANGA": "changos"
                }
            },
            {
                 "_id": "0012",
                "lastparameters": {
                    "ID": "nombre",
                    "ESTADO": "ultimo",
                }
            },..
]
     return = ["ID","ESTADO"]
    **/
    function intersectField(data){
        var tmp =[]
        var array =[]
        var len= data.length
        for (var name in data) {
            jsn2= data[name].lastparameters
            for (var name2 in jsn2) {
                if(name2 in tmp){
                    tmp[name2]+=1
                    if(len==parseInt(tmp[name2])){
                        array.push(name2)
                    }
                }
                else {
                    if(len==1){
                        tmp[name2]=1
                        array.push(name2)
                    }
                    else{
                        tmp[name2]=1
                    }
                }
            }
        }
        return array;
    }



