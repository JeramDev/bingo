const TOTALBOLAS = 90;
const ITEMSCARTON = 15;
const NUMEROJUGADORES = 5;

const dom = {
    juego: document.querySelector('.bingo'),
    botonSacar: document.querySelector('.botonSacar'),
    numeroMostrado: document.querySelector('.valor')
}

// Crear el bombo
const crearBombo = () => {
    let numerosBombo = _.range(1, TOTALBOLAS + 1);
    numerosBombo = _.shuffle(numerosBombo);
    return numerosBombo;    
}

const bombo = crearBombo();

// Crear y mostrar el carton
const crearCartones = (items = ITEMSCARTON, numJugadores = NUMEROJUGADORES) => {
    for (let i = 0; i < numJugadores; i++) {
        dom.juego.innerHTML +=
            `<div class="panel">
                <p class="nombreJugador">Jugador ${i + 1}</p>
                <div class="carton jugador">
                
                </div>
            </div>`;
    }
    const cartones = document.querySelectorAll(`.carton`); 

    cartones.forEach((carton) => {
        let numerosCarton = _.range(1, TOTALBOLAS + 1);
        numerosCarton = _.shuffle(numerosCarton);
        numerosCarton = numerosCarton.slice(0, items);
        mostrarCarton(carton, numerosCarton);
    });
    
}

const mostrarCarton = (carton, numeros) => {
    numeros.forEach((numero) => {
        numero.toString().length == 1 ? numero = `0${numero}` : numero;
        carton.innerHTML += `<div class="numero numero${numero}">${numero}</div>`;
    });
}

// Tachar en los cartones el numero que ha salido
const tacharNumero = (numero) => {
    numero.toString().length == 1 ? numero = `0${numero}` : numero;
    const numerosTachar = document.querySelectorAll(`.numero${numero}`);
    numerosTachar.forEach((num) => {
        num.className += ' tachado';
    });
}

// Muestra el resultado al terminar el juego
const mostrarGanador = (nombreGanador) => {
    dom.juego.innerHTML = `<p class="textoGanador">GANADOR: ${nombreGanador.toUpperCase()}</div>`;
    dom.juego.classList.toggle('win');
}

// Comprueba si algun jugador ha ganado
const checkWin = () => {
    const cartones = document.querySelectorAll('.carton');
    cartones.forEach((car) => {        
        const numerosTachados = car.querySelectorAll('.tachado').length;        
        if (numerosTachados == ITEMSCARTON) {
            mostrarGanador(car.classList.item(1));
        }            
    });
}

// Sacar una bola del bombo
const sacarBola = () => {  
    console.log(bombo);
    checkWin(); 
    const numeroSacado = bombo.pop();    
    dom.numeroMostrado.textContent = numeroSacado;
    tacharNumero(numeroSacado);    
}

const hola = () => {
    console.log('hola');
}
// Boton
dom.botonSacar.addEventListener('click', hola);

// Iniciar juego
const iniciarJuego = () => {
    crearCartones(ITEMSCARTON);  
}

iniciarJuego();
