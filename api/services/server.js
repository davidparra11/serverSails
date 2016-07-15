//socket para comunicar constantemente el reporte de las lamparas

var WebSocketServer = require('ws').Server
var wss = new WebSocketServer({ port: 5000 });
 
 console.log("ENTRO SOCKET");
 //coneccion con el cliente
wss.on('connection', function connection(ws) {
  var myId = true;
  var id;
  console.log(ws._socket.address());
 //una vez se establezca la conexion se esperan los datos 
 //enviados por el cliente 
  ws.on('message', function incoming(message) {
    console.log(message);
    message = (JSON.parse(message));
    var ip = ws._socket.address();
    var contra = ip.address + message.username
  	if(message.token === contra && (myId)){
      myId = false;
        id = setInterval(function() {
        sendParam(message.identifier,ws);
         }, 20000);
      //console.log(message.parameter);
      //sendParam(message.identifier,ws); 
    }
     
  });

   ws.send("salut");

 ws.on('close', function() {
 	     clearInterval(id);
        console.log('Stop Client');
    });
       
});




function sendParam(iden,ws){  
    result ={} 
    Report.native(function(err, collection) {
      var ar= argu(iden);
      if (err) return res.serverError(err);
      collection.aggregate(
         [
          { '$match' : {'$or': ar}  },
          { '$sort': { finalDate: -1} },
          { '$group' : { _id : "$identifier",
                         parameters: { '$first': "$parameters"}, 
                         finalDate:{'$first': "$finalDate"} 
                        }}
        ]).toArray(function (err, results) {
                if (err){
                    ws.send( JSON.stringify(result ) );
                }
                else
                   ws.send( JSON.stringify(results ) ); 
              });
            });
     };
 

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