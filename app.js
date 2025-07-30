let listaDeNumerosSorteados = [];
const numeroLimite = 10;
let numeroSecreto;
let tentativas;

const startScreen = document.getElementById('startScreen');
const gameScreen = document.getElementById('gameScreen');
const btnStart = document.getElementById('btnStart');
const btnChutar = document.getElementById('btnChutar');
const btnReiniciar = document.getElementById('btnReiniciar');
const inputNumero = document.getElementById('inputNumero');
const titulo = document.getElementById('titulo');
const instrucao = document.getElementById('instrucao');
const feedback = document.getElementById('feedback');

function numeroPorExtenso(num) {
  const numerosExtenso = ['zero', 'uma', 'duas', 'três', 'quatro', 'cinco', 'seis', 'sete', 'oito', 'nove', 'dez'];
  return numerosExtenso[num] || num;
}

function falar(texto) {
  if (responsiveVoice.voiceSupport()) {
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', { rate: 1.2 });
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

function iniciarJogo() {
  startScreen.style.display = 'none';
  gameScreen.style.display = 'block';

  numeroSecreto = gerarNumeroAleatorio();
  tentativas = 1;
  inputNumero.value = '';
  feedback.innerHTML = '';
  btnReiniciar.disabled = true;
  titulo.innerText = 'Jogo do número secreto';
  instrucao.innerText = 'Escolha um número entre 1 a 10';

  falar('Jogo do número secreto. Escolha um número entre 1 a 10.');
  inputNumero.focus();
}

function verificarChute() {
  const chuteStr = inputNumero.value.trim();
  if (!chuteStr) {
    alert('Por favor, digite um número entre 1 e 10.');
    return;
  }

  const chute = parseInt(chuteStr);
  if (isNaN(chute) || chute < 1 || chute > 10) {
    alert('Número inválido! Escolha um número entre 1 e 10.');
    inputNumero.value = '';
    return;
  }

  if (chute === numeroSecreto) {
    let palavraTentativa = tentativas === 1 ? 'tentativa' : 'tentativas';
    let tentativasExtenso = numeroPorExtenso(tentativas);
    let mensagemTentativas = `Você descobriu o número secreto com ${tentativasExtenso} ${palavraTentativa}!`;

    titulo.innerText = 'Acertou!';
    instrucao.innerText = mensagemTentativas;
    feedback.innerText = '';

    falar('Acertou!');

    setTimeout(() => {
      falar(mensagemTentativas);
    }, 800);

    btnReiniciar.disabled = false;
  } else {
    if (chute > numeroSecreto) {
      instrucao.innerText = 'O número secreto é menor';
      falar('O número secreto é menor');
    } else {
      instrucao.innerText = 'O número secreto é maior';
      falar('O número secreto é maior');
    }
    tentativas++;
  }

  inputNumero.value = '';
  inputNumero.focus();
}

function reiniciarJogo() {
  numeroSecreto = gerarNumeroAleatorio();
  tentativas = 1;
  inputNumero.value = '';
  feedback.innerText = '';
  btnReiniciar.disabled = true;
  titulo.innerText = 'Jogo do número secreto';
  instrucao.innerText = 'Escolha um número entre 1 a 10';

  falar('Jogo do número secreto. Escolha um número entre 1 a 10.');
  inputNumero.focus();
}

btnStart.addEventListener('click', iniciarJogo);
btnChutar.addEventListener('click', verificarChute);
btnReiniciar.addEventListener('click', reiniciarJogo);

// Ativa o chute ao apertar Enter no input
inputNumero.addEventListener('keyup', function (e) {
  if (e.key === 'Enter') {
    verificarChute();
  }
});
