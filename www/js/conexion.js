function efenologiaJson(servidor){
       var x = "0";
       var req = $.ajax({
                          type: "POST",
                          dataType: "json",
                          timeout : 10000,
                          url: "http://"+servidor+"/web/app-php/fenologia.php", 
                          data: x,
                          success: function(data) {
                                   dropTable("efenologia");
                                   $.each(data, function(i,item){ 
                                       efenologiaRegister(item.evento,item.id);
                                   });
                                  Materialize.toast('Fenología Sincronizado.', 4000);
                                  $("#load").attr('class', 'determinate');
                                  $('#load').attr('width', '100%' )
                                  var host = document.getElementById("alert");
                                      host.innerHTML ='Sincronizado 100%';
                                 }, 
                          error: function() {
                                  Materialize.toast('Ha ocurrido un error en Eventos Fenologías', 4000);
                                    $('#SyncBtn').show();
                                    $('#loadDiv').hide();
                                }
          });
}



function predioJson(servidor){
       var x = "0";
       var req = $.ajax({
                          type: "POST",
                          dataType: "json",
                          timeout : 10000,
                          url: "http://"+servidor+"/web/app-php/vinea.php", 
                          data: x,
                          success: function(data) {
                                   dropTable("predio");
                                   $.each(data, function(i,item){ 
                                       predioRegister(item.nombre,item.id);
                                   });
                                  Materialize.toast('Predios Sincronizado.', 4000);
                                 }, 
                          error: function() {
                                    Materialize.toast('Ha ocurrido un error en Predios', 4000);
                                    $('#SyncBtn').show();
                                    $('#loadDiv').hide();                                    
                                }
          });
}


function loteJson(servidor){
       var x = "0";
       var req = $.ajax({
                          type: "POST",
                          dataType: "json",
                          timeout : 10000,
                          url: "http://"+servidor+"/web/app-php/lote.php", 
                          data: x,
                          success: function(data) {
                                   dropTable("lote");
                                   $.each(data, function(i,item){ 
                                       loteRegister(item.nombre,item.id,item.predio);
                                   });
                                  Materialize.toast('Lotes Sincronizado.', 4000);
                                 }, 
                          error: function() {
                                  Materialize.toast('Ha ocurrido un error en Lotes', 4000);
                                    $('#SyncBtn').show();
                                    $('#loadDiv').hide();
                                }
          });
}

function subloteJson(servidor){
       var x = "0";
       var req = $.ajax({
                          type: "POST",
                          dataType: "json",
                          timeout : 10000,
                          url: "http://"+servidor+"/web/app-php/sublote.php", 
                          data: x,
                          success: function(data) {
                                   dropTable("sublote");
                                   $.each(data, function(i,item){ 
                                      subloteRegister(item.nombre,item.id,item.lote);
                                   });
                                  Materialize.toast('Sublotes Sincronizado.', 4000);
                                 }, 
                          error: function() {
                                  Materialize.toast('Ha ocurrido un error en Sublote', 4000);
                                    $('#SyncBtn').show();
                                    $('#loadDiv').hide();
                                }
          });
}
function varietalJson(servidor){
       var x = "0";
       var req = $.ajax({
                          type: "POST",
                          dataType: "json",
                          timeout : 10000,
                          url: "http://"+servidor+"/web/app-php/varietal.php", 
                          data: x,
                          success: function(data) {
                                   dropTable("varietal");
                                   $.each(data, function(i,item){ 
                                       varietalRegister(item.nombre,item.id,item.sublote);
                                   });
                                  Materialize.toast('Varietales Sincronizado.', 4000);
                                 }, 
                          error: function() {
                                  Materialize.toast('Ha ocurrido un error en Varietales', 4000);
                                    $('#SyncBtn').show();
                                    $('#loadDiv').hide();
                                }
          });
}

function showHost(transaction, results) {
    var i=0; 
    var list='';
    var hostInput='';
    for (i = 0; i < results.rows.length; i++) {
        var row = results.rows.item(i);
            list='host actual : <ins>'+row.ip+' </ins>';
            hostInput = row.ip;
    }
    if(i==0){list='<b>no tiene host registrado</b>'}
    var host = document.getElementById("alert");
        host.innerHTML=list;
        $("#hostHidden").val(hostInput);
}

function outputHost() {
    var db = dbInicializar();
        db.transaction(function(t) {
            t.executeSql("SELECT * FROM host", [], showHost);
        });
}


function addHost(){
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
  $('#SyncBtn').hide();
  $('#loadDiv').show();
  var servidor = $("#hostHidden").val();
  predioJson(servidor);
  loteJson(servidor);
  subloteJson(servidor);
  varietalJson(servidor);
  efenologiaJson(servidor);


}
/*
predioJson();
loteJson();
subloteJson();
varietalJson();
efenologiaJson();


*/