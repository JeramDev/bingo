const botonSacar = document.querySelector('.botonSacar');
const numeroMostrado = document.querySelector('.valor');

// Crear el bombo
const crearBombo = () => {
    let numerosBombo = _.range(1, 91);
    numerosBombo = _.shuffle(numerosBombo);
    return numerosBombo;    
}

const bombo = crearBombo();

// Crear y mostrar el carton
const crearCarton = (player) => {
    const carton = document.querySelector(`.carton.${player}`);
    let numerosCarton = _.range(1, 91);
    numerosCarton = _.shuffle(numerosCarton);
    numerosCarton = numerosCarton.slice(0,15);
    mostrarCarton(carton, numerosCarton);
    return carton;
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
    const juego = document.querySelector('.bingo');
    juego.innerHTML = `<p class="textoGanador">GANADOR: ${nombreGanador.toUpperCase()}</div>`;
    juego.classList.toggle('win');
}

// Comprueba si algun jugador ha ganado
const checkWin = () => {
    const cartones = document.querySelectorAll('.carton');
    cartones.forEach((car) => {        
        const numerosTachados = car.querySelectorAll('.tachado').length;        
        if (numerosTachados == 15) {
            mostrarGanador(car.classList.item(1));
        }            
    });
}

// Sacar una bola del bombo
const sacarBola = () => {      
    const numeroSacado = bombo.pop();    
    numeroMostrado.textContent = numeroSacado;
    tacharNumero(numeroSacado);    
}

// Boton
botonSacar.addEventListener('click', sacarBola);

// Iniciar juego
const iniciarJuego = () => {
    crearCarton("jugador");   
    crearCarton("cpu");  
}

iniciarJuego();
