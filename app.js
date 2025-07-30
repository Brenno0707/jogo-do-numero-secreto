let listaDeNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function numeroPorExtenso(num) {
  const numerosExtenso = ['zero', 'uma', 'duas', 'três', 'quatro', 'cinco', 'seis', 'sete', 'oito', 'nove', 'dez'];
  return numerosExtenso[num] || num;
}

function exibirTextoNaTela(tag, texto, falar = true) {
  let campo = document.querySelector(tag);
  campo.innerHTML = texto;
  if (falar) {
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', { rate: 1.2 });
  }
}

function exibirMensagemInicial() {
  exibirTextoNaTela('h1', 'Jogo do número secreto', false);
  exibirTextoNaTela('p', 'Escolha um número entre 1 e 10', false);

  responsiveVoice.speak('Jogo do número secreto', 'Brazilian Portuguese Female', { rate: 1.2 });
  responsiveVoice.speak('Escolha um número entre 1 e 10', 'Brazilian Portuguese Female', { rate: 1.2 });
}

function iniciarComVoz() {
  exibirMensagemInicial();
  document.body.removeEventListener('click', iniciarComVoz);
}

function verificarChute() {
  let chute = document.querySelector('input').value;

  if (chute == numeroSecreto) {
    let palavraTentativa = tentativas === 1 ? 'tentativa' : 'tentativas';
    let tentativasExtenso = numeroPorExtenso(tentativas);
    let mensagemTentativas = `Você descobriu o número secreto com ${tentativasExtenso} ${palavraTentativa}!`;

    exibirTextoNaTela('h1', 'Acertou!', false);
    exibirTextoNaTela('p', mensagemTentativas, false);

    responsiveVoice.speak('Acertou!', 'Brazilian Portuguese Female', { rate: 1.2 });

    setTimeout(() => {
      responsiveVoice.speak(mensagemTentativas, 'Brazilian Portuguese Female', { rate: 1.2 });
    }, 1000);

    document.getElementById('reiniciar').removeAttribute('disabled');
  } else {
    if (chute > numeroSecreto) {
      exibirTextoNaTela('p', 'O número secreto é menor');
      responsiveVoice.speak('O número secreto é menor', 'Brazilian Portuguese Female', { rate: 1.2 });
    } else {
      exibirTextoNaTela('p', 'O número secreto é maior');
      responsiveVoice.speak('O número secreto é maior', 'Brazilian Portuguese Female', { rate: 1.2 });
    }
    tentativas++;
    limparCampo();
  }
}

function gerarNumeroAleatorio() {
  let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
  let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

  if (quantidadeDeElementosNaLista == numeroLimite) {
    listaDeNumerosSorteados = [];
  }

  if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
    return gerarNumeroAleatorio();
  } else {
    listaDeNumerosSorteados.push(numeroEscolhido);
    return numeroEscolhido;
  }
}

function limparCampo() {
  let chute = document.querySelector('input');
  chute.value = '';
}

function reiniciarJogo() {
  numeroSecreto = gerarNumeroAleatorio();
  limparCampo();
  tentativas = 1;
  exibirTextoNaTela('h1', 'Jogo do número secreto', false);
  exibirTextoNaTela('p', 'Escolha um número entre 1 e 10', false);

  document.getElementById('reiniciar').setAttribute('disabled', true);

  document.body.addEventListener('click', iniciarComVoz);
}

window.addEventListener('DOMContentLoaded', () => {
  document.body.addEventListener('click', iniciarComVoz);
});
