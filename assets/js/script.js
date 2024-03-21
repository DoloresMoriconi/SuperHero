//Gráfico CanvasJS, para mostrar dinámicamente información específica del superhéroe:
window.onload = function () {
   dataPoints = [];

   var chart = new CanvasJS.Chart("graficoSuperHero", {
      animationEnabled: true,
      title: {
         text: "Estadísticas de Poder para Deadpool"
      },
      data: [{
         type: "pie",
         startAngle: 240,
         indexLabel: "{label} - {y}",
         yValueFormatString: "###0.0\"%\"",
         dataPoints: dataPoints
      }]
   }); 


$(document).ready(function() {
//Capturar la información ingresada mediante eventos del DOM con jQuery:
   $(".form1").submit(function(event) {
      event.preventDefault();

      let numeroSuperHero = $("#disabledTextInput").val(); 
   
//Implementar funciones para separar la captura de la información ingresada por el usuario con la consulta a la API:

   let comprobarInformacion = /\d/gm; //Comprobar la información ingresada por el usuario, que solo debe ser un número.

      if (comprobarInformacion.test(numeroSuperHero)) {
         
         //Consultar la API mediante AJAX con la sintaxis de jQuery:
            $.ajax({
               type: "GET",
               url:`https://superheroapi.com/api.php/4905856019427443/${numeroSuperHero}`,
               dataType: "json",
               success: function(data) {
                  console.log(data);

                  $("#tarjetaSuperHero").html(tarjetaSuperHero(data));
                  
                  let paresOrdenados = Object.entries(data.powerstats);
                  paresOrdenados.forEach( ([habilidad, valor])=>{
                     dataPoints.push({
                        y: Number(valor),
                        label: habilidad
                     })
                  })
                  chart.render();                
               },
               error: function(error) {
                  alert('Error al consultar la API');
               }
            });

      } else {
         alert('Debes ingresar un número válido de SuperHero');
      }
   });
});

//Renderizar la información recibida por la API dinámicamente utilizando tarjetas de Bootstrap:
function tarjetaSuperHero(data) {
   return  `<div class="card mb-3" style="max-width: 540px;">
               <div class="row g-0">
               <div class="col-md-4">
                  <img src="${data.image.url}" class="img-fluid rounded-start"  alt="...">
               </div>
               <div class="col-md-8">
                  <div class="card-body">
                     <h5 class="card-title">${data.name}</h5>
                     <p class="card-text">Conexiones: ${data.connections["group-affiliation"]}</p>
                     <p class="card-text"><small class="text-body-secondary">Ocupación: ${data.work.occupation}</small></p>
                     <p class="card-text"><small class="text-body-secondary">Raza: ${data.appearance.race}</small></p>
                  </div>
               </div>
               </div>
            </div>`;
   
}

}
