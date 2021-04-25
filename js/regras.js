onload = ()=> {
    console.log("CARGOU!!!!");

    document.querySelector('#btn-x').onclick = () => escolha('X');
    document.querySelector('#btn-o').onclick = () => escolha('O');

    document.querySelector('#btn-reiniciar').onclick = reiniciar;

    document.querySelector('#pos-1').onclick = () => jogada('pos-1');
    document.querySelector('#pos-2').onclick = () => jogada('pos-2');
    document.querySelector('#pos-3').onclick = () => jogada('pos-3');
    document.querySelector('#pos-4').onclick = () => jogada('pos-4');
    document.querySelector('#pos-5').onclick = () => jogada('pos-5');
    document.querySelector('#pos-6').onclick = () => jogada('pos-6');
    document.querySelector('#pos-7').onclick = () => jogada('pos-7');
    document.querySelector('#pos-8').onclick = () => jogada('pos-8');
    document.querySelector('#pos-9').onclick = () => jogada('pos-9');
}

let jogador = '';


/**
 * Modal para quando iniciar o jogo escolhar qual lado quer jogar, sempre será a escolha 
 * do primeiro jogador.
 */
const escolha = (escolha) => {
    document.querySelector('#modal').style.display = 'none';
    // document.querySelector('#vez-jogar').innerHTML = escolha;

    escolha == 'O' ? document.querySelector('body').setAttribute("dark", "true") : document.querySelector('body').removeAttribute("dark");
    escolha == 'O' ? document.querySelector('#vez-jogar').style.backgroundImage = "url('../image/darthtab.png')" :document.querySelector('#vez-jogar').style.backgroundImage = "url('../image/yodatab.png')";

    jogador = escolha;
}

/**
 * Reinicia o Jogo para escolher com qual lado quer jogar.
 */
const reiniciar = ()=> {
    document.querySelector('#modal').style.display = 'flex';
    document.querySelector('#vez-jogar').innerHTML = '';
    
    let array = document.querySelectorAll('.posicao');
    array.forEach(element => {
        element.setAttribute('value','-1');
        element.style.backgroundImage = "none";
    });

    jogador = '';
}


const jogada = (posicao) => {
   
    let position = document.getElementById(posicao).getAttribute('value');
    if(position == -1){
        if(jogador == 'X'){
            // document.getElementById(posicao).style.background = 'blue';
            document.getElementById(posicao).style.backgroundImage = "url('../image/yodatab.png')";
            document.getElementById(posicao).setAttribute('value','1');
            trocaJogador();
        } else {
            // document.getElementById(posicao).style.background = 'red';
            document.getElementById(posicao).style.backgroundImage = "url('../image/darthtab.png')";
            document.getElementById(posicao).setAttribute('value','2');
            trocaJogador();
        }
    }
}

const trocaJogador = () => {
    let vencedor = verificaVencedor();
    if(vencedor == false) {
        if(jogador == 'X'){
            jogador = 'O';
            // document.querySelector('#vez-jogar').innerHTML = jogador;
            document.querySelector('#vez-jogar').style.backgroundImage = "url('../image/darthtab.png')";
        } else {
            jogador = 'X';
            // document.querySelector('#vez-jogar').innerHTML = jogador;
            document.querySelector('#vez-jogar').style.backgroundImage = "url('../image/yodatab.png')";
        }
    } else {
        if(vencedor == -1) {
            console.log("EMPATE")
        } else{
            console.log("Vencedor é o jogador " + jogador);
        }
    }
}

const verificaVencedor = () => {
    let vencedor = 0;
    let array = document.querySelectorAll('.posicao');
    let position = [];

    for(let i=0; i < array.length; i++){
        position[i] = array[i].getAttribute('value');
        if(position[i] == '-1'){
            vencedor++;
        } 
    }

    if( (position[0] == position[4]) && (position[4] == position[8]) && (position[0] != '-1') ){
        return true;
    } else if( (position[2] == position[4]) && (position[4] == position[6]) && (position[2] != '-1') ){
        return true;
    } else if( (position[0] == position[1]) && (position[1] == position[2]) && (position[0] != '-1') ){
        return true;
    } else if( (position[3] == position[4]) && (position[4] == position[5]) && (position[3] != '-1') ){
        return true
    } else if( (position[6] == position[7]) && (position[7] == position[8]) && (position[6] != '-1') ){
        return true;
    } else if( (position[0] == position[3]) && (position[3] == position[6]) && (position[0] != '-1') ){
        return true;
    } else if( (position[1] == position[4]) && (position[4] == position[7]) && (position[1] != '-1') ){
        return true;
    } else if( (position[2] == position[5]) && (position[5] == position[8]) && (position[2] != '-1') ){
        return true;
    } 
    console.log(vencedor)
    return vencedor > 0 ? false : '-1'; 
}