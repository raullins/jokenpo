let placar = JSON.parse(localStorage.getItem('placar')) || {
  vitorias: 0,
  derrotas: 0,
  empates: 0
};

mostrarEAttPlacar();

/*
if (!placar){
  placar = {
    vitorias: 0,
    derrotas: 0,
    empates: 0,
  };
}
*/

function jogarJokenpo(escolhaDoJogador){
  const resultadoComp = pegarMovimentoDoComp();

  let resultadoFinal = '';

  if(escolhaDoJogador === 'tesoura'){
    if (resultadoComp === 'pedra'){
      resultadoFinal = 'Voce perdeu!';
  } else if (resultadoComp === 'papel'){
      resultadoFinal = 'Voce ganhou!';
  } else if (resultadoComp === 'tesoura'){
      resultadoFinal = 'Empate!';
  }

  } else if (escolhaDoJogador === 'pedra'){
    if (resultadoComp === 'pedra'){
      resultadoFinal = 'Empate!';
  } else if (resultadoComp === 'papel'){
      resultadoFinal = 'Voce perdeu!';
  } else if (resultadoComp === 'tesoura'){
      resultadoFinal = 'Voce ganhou!';
  }

  } else if (escolhaDoJogador === 'papel'){
    if (resultadoComp === 'pedra'){
      resultadoFinal = 'Voce ganhou!';
  } else if (resultadoComp === 'papel'){
      resultadoFinal = 'Empate!';        
  } else if (resultadoComp === 'tesoura'){
      resultadoFinal = 'Voce perdeu!';
  }
  }

  if (resultadoFinal === 'Voce ganhou!'){
    placar.vitorias += 1;
  }else if(resultadoFinal === 'Voce perdeu!'){
    placar.derrotas += 1;
  }else{
    placar.empates += 1;
  }

  localStorage.setItem('placar', JSON.stringify(placar));

  mostrarEAttPlacar();

  document.querySelector('.js-resultado').innerHTML = `${resultadoFinal}`;

  document.querySelector('.js-jogadas').innerHTML = `Você escolheu: <img src="Imagens/${escolhaDoJogador}-emoji.png" class="iconeJogada"> e o computador escolheu <img src="Imagens/${resultadoComp}-emoji.png" class="iconeJogada">.`;

}

function mostrarEAttPlacar(){
    document.querySelector('.js-placar').innerHTML = `Vitorias: ${placar.vitorias}, Derrotas: ${placar.derrotas}, Empates: ${placar.empates}`;
  };

function pegarMovimentoDoComp (){
  let resultadoComp = '';
  const numeroRandom = Math.random();

  if (numeroRandom >= 0 && numeroRandom < 1/3){
    resultadoComp = 'pedra';
  } else if (numeroRandom >= 1/3 && numeroRandom < 2/3){
    resultadoComp = 'papel';
  } else if(numeroRandom >= 2/3 && numeroRandom < 1){
    resultadoComp = 'tesoura';
  }

  return resultadoComp;
}

let estaJogando = false;
let idIntervalo;

function autoPlay(){
  if(!estaJogando){
    idIntervalo = setInterval(() => {
      const escolhaDoJogador = pegarMovimentoDoComp();
      jogarJokenpo(escolhaDoJogador);
    }, 1500);
    estaJogando = true;
    document.querySelector('.autoBotao').innerHTML = 'Parar auto play';
    
  }else{
    clearInterval(idIntervalo);
    estaJogando = false;
    document.querySelector('.autoBotao').innerHTML = 'Auto play';
  }
}

document.body.addEventListener('keydown', (event) => {
  if(event.key === 'p'){
    jogarJokenpo('pedra');
  } else if(event.key === 'e'){
    jogarJokenpo('papel');
  } else if(event.key === 't'){
    jogarJokenpo('tesoura');
  }
});

document.querySelector('.js-botao-jogada-pedra').
  addEventListener('click', () => {
    jogarJokenpo('pedra');
  });

document.querySelector('.js-botao-jogada-papel').
  addEventListener('click', () => {
    jogarJokenpo('papel');
  });

document.querySelector('.js-botao-jogada-tesoura').
  addEventListener('click', () => {
    jogarJokenpo('tesoura');
  });
