$(document).ready(function() {
//Capturar la información ingresada mediante eventos del DOM con jQuery:
   $('.form1').submit(function(event) {
      event.preventDefault();
      let numeroSuperHero = $('#disabledTextInput').val();
      separaCapturaYConsulta(numeroSuperHero);
   });

});

//Implementar funciones para separar la captura de la información ingresada por el usuario con la consulta a la API:
function separaCapturaYConsulta(numeroSuperHero) {
   if (comprobarInformacion(numeroSuperHero)) {
      consultarAPI(numeroSuperHero);
   } else {
      alert('Debes ingresar un número de SuperHero');
   }
}

//Comprobar la información ingresada por el usuario, que solo debe ser un número:
function comprobarInformacion(numeroSuperHero) {
   return /^\d+$/.test(numeroSuperHero);
}

//Consultar la API mediante AJAX con la sintaxis de jQuery: