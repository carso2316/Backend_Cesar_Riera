//Search Engine App
const switchBusqueda = $('#checkPersonalizada');

//Slider Initializer
$("#rangoPrecio").ionRangeSlider({
  type: "double",
  grid: false,
  min: 0,
  max: 100000,
  from: 25000,
  to: 75000,
  prefix: "$"
});

function setSearch() {
  switchBusqueda.on('change', (e) => {
    if (this.customSearch == false) {
      this.customSearch = true
    } else {
      this.customSearch = false
    }
    $('#personalizada').toggleClass('invisible');
  });
}

setSearch();

//Ajax Requests

//CitiesList
$.ajax({
  url: 'http://localhost:8080/cities',
  type: 'GET',
  data: {},
  success: function (data) {
    data.forEach((element) => {
      $('#ciudad').append(`<option value="${element}">${element}</option>`);
    });
  }
});

//residencyTypesList
$.ajax({
  url: 'http://localhost:8080/residencyTypes',
  type: 'GET',
  data: {},
  success: function (data) {
    data.forEach((element) => {
      $('#tipo').append(`<option value="${element}">${element}</option>`);
    });
  }
});

//Search Engine
$('#buscar').click(() => {

  let url = 'http://localhost:8080/records';
  let minPrice = $('#rangoPrecio').data("from");
  let maxPrice = $('#rangoPrecio').data("to");
  let cityValue = $('#ciudad').val();
  let typeValue = $('#tipo').val();

  if (switchBusqueda.prop('checked') == true) {
    if (cityValue != "") {
      if (typeValue != "") {
        url = url + '?ciudad=' + cityValue + '&tipo=' + typeValue + '&minPrice=' + minPrice + '&maxPrice=' + maxPrice;
      } else {
        url = url + '?ciudad=' + cityValue + '&minPrice=' + minPrice + '&maxPrice=' + maxPrice;
      }
    } else if (typeValue != "") {
      url = url + '?tipo=' + typeValue + '&minPrice=' + minPrice + '&maxPrice=' + maxPrice;
    } else {
      url = url + '?minPrice=' + minPrice + '&maxPrice=' + maxPrice;
    }
  }

  $.ajax({
    url: url,
    type: 'GET',
    data: {},
    success: function (data) {
      $('div.lista').empty();
      if (data == "") {
        alert('No hay residencias que coincidan con tu búsqueda.');
      } else {

      data.forEach((element) => {
        $('div.lista').append(
         `<div class="card horizontal">
            <div class="card-image">
              <img src="img/home.jpg">
            </div>
            <div class="card-stacked">
              <div class="card-content">
                <div>
                  <b>Direccion: </b><span>${element.Direccion}</span>
                </div>
                <div>
                  <b>Ciudad: </b><span>${element.Ciudad}</span>
                </div>
                <div>
                  <b>Telefono: </b><span>${element.Telefono}</span>
                </div>
                <div>
                  <b>Código postal: </b><span>${element.Codigo_Postal}</span>
                </div>
                <div>
                  <b>Precio: </b><span>${element.Precio}</span>
                </div>
                <div>
                  <b>Tipo: </b><span>${element.Tipo}</span>
                </div>
              </div>
              <div class="card-action right-align">
                <a href="#">Ver más</a>
              </div>
            </div>
          </div>`
        );
      });
      }
    }
  });
});