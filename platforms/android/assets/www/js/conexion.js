function efenologiaJson(){
       var x = "0";
       var req = $.ajax({
                          type: "POST",
                          dataType: "json",
                          timeout : 10000,
                          url: "http://evercode.esy.es/web/app-php/fenologia.php", 
                          data: x,
                          success: function(data) {
                                   dropTable("efenologia");
                                   $.each(data, function(i,item){ 
                                       efenologiaRegister(item.evento,item.id);
                                   });
                                   rowEfenologia();
                                 }, 
                          error: function() {
                                  Materialize.toast('Ha ocurrido un error en Eventos Fenologias', 4000)
                                }
          });
}

function predioJson(){
       var x = "0";
       var req = $.ajax({
                          type: "POST",
                          dataType: "json",
                          timeout : 10000,
                          url: "http://evercode.esy.es/web/app-php/vinea.php", 
                          data: x,
                          success: function(data) {
                                   dropTable("predio");
                                   $.each(data, function(i,item){ 
                                       predioRegister(item.nombre,item.id);
                                   });
                                   rowPredio();
                                 }, 
                          error: function() {
                                    Materialize.toast('Ha ocurrido un error en Predios', 4000);
                                }
          });
}


function loteJson(){
       var x = "0";
       var req = $.ajax({
                          type: "POST",
                          dataType: "json",
                          timeout : 10000,
                          url: "http://evercode.esy.es/web/app-php/lote.php", 
                          data: x,
                          success: function(data) {
                                   dropTable("lote");
                                   $.each(data, function(i,item){ 
                                       loteRegister(item.nombre,item.id,item.predio);
                                   });
                                   rowLote();
                                 }, 
                          error: function() {
                                  Materialize.toast('Ha ocurrido un error en Lotes', 4000)
                                }
          });
}

function subloteJson(){
       var x = "0";
       var req = $.ajax({
                          type: "POST",
                          dataType: "json",
                          timeout : 10000,
                          url: "http://evercode.esy.es/web/app-php/sublote.php", 
                          data: x,
                          success: function(data) {
                                   dropTable("sublote");
                                   $.each(data, function(i,item){ 
                                      subloteRegister(item.nombre,item.id,item.lote);
                                   });
                                   rowSublote();
                                 }, 
                          error: function() {
                                  Materialize.toast('Ha ocurrido un error en Sublote', 4000)
                                }
          });
}
function varietalJson(){
       var x = "0";
       var req = $.ajax({
                          type: "POST",
                          dataType: "json",
                          timeout : 10000,
                          url: "http://evercode.esy.es/web/app-php/varietal.php", 
                          data: x,
                          success: function(data) {
                                   dropTable("varietal");
                                   $.each(data, function(i,item){ 
                                       varietalRegister(item.nombre,item.id,item.sublote);
                                   });
                                   rowVarietal();
                                 }, 
                          error: function() {
                                  Materialize.toast('Ha ocurrido un error en Varietales', 4000)
                                }
          });
}

function showHost(transaction, results) {
    var i=0; 
    var list='';
    for (i = 0; i < results.rows.length; i++) {
        var row = results.rows.item(i);
            list='host actual : <ins>'+row.ip+' </ins>';
    }
    if(i==0){list='<b>no tiene host registrado</b>'}
    var host = document.getElementById("alert");
        host.innerHTML=list;
    /*var alert = document.getElementById("alert");
            alert.innerHTML='';*/
         
}

function outputHost() {
    var db = dbInicializar();

    if (db) {
        db.transaction(function(t) {
            t.executeSql("SELECT * FROM host", [], showHost);
        });
    } else {
        alert("db not found, your browser does not support web sql! host"); // si hay algun problema
    }
}


function addHost() {
  var db = dbInicializar();
        var addip = document.getElementById("host").value;
        var alert = document.getElementById("alert");
                  alert.innerHTML=addip;
        if(addip!=''){
                     db.transaction(function(t){
                                t.executeSql('DROP TABLE IF EXISTS host');
                                t.executeSql("CREATE TABLE IF NOT EXISTS host (id INTEGER PRIMARY KEY ASC, ip TEXT)");
                                t.executeSql('INSERT INTO host (ip) VALUES (?)', [addip]);
                              });
                     document.getElementById("host").value='';
                     outputHost();
              }
        else{
              var alert = document.getElementById("alert");
                  alert.innerHTML='Debe de introducir algo.';
            }
}
function send() {
  predioJson();
  loteJson();
  subloteJson();
  varietalJson();
  efenologiaJson();


}
/*
predioJson();
loteJson();
subloteJson();
varietalJson();
efenologiaJson();


*/