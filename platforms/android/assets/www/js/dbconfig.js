function dbInicializar() {
  var db = window.sqlitePlugin.openDatabase({
    name: "vineaTest.db"
  });
  return db;
}

function dropTable(table) {
  var db = dbInicializar();
  document.getElementById("data").innerHTML += table + 'borrando <br>';
  db.transaction(function(tx) {
    tx.executeSql("DROP TABLE IF EXISTS " + table + "");
  });
  document.getElementById("data").innerHTML += table + 'fue borrada <br>';
}

function rowfenologia() {
  var db = dbInicializar();
  var html="";
  db.transaction(function(t) {
    t.executeSql("SELECT * FROM fenologia", [], function(transaction, results) {
      for (var i = 0; i < results.rows.length; i++) {
        var row = results.rows.item(i);
        html += '<tr>'
                     +'<td>'+row.fecha+'</td>'
                     +'<td>'+row.predioNom+'</td>'
                     +'<td>'+row.loteNom+'</td>'
                     +'<td>'+row.subloteNom+'</td>'
                     +'<td>'
                          +'<ul class="collection">'
                              +'<a href="#!" class="collection-item center-align" onclick="alert('+row.id+');"><i class="fa fa-th-list"></i></a>'
                          +'</ul>'
                     +' </td>'
                     +' <td>'
                          +'<ul class="collection">'
                              +'<a href="#!" class="collection-item center-align" onclick="alert('+row.id+');"><i class="fa fa-edit"></i></a>'
                          +'</ul>'
                     +' </td>'
                  +' </tr>';

      }
       var  tb = document.getElementById('bodyTable');
              tb.innerHTML = html;
    });
  });
}


function rowEfenologia() {
  var db = dbInicializar();
  db.transaction(function(t) {
    t.executeSql("SELECT * FROM efenologia", [], function(transaction, results) {
     var predio = document.getElementById("FenologiaSelect");
          predio.innerHTML='<option value="">Seleccione una Fenologia</option>';
      for (var i = 0; i < results.rows.length; i++) {
        var row = results.rows.item(i);
       // document.getElementById("data").innerHTML += row.nombre + '' + row.ide + '<br>';
                predio.innerHTML+='<option value="'+row.ide+'">'+row.evento+'</option>';  
      }
    });
  });
}

function rowPredio(){
  var db = dbInicializar();
  var list="";
  db.transaction(function(t) {
    t.executeSql("SELECT * FROM predio", [], function(transaction, results) {
      var predio = document.getElementById("PredioSelect");
          predio.innerHTML='<option value="">Seleccione un Predio</option>';
      for (var i = 0; i < results.rows.length; i++) {
        var row = results.rows.item(i);
       // document.getElementById("data").innerHTML += row.nombre + '' + row.ide + '<br>';
                predio.innerHTML+='<option value="'+row.ide+'">'+row.nombre+'</option>';  
      }
    });
  });
}

function rowLote() {
  var predio = document.getElementById("PredioSelect").value;
  var db = dbInicializar();
  db.transaction(function(t) {
    t.executeSql("SELECT * FROM lote where predio  = ? ", [predio], function(transaction, results) {
        var Lote = document.getElementById("LoteSelect");
          Lote.innerHTML='<option value="">Seleccione un Lote</option>';
      for (var i = 0; i < results.rows.length; i++) {
        var row = results.rows.item(i);
        document.getElementById("data").innerHTML += row.nombre + '' + row.ide + row.predio + '<br>';
                Lote.innerHTML+='<option value="'+row.ide+'">'+row.nombre+'</option>';
      }
    });
  });
}


function rowSublote() {
  var db = dbInicializar();
  db.transaction(function(t) {
    t.executeSql("SELECT * FROM sublote", [], function(transaction, results) {
      for (var i = 0; i < results.rows.length; i++) {
        var row = results.rows.item(i);
        document.getElementById("data").innerHTML += row.nombre + '' + row.ide + row.lote + '<br>';
      }
    });
  });
}

function rowVarietal() {
  var db = dbInicializar();
  db.transaction(function(t) {
    t.executeSql("SELECT * FROM varietal", [], function(transaction, results) {
      for (var i = 0; i < results.rows.length; i++) {
        var row = results.rows.item(i);
        document.getElementById("data").innerHTML += row.nombre + '' + row.ide + row.sublote + '<br>';
      }
    });
  });
}


function efenologiaRegister(evento, id) {
  var db = dbInicializar();
  db.transaction(function(tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS efenologia (id integer primary key, evento text, ide text)');
    tx.executeSql("INSERT INTO efenologia (evento, ide) VALUES (?,?)", [evento, id], null, null);
  });
}

function predioRegister(nombre, id) {
  var db = dbInicializar();
  db.transaction(function(tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS predio (id integer primary key, nombre text, ide text)');
    tx.executeSql("INSERT INTO predio (nombre, ide) VALUES (?,?)", [nombre, id], null, null);
  });
}

function loteRegister(nombre, id, predio) {
  var db = dbInicializar();
  db.transaction(function(tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS lote (id integer primary key, nombre text, predio text, ide text)');
    tx.executeSql("INSERT INTO lote (nombre, ide, predio) VALUES (?,?,?)", [nombre, id, predio], null, null);
  });
}

function subloteRegister(nombre, id, lote) {
  var db = dbInicializar();
  db.transaction(function(tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS sublote (id integer primary key, nombre text, lote text, ide text)');
    tx.executeSql("INSERT INTO sublote (nombre, ide, lote) VALUES (?,?,?)", [nombre, id, lote], null, null);
  });
}

function varietalRegister(nombre, id, sublote) {
  var db = dbInicializar();
  db.transaction(function(tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS varietal (id integer primary key, nombre text, sublote text, ide text)');
    tx.executeSql("INSERT INTO varietal (nombre, ide, sublote) VALUES (?,?,?)", [nombre, id, sublote], null, null);
  });
}

function fenologiaRegister(status, predioId, predioNom, loteId, loteNom, subloteId, subloteNom, varietalId, varietalNom, fecha, fenologiaId, fenologiaNom, observaciones) {
  var db = dbInicializar();
  db.transaction(function(tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS fenologia (id integer primary key,status text, predioId text, predioNom text, loteId text, loteNom text, subloteId text, subloteNom text, varietalId text, varietalNom text, fecha text, fenologiaId text, fenologiaNom text, observaciones text )');
    tx.executeSql("INSERT INTO fenologia (status, predioId, predioNom, loteId, loteNom, subloteId, subloteNom, varietalId, varietalNom, fecha, fenologiaId, fenologiaNom, observaciones) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)", [status, predioId, predioNom, loteId, loteNom, subloteId, subloteNom, varietalId, varietalNom, fecha, fenologiaId, fenologiaNom, observaciones], null, null);
  });
}