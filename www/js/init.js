$( document ).ready(function(){  
         $(".button-collapse").sideNav();
})
    
   function fenologiaIndex(){
         $( "#body" ).load( "views/fenologia.html" );
         $('.button-collapse').sideNav('hide');
      } 

   function fenologiaEdit(id){
         $( "#viewsFenologiaEdit" ).show();
         $( "#viewsFenologia" ).hide();
         $('.button-collapse').sideNav('hide');
          editFenologia(id);
    } 
   function fenologiaShow(id){
         $( "#viewsFenologiaShow" ).show();
         $( "#viewsFenologia" ).hide();
         $('.button-collapse').sideNav('hide');
         showFenologia(id);
    } 

   function altaFenologia(){
         $( "#body" ).load( "views/altaFenologia.html" );
         $('.button-collapse').sideNav('hide');
   }    

   function sincronizar(){
         $( "#body" ).load( "views/json.html" );
         $('.button-collapse').sideNav('hide');
      }  
   function hostView(){
         $( "#body" ).load( "views/host.html" );
         $('.button-collapse').sideNav('hide');
   }    

   function inicio(){
         $( "#body" ).load( "views/inicio.html" );
         $('.button-collapse').sideNav('hide');
      }    
   function salir(){
         navigator.app.exitApp()
      }    

