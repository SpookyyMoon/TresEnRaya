$(document).ready(function() {

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
    let MATRIZ = [
                   [" ", " ", " "],
                   [" ", " ", " "],
                   [" ", " ", " "]
                ];
    
    // MATRIZ tablero
    let MATRIZ_VACIA = [
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

    // Interacciones Jquery
    $("button#inicio").click(function() {
        iniciarJuego();
    });

    $(document).on("click", ".reiniciar", function() {
        reiniciarJuego();
    });

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
            return true;
        }
        return false;
    }

    function iniciarJuego() {
        // Limpiar elementos
        $("#normas").remove();
        $("#contenedorDer").empty().append(TABLERO);
        
        // Registrar los nombres de los jugadores
        let jugador1 = $("#nombreJugador1").val();
        let jugador2 = $("#nombreJugador2").val();
        jugadoresLista = [jugador1, jugador2];
        
        // Eventos en las celdas
        asignarEventosCeldas();
    }

    function asignarEventosCeldas() {
        $(".celda").off("click").on("click", function() {
            if(ganador == null) {
                let indice = $(this).attr("id");
                if(comprobarCelda(indice)) {
                    $(this).text(TURNO[turnoActual]);
                    comprobarGanador();
                    if(ganador === null) {
                        cambiarturno();
                    }
                }
            }
        });
    }

    function reiniciarJuego() {
        ganador = null;
        jugadoresLista = [];
        turnoActual = 1;

        MATRIZ = JSON.parse(JSON.stringify(MATRIZ_VACIA));
        
        $(".mostrarGanador").remove();
        $("#contenedorDer").empty().append(TABLERO);
        
        $("#contenedorIzq").html(`
            <p id="titulo">Tres en Raya</p>
            <div id="jugadoresInfo">
                <p id="jugador1"> 
                    Jugador 1:
                    <br>
                    <input id="nombreJugador1" value="${$("#nombreJugador1").val() || ''}">
                </p>
                <p id="jugador2">
                    Jugador 2:
                    <br>
                    <input id="nombreJugador2" value="${$("#nombreJugador2").val() || ''}">
                </p>
                <button id="inicio">Iniciar</button>
            </div>
        `);
        
        $("button#inicio").click(function() {
            iniciarJuego();
        });
    }

    function mostrarGanador() {
        const GANADOR_TEXO = `
            <div class="mostrarGanador">
                <p id="titulo">¡Partida terminada!</p>
                <p>¡El jugador ${ganador} ha ganado!</p>
                <button class="reiniciar">Volver a comenzar</button>
            </div>`;
        const EMPATE_TEXTO = `
            <div class="mostrarGanador">
                <p id="titulo">¡Partida terminada!</p>
                <p>¡El juego ha quedado en empate!</p>
                <button class="reiniciar">Volver a comenzar</button>
            </div>`;

        if (ganador != null){
            $("#contenedorIzq").append(GANADOR_TEXO);
        }
        else{
            $("#contenedorIzq").append(EMPATE_TEXTO);
        }
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
            mostrarGanador();
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
            mostrarGanador();
            return;
        }
        else if ((MATRIZ[0][0] != " " && MATRIZ[0][1] != " " && MATRIZ[0][2] != " ") &&
        (MATRIZ[1][0] != " " && MATRIZ[1][1] != " " && MATRIZ[1][2] != " ") &&
        (MATRIZ[2][0] != " " && MATRIZ[2][1] != " " && MATRIZ[2][2] != " ") &&
        (MATRIZ[0][0] != " " && MATRIZ[1][1] != " " && MATRIZ[2][2] != " ") &&
        (MATRIZ[0][2] != " " && MATRIZ [1][1] != " " && MATRIZ[2][0] != " ")){
            console.log("Empate!");
            ganador = null;
            mostrarGanador();
            return;
        }
    }
});