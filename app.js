let listaDeNumerosSorteados =[];
let numeroLimite = 10
let numeroSecreto = gerarNumeroAleatório();
let tentativas = 1;

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    if('speechSynthesis' in window){
     utterance = new SpeechSynthesisUtterance(texto);
    utterance.lang = 'pt-BR';
    utterance.rate = 1.2;
    window.speechSynthesis.speak(utterance);
    } else{
        console.log('web speech api não suportada neste navegador.');
    }
}

function exibirMensagemInicial(){
    exibirTextoNaTela('h1', 'Jogo do numero secreto');
    exibirTextoNaTela('p', 'Escolha um numero entre 1 e 10');
}
exibirMensagemInicial();


function verificarChute() {
    let chute = document.querySelector('input').value;
    if(chute == numeroSecreto){
    exibirTextoNaTela('h1','Acertou');
    let palavraTentativa = tentativas > 1? 'Tentativas' : 'Tentativa';
    let mensagemTentativas = `Você descobriu o numero secreto com ${tentativas} ${palavraTentativa}!`;
    exibirTextoNaTela('p',mensagemTentativas);
    document.getElementById('reiniciar').removeAttribute('disabled');
    } else{
        if(chute > numeroSecreto){
            exibirTextoNaTela('p','O numero secreto é menor');
        }  else{
            exibirTextoNaTela('p','O numero secreto é maior');
        }
        tentativas++;
        limparCampo();
    }
}


function gerarNumeroAleatório() {
   let numeroEscolhido = parseInt(Math.random() *numeroLimite + 1);
   let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;
   if( quantidadeDeElementosNaLista == numeroLimite){
    listaDeNumerosSorteados = [];
   }
    if( listaDeNumerosSorteados.includes(numeroEscolhido)){
        return gerarNumeroAleatório();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        return numeroEscolhido;
    }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    numeroSecreto == gerarNumeroAleatório();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}