$(document).ready( function() {

    // Tablero vacio
    const TABLERO = `
            <div id="tablero">
                <!-- Linea superior -->
                <div id="celda00" class="celda"></div>
                <div id="celda01" class="celda"></div>
                <div id="celda02" class="celda"></div>
                <!-- Linea del medio -->
                <div id="celda10" class="celda"></div>
                <div id="celda11" class="celda"></div>
                <div id="celda12" class="celda"></div>
                <!-- Linea inferior -->
                <div id="celda20" class="celda"></div>
                <div id="celda21" class="celda"></div>
                <div id="celda22" class="celda"></div>
            </div>`;
    
    // MATRIZ tablero
    const MATRIZ = [
                   [" ", " ", " "],
                   [" ", " ", " "],
                   [" ", " ", " "]
                ];

    // Turnos
    const TURNO = ["O", "X"];
    let turnoActual = 1;

    // Ganador
    let jugadoresLista = [];
    let ganador = null;

    // Funciones
    function cambiarturno() {
        if (turnoActual == 0) {
            turnoActual = 1;
        }
        else {
            turnoActual = 0;
        }
    }

    function comprobarCelda(id) {
        let fila = id[5];
        let columna = id[6];
        if (MATRIZ[fila][columna] == " "){
            MATRIZ[fila][columna] = TURNO[turnoActual];
            console.log(MATRIZ);
            return true;
        }
        return false;
    }

    function reiniciarJuego() {
        // Mostrar ganador
        const GANADOR_TEXO = `
            <div id="mostrarGanador">
                <p id="titulo">¡Partida terminada!</p>
                <p>¡El jugador ${ganador} ha ganado!</p>
                <button id="reiniciar">Volver a comenzar</button>
            </div>`;

        $("#jugadoresInfo").remove();
        $("#contenedorIzq").append(GANADOR_TEXO);

        // Reiniciar partida
        $("button#reiniciar").on("click", function(){
            ganador = null;
            jugadoresLista = [];
            turnoActual = 1;
            $("#tablero").remove();
            $("#contenedorDer").append(TABLERO);
        });
    }

    function comprobarGanador() {
        if ((MATRIZ[0][0] === "X" && MATRIZ[0][1] === "X" && MATRIZ[0][2] === "X") ||
        (MATRIZ[1][0] === "X" && MATRIZ[1][1] === "X" && MATRIZ[1][2] === "X") ||
        (MATRIZ[2][0] === "X" && MATRIZ[2][1] === "X" && MATRIZ[2][2] === "X") ||
        (MATRIZ[0][0] === "X" && MATRIZ[1][0] === "X" && MATRIZ[2][0] === "X") ||
        (MATRIZ[0][1] === "X" && MATRIZ[1][1] === "X" && MATRIZ[2][1] === "X") ||
        (MATRIZ[0][2] === "X" && MATRIZ[1][2] === "X" && MATRIZ[2][2] === "X") ||
        (MATRIZ[0][0] === "X" && MATRIZ[1][1] === "X" && MATRIZ[2][2] === "X") ||
        (MATRIZ[0][2] === "X" && MATRIZ[1][1] === "X" && MATRIZ[2][0] === "X")) {
            console.log(`${jugadoresLista[0]} ha ganado!`);
            ganador = jugadoresLista[0];
            reiniciarJuego();
            return;
        }
        else if ((MATRIZ[0][0] === "O" && MATRIZ[0][1] === "O" && MATRIZ[0][2] === "O") ||
        (MATRIZ[1][0] === "O" && MATRIZ[1][1] === "O" && MATRIZ[1][2] === "O") ||
        (MATRIZ[2][0] === "O" && MATRIZ[2][1] === "O" && MATRIZ[2][2] === "O") ||
        (MATRIZ[0][0] === "O" && MATRIZ[1][0] === "O" && MATRIZ[2][0] === "O") ||
        (MATRIZ[0][1] === "O" && MATRIZ[1][1] === "O" && MATRIZ[2][1] === "O") ||
        (MATRIZ[0][2] === "O" && MATRIZ[1][2] === "O" && MATRIZ[2][2] === "O") ||
        (MATRIZ[0][0] === "O" && MATRIZ[1][1] === "O" && MATRIZ[2][2] === "O") ||
        (MATRIZ[0][2] === "O" && MATRIZ[1][1] === "O" && MATRIZ[2][0] === "O")) {
            console.log(`${jugadoresLista[1]} ha ganado!`);
            ganador = jugadoresLista[1];
            reiniciarJuego();
            return;
        }
        else if ((MATRIZ[0][0] != " " && MATRIZ[0][1] != " " && MATRIZ[0][2] != " ") &&
        (MATRIZ[1][0] != " " && MATRIZ[1][1] != " " && MATRIZ[1][2] != " ") &&
        (MATRIZ[2][0] != " " && MATRIZ[2][1] != " " && MATRIZ[2][2] != " ") &&
        (MATRIZ[0][0] != " " && MATRIZ[1][1] != " " && MATRIZ[2][2] != " ") &&
        (MATRIZ[0][2] != " " && MATRIZ [1][1] != " " && MATRIZ[2][0] != " ")){
            console.log("Empate!");
            reiniciarJuego();
            return;
        }
    }

    // Interacción Jquery
    $("button#inicio").click( function() {
        $("#normas").remove();
        $("#contenedorDer").append(TABLERO);
        let jugador1 = $("#nombreJugador1").val();
        let jugador2 = $("#nombreJugador2").val();
        jugadoresLista.push(jugador1, jugador2);
        console.log(jugadoresLista);

        $(".celda").on("click", function() {
            let indice = $(this).attr("id");
            if(comprobarCelda(indice)) {
                $(this).text(TURNO[turnoActual]);
                comprobarGanador();
                cambiarturno();
            }
        });
    });
});