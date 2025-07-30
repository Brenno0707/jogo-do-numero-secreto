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

  // Atualiza a tela (sem falar, para evitar bloqueio)
  exibirTextoNaTela('h1', 'Jogo do número secreto', false);
  exibirTextoNaTela('p', 'Escolha um número entre 1 e 10', false);

  document.getElementById('reiniciar').setAttribute('disabled', true);
}

// INICIALIZA OS EVENTOS DE CLIQUE APÓS CARREGAR A PÁGINA
window.addEventListener('DOMContentLoaded', () => {
  // Botão Chutar
  document.getElementById('botaoChutar').addEventListener('click', verificarChute);

  // Botão Novo Jogo - dispara reiniciar + voz
  document.getElementById('reiniciar').addEventListener('click', () => {
    reiniciarJogo();

    // Fala dentro do clique pra não ser bloqueado pelo navegador
    responsiveVoice.speak('Jogo do número secreto', 'Brazilian Portuguese Female', { rate: 1.2 });
    responsiveVoice.speak('Escolha um número entre 1 e 10', 'Brazilian Portuguese Female', { rate: 1.2 });
  });
});
