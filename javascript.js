var colorArray = ["red","blue","green","purple","pink","yellow","orange"];
var chosenColorArray = [];
var hiddenColorArray = [];
var jogadaAtual = 0;
var dot = 0;
var smalldot = 0;
var currentColor = [];
var numerojogadas;

const submit = document.querySelector(".btn1"); 
const confirm = document.querySelector(".confirm-btn"); 
const colors = document.querySelector(".colors"); 
const verify = document.querySelector(".jogada-btn");
const starter = document.querySelector(".start-btn");
var jogada = document.querySelector(".jogada-" + jogadaAtual);
const listaJogadas = document.querySelector('.lista-jogadas');
var win = document.querySelector('.acertou');
var lose = document.querySelector('.errou');
var displaySetting = win.style.display;
var displaySetting = lose.style.display;

colors.addEventListener("click", function(event) {
	const currentJogada = listaJogadas.querySelector('.jogada-'+jogadaAtual);
	const circle = currentJogada.querySelector(".jogada-colors .dot-" + dot);

	circle.style.backgroundColor = event.target.getAttribute('id');        
} );

submit.addEventListener("click", function() {
	numerojogadas = document.getElementById("input").value;
	isEven(numerojogadas);
	gerarJogada();
} )

function resetDots(){
	dot = 0;
	smalldot = 0;
}

function gerarJogada(){
	resetDots();
	jogadaAtual++;
	dot++;
	smalldot++;
	const jogadaDiv = document.createElement('DIV');
	jogadaDiv.classList.add('jogada');
	jogadaDiv.classList.add('jogada-'+jogadaAtual);

	const jogadaColorsDiv = document.createElement('DIV');
	jogadaColorsDiv.classList.add('jogada-colors');

	const verificaDiv = document.createElement('DIV');
	verificaDiv.classList.add('verifica');
	verificaDiv.classList.add('verifica-'+jogadaAtual);

	for(var i = 0; i < 4; i++){
		jogadaColorsDiv.appendChild(criarDot(i + 1));
		verificaDiv.appendChild(criarSmallDot(i+1));
	}

	jogadaDiv.appendChild(jogadaColorsDiv);
	jogadaDiv.appendChild(verificaDiv);

	listaJogadas.appendChild(jogadaDiv);
}

function isEven(input) {
	if (input%2 == 0){
		for (var i = 0; i < 4; i++) {
			const random = Math.floor(Math.random() * colorArray.length);

			hiddenColorArray.push(colorArray[random]);

			console.log(hiddenColorArray);
		}
	} else {
		console.log ("not even");
	} 
}


confirm.addEventListener("click", function() {
	const currentJogada = listaJogadas.querySelector('.jogada-'+jogadaAtual);
	const currentColor = currentJogada.querySelector('.jogada-colors .dot-'+dot);
	dot++;
	chosenColorArray.push(currentColor.style.backgroundColor);
} ) 

 verify.addEventListener("click", function() {
	var correto = true;
	const currentJogada = listaJogadas.querySelector('.jogada-'+jogadaAtual);

	for (var i = 0; i < chosenColorArray.length; i++) {
		if (chosenColorArray[i] != hiddenColorArray[i]) {
			correto = false;
		}
	}

	if (correto ) {
		console.log("correto");
		alert("Acertou!");
		win.style.display='block';
		//const jogadaDiv = document.createElement('acerta');

	} else {
		for(var i = 0; i < chosenColorArray.length; i++){
			var smallcircle = currentJogada.querySelector(".verifica .smalldot-" + (i+1));
			var posicaoCor = hiddenColorArray.findIndex((item) => item == chosenColorArray[i]);
			console.log(smallcircle);
			if(posicaoCor == -1){
				console.log("Cor não encontrada");
			} else {
				if(i == posicaoCor){
					console.log("Mesma posição: " + i);
					smallcircle.style.backgroundColor = "white";
				} else {
					console.log("Posição diferente: " + posicaoCor);
					smallcircle.style.backgroundColor = "yellow";
				}
			}
		}

		chosenColorArray = [];

		if(jogadaAtual < numerojogadas){
			gerarJogada();
		} else {
			console.log("jogo terminado");
			lose.style.display='block';
		}
	}
} )

function criarDot(dotNum){
	const span = document.createElement('SPAN');
	span.classList.add('dot');
	span.classList.add('dot-'+ dotNum);
	
	return span
}

function criarSmallDot(smallDotNum){
	const Sdot = document.createElement('SPAN');
	Sdot.classList.add('smalldot');
	Sdot.classList.add('smalldot-'+ smallDotNum);

	return Sdot
}
