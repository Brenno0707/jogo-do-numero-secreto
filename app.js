let listaDeNumerosSorteados = [];
const numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

// Converte número em palavra para voz ficar natural
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

function verificarChute() {
  let chute = document.querySelector('input').value;

  if (!chute) {
    alert('Por favor, digite um número entre 1 e 10.');
    return;
  }

  if (chute < 1 || chute > 10) {
    alert('Número inválido! Escolha um número entre 1 e 10.');
    limparCampo();
    return;
  }

  if (parseInt(chute) === numeroSecreto) {
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
    if (parseInt(chute) > numeroSecreto) {
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
  if (listaDeNumerosSorteados.length === numeroLimite) {
    listaDeNumerosSorteados = [];
  }

  let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);

  if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
    return gerarNumeroAleatorio();
  } else {
    listaDeNumerosSorteados.push(numeroEscolhido);
    return numeroEscolhido;
  }
}

function limparCampo() {
  document.querySelector('input').value = '';
}

function reiniciarJogo() {
  numeroSecreto = gerarNumeroAleatorio();
  limparCampo();
  tentativas = 1;

  // Mantém o texto original "Jogo do número secreto" e "Escolha um número entre 1 a 10"
  document.querySelector('h1').innerHTML = 'Jogo do número secreto';
  document.querySelector('p').innerHTML = 'Escolha um número entre 1 a 10';

  document.getElementById('reiniciar').setAttribute('disabled', true);
}

window.addEventListener('DOMContentLoaded', () => {
  document.getElementById('botaoChutar').addEventListener('click', verificarChute);

  document.getElementById('reiniciar').addEventListener('click', () => {
    reiniciarJogo();

    // Fala as instruções dentro do clique para não ser bloqueado
    responsiveVoice.speak('Jogo do número secreto', 'Brazilian Portuguese Female', { rate: 1.2 });
    responsiveVoice.speak('Escolha um número entre 1 a 10', 'Brazilian Portuguese Female', { rate: 1.2 });
  });

  // Ativa voz na primeira interação do usuário
  document.body.addEventListener('click', function ativarVozInicial() {
    responsiveVoice.speak('Jogo do número secreto', 'Brazilian Portuguese Female', { rate: 1.2 });
    responsiveVoice.speak('Escolha um número entre 1 a 10', 'Brazilian Portuguese Female', { rate: 1.2 });
    document.body.removeEventListener('click', ativarVozInicial);
  });
});
