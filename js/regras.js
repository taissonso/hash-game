onload = ()=> {
    document.querySelector('#btn-x').onclick = () => escolha('X');
    document.querySelector('#btn-o').onclick = () => escolha('O');

    document.querySelector('#btn-reiniciar').onclick = reiniciar;
    document.querySelector('#btn-jogar').onclick = reiniciar;
    document.querySelector('#fechar').onclick = fechar;

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
    escolha == 'O' ? document.querySelector('body').setAttribute("dark", "true") : document.querySelector('body').removeAttribute("dark");
    escolha == 'O' ? document.querySelector('#vez-jogar').style.backgroundImage = "url('../image/darthtab.png')" :document.querySelector('#vez-jogar').style.backgroundImage = "url('../image/yodatab.png')";

    jogador = escolha;
}

/**
 * Reinicia o Jogo para escolher com qual lado quer jogar, limpando os campos do tabuleiro.
 */
const reiniciar = ()=> {
    document.querySelector('#modal').style.display = 'flex';
    document.querySelector('#vez-jogar').innerHTML = '';
    document.querySelector('#modal-vencedor').style.display = 'none';
    document.querySelector('#empate').style.display = 'none';
    document.querySelector('#jogador-vencedor').style.display = 'flex';
    document.querySelector('#titulo-modal-vencedor').innerHTML = 'o vencedor foi';
    let array = document.querySelectorAll('.posicao');
    array.forEach(element => {
        element.setAttribute('value','-1');
        element.style.backgroundImage = "none";
    });

    jogador = '';
}

/** Para fechar o modal do vencedor para ver como o jogo terminou */
const fechar = () => {
    document.querySelector('#modal-vencedor').style.display = 'none';
}

/**
 * Pega a posição de onde foi feita a jogada, coloca a imagem e chama a função de trocarJogador.
 */
const jogada = (posicao) => {
   
    let position = document.getElementById(posicao).getAttribute('value');
    if(position == -1){
        if(jogador == 'X'){
            document.getElementById(posicao).style.backgroundImage = "url('../image/yodatab.png')";
            document.getElementById(posicao).setAttribute('value','1');
            trocaJogador();
        } else {
            document.getElementById(posicao).style.backgroundImage = "url('../image/darthtab.png')";
            document.getElementById(posicao).setAttribute('value','2');
            trocaJogador();
        }
    }
}

/**
 * Faz a troca do jogador e verifica se teve um vencedor. 
 * Se acontecer empate mostra o modal com a mensagem de empate.
 * Caso tenha um vencedor mostra o vencedor em um modal.
 */
const trocaJogador = () => {
    let vencedor = verificaVencedor();
    if(vencedor == false) {
        if(jogador == 'X'){
            jogador = 'O';
            document.querySelector('#vez-jogar').style.backgroundImage = "url('../image/darthtab.png')";
        } else {
            jogador = 'X';
            document.querySelector('#vez-jogar').style.backgroundImage = "url('../image/yodatab.png')";
        }
    } else {
        if(vencedor == -1) {
            document.querySelector('#titulo-modal-vencedor').innerHTML = 'empate';
            document.querySelector('#jogador-vencedor').style.display = 'none';
            document.querySelector('#modal-vencedor').style.display = 'flex';
            document.querySelector('#empate').style.display = 'flex';
        } else{
            if(jogador == 'O'){
                document.querySelector('#modal-vencedor').style.display = 'flex';
                document.querySelector('#jogador-vencedor').style.backgroundImage = "url('../image/darthtab.png')";
            } else {
                document.querySelector('#modal-vencedor').style.display = 'flex';
                document.querySelector('#jogador-vencedor').style.backgroundImage = "url('../image/mestreyoda.png')";
            }
        }
    }
}


/**
 * Verifica se tem um vencedor, faz uma cópia dos values das posições do tabuleiro, e faz varios if's 
 * para verificar se existe um vencedor nas diagonais, linhas ou colunas. Caso não tenha um vencedor faz um 
 * if ternário final para retornar que houve um empate entre os jogadores.
 * 
 */
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

    return vencedor > 0 ? false : '-1'; 
}