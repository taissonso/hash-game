onload = ()=> {
    console.log("CARGOU!!!!");

    document.querySelector('#btn-x').onclick = () => escolha('x');
    document.querySelector('#btn-o').onclick = () => escolha('o');
}

const escolha = (escolha)=> {
    console.log(escolha);
}