$("document").ready(function () {
  $.ajax({
    url: "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=151",
    type: "GET",
    dataType: "JSON",
    success: function (pokemones) {
      const listado = pokemones.results; // Arreglo de Objs
      const listadoNombres = listado.map(function (el) {
        return el.name.toUpperCase();
      });
      listadoNombres.forEach(function (element) {
        $("#selectPoke").append(
          `<option value="${element}">${element}</option>`
        );
      });
    },
  });

  $("#buscarPoke").click(function () {
    const nombrePoke = $("#inputPoke").val();
    // Normalizar el input
    // Minúsculas
    // Espacios en Blanco
    const nombrePokeNormalizado = nombrePoke.trim().toLowerCase();

    $.ajax({
      url: `https://pokeapi.co/api/v2/pokemon/${nombrePokeNormalizado}`,
      type: "GET",
      dataType: "JSON",
      success: function (data) {
        const nombrePoke = data.name.toUpperCase();
        $("#nombrePoke").text(nombrePoke);

        const spriteFront = data.sprites.front_default;
        $("#imgPokeFront").attr("src", spriteFront);

        const spriteBack = data.sprites.back_default;
        $("#imgPokeBack").attr("src", spriteBack);
      },
    });
  });

  $("#selectPoke").on("change", function (v) {
    const selectedPoke = v.target.value;
    const selectedPokeNormalizado = selectedPoke.toLowerCase();

    $.ajax({
      url: `https://pokeapi.co/api/v2/pokemon/${selectedPokeNormalizado}`,
      type: "GET",
      dataType: "JSON",
      success: function (data) {
        /* --------------- Seccion Selecciona tu Pokemon --------------- */
        const nombrePoke = data.name.toUpperCase();
        const spriteFront = data.sprites.front_default;
        const spriteBack = data.sprites.back_default;

        $("#nombrePoke").text(nombrePoke);
        $("#imgPokeFront").attr("src", spriteFront);
        $("#imgPokeBack").attr("src", spriteBack);
        /* --------------- Seccion Selecciona tu Pokemon --------------- */

        /* --------------- Seccion Datos Pokemon --------------- */
        const idPoke = data.id;
        const Habilidades = data.abilities;

        $("#idPoke").text(idPoke);
        //$('#idPoke').html(idPoke);
        $("#habilidad1Poke").text(Habilidades[0].ability.name);
        $("#habilidad2Poke").text(Habilidades[1].ability.name);
        //$("#habilidad3Poke").text(Habilidades[2].ability.name);
        //console.log(Habilidades);
        //console.log(data.abilities);
        //console.log(idPoke);
        const listado = Habilidades.map(function (el) {
          return el.ability.name.toUpperCase();
        });

        //console.log(listado);
        //listado.forEach((element) => console.log(element));

        /* listado.forEach(function (element) {
          $("#selectPoke").append(
            `<option value="${element}">${element}</option>`
          );
        }); */

        $("#tipoPoke").text(data.types[0].type.name);
        //console.log(data);

        /* --------------- Seccion Datos Pokemon --------------- */

        /* --------------- Seccion Estadisticas  Pokemon --------------- */

        var salud_poke = data.stats[5].base_stat;
        var ataque_Poke = data.stats[4].base_stat;
        var ataqueespecial_poke = data.stats[2].base_stat;
        var defensa_poke = data.stats[3].base_stat;
        var defensaespecial_poke = data.stats[1].base_stat;
        var velocidad_poke = data.stats[0].base_stat;

        $("#saludpoke").html(salud_poke);
        $("#ataquePoke").html(ataque_Poke);
        $("#ataqueespecialpoke").html(ataqueespecial_poke);
        $("#defensapoke").html(defensa_poke);
        $("#defensaespecialpoke").html(defensaespecial_poke);
        $("#velocidadpoke").html(velocidad_poke);

        var poke_stats_value = [
          salud_poke,
          ataque_Poke,
          ataqueespecial_poke,
          defensa_poke,
          defensaespecial_poke,
          velocidad_poke,
        ];

        var poke_stats_name = [
          "Salud",
          "Ataque",
          "Ataque Especial",
          "Defensa",
          "Defensa Especial",
          "Velocidad",
        ];

        /* --------------- Chart JS --------------- */
        var ctx = document.querySelector("#graficopoke");

        var pokeGraph = new Chart(ctx, {
          type: "radar",
          data: {
            labels: poke_stats_name,
            datasets: [
              {
                data: poke_stats_value,
                label: nombrePoke,
                backgroundColor: "rgba(239, 83, 80, 0.25)",
                borderColor: "rgba(239, 83, 80, 0.5)",
              },
            ],
          },
          options: {
            scale: {
              ticks: {
                suggestedMin: 0,
                suggestedMax: 200,
              },
            },
          },
        });
      },
    });

    $.ajax({
      url: `https://pokeapi.co/api/v2/pokemon-species/${selectedPokeNormalizado}`,
      type: "GET",
      dataType: "JSON",
      success: function (data) {
        var poke_habitat = data.habitat.name;
        $("#habitatPoke").html(poke_habitat);
      },
    });
  });

  /* $(function () {
    $("#poke-graph").CanvasJSChart({
      title: {
        text: "PokeGrafico",
        fontSize: 30,
      },
      axisY: {
        title: "Products in %",
      },
      legend: {
        verticalAlign: "center",
        horizontalAlign: "right",
      },
      data: [
        {
          type: "pie",
          showInLegend: true,
          toolTipContent: "{label} <br/> {y} %",
          indexLabel: "{y} %",
          dataPoints: [
            { label: "poto", y: 20, legendText: "poto" },
            { label: "Apple", y: 20, legendText: "Apple" },
            { label: "Huawei", y: 20, legendText: "Huawei" },
            { label: "LG", y: 20, legendText: "LG Electronics" },
            { label: "Lenovo", y: 10, legendText: "Lenovo" },
            { label: "Others", y: 10, legendText: "Others" },
          ],
        },
      ],
    });
  }); */
});

// Dos funciones con ajax que realicen alguna petición a la PokeAPI

// Primera: Traer los nombres de los pokemones (Lunes!)

// Segunda: Traer características del pokemon seleccionado.

// jQuery
// .ajax({})

// Vanilla JS
// Escribir funciones asíncronas (Peticiones API)
// Promise()
// async await function() {}
