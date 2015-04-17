//Genera un numero aleatorio entre un rango de numeros enteros
function aleatorio(minimo,maximo){
	var numero = Math.floor(Math.random() * (maximo - minimo + 1) + minimo);
	return numero;
}

var opciones =["Frontend","Desarrollador","Internet","Backend","Tecnologia","Amor","Vida","Juegos"];

var ale = aleatorio(0,7);

var palabra = opciones[ale]; //palabra = Posicion del array opciones aleatoria 

var hombre, l, espacio;

//Declaracion clase ahorcado
var Ahorcado = function(con){
	this.contexto = con;
	this.maximo = 5;
	this.intentos = 0;
	this.vivo = true;
	this.dibujar();  // Para que cuando inicia, dibuje el poste
}


function iniciar(){

	var canvas = document.getElementById("c");
	canvas.width = 500;
	canvas.height = 400;
	var contexto = canvas.getContext("2d");

	l = document.getElementById("letra");
	var b = document.getElementById("boton");

	hombre = new Ahorcado(contexto); //hombre es un objeto tipo Ahorcado

	palabra = palabra.toUpperCase(); //Palabra pasada toda a mayuscula

	espacio = new Array(palabra.length); //Array vacio con longitud dependiendo de la longitud de la palabra

	mostrarPista(espacio);

	b.addEventListener("click",agregarLetra);
}

function agregarLetra(){
	 var letra = l.value;
	 l.value = ""; //Vacia el campo de texto
	 l.focus(); //Se enfoca en el campo de texto
	 mostrarPalabra(palabra,hombre,letra);
}

function mostrarPalabra(palabra, objeto, letra){
	var encontrado = false;
	var p;
	letra = letra.toUpperCase(); //Pasa la letra a mayuscula
	for(p in palabra) //Recorre toda la palabra
	{
		if(letra == palabra[p]){ //Si encuentra la letra en la palabra
			espacio[p] = letra; //Llena la posicion p del array espacio con la letra encontrada
			encontrado = true;
		}
	}
	mostrarPista(espacio); 

	if(!encontrado){ //Si encontrado es falso dibuja una parte del ahorcado
		objeto.trazar();
	}

	if(!objeto.vivo){ //Si vivo es falso llena los espacios con todas las letras de la palabra
		perder(palabra);
	}
}

function mostrarPista(espacio){
	var pista = document.getElementById("pista");
	var texto = "";
	var i;
	var largo = espacio.length;

	for(i=0;i<largo;i++){
		if(espacio[i] != undefined){ //Si la posicion i del array espacio no es indefinida (no es vacia)
			texto += espacio[i]+" "; //Guarda contenido de texto + la posicion del espacio en texto
		}
		else 					//Si la posicion del array es indefinida (es vacia) 
		{
			texto += "_ "; //Guarda en texto, contenido de texto + "_ "
		}
	}
	pista.innerText = texto; //Pone en la pista el contenido de texto 
}

Ahorcado.prototype.dibujar = function(){

	var dibujo = this.contexto;
	// Dibujando el poste
	dibujo.beginPath();
	dibujo.moveTo(150,100);
	dibujo.lineTo(150,50);
	dibujo.lineTo(400,50);
	dibujo.lineTo(400,350);
	dibujo.strokeStyle = "#000";
	dibujo.lineWidth = 10;
	dibujo.stroke();
	dibujo.closePath()
	if(this.intentos > 0){  //Dibujando la cabeza
	 	dibujo.beginPath();
	 	dibujo.arc(150, 140, 40, 0, Math.PI * 2, false);
	 	dibujo.strokeStyle = "#F00";
	 	dibujo.lineWidth = 5;
	 	dibujo.stroke();
	 	dibujo.closePath()
	 	if(this.intentos > 1){ //Dibujando el tronco
	 		dibujo.beginPath();
	 		dibujo.moveTo(150,180);
	 		dibujo.lineTo(150,280);
	 		dibujo.strokeStyle = "#F00";
	 		dibujo.lineWidth = 5;
	 		dibujo.stroke();
	 		dibujo.closePath()
	 		if(this.intentos > 2){ //Dibuja los brazo
	 			dibujo.beginPath();
	 			dibujo.moveTo(100,220);
	 			dibujo.lineTo(150,180);
	 			dibujo.lineTo(200,220);
	 			dibujo.strokeStyle = "F00";
	 			dibujo.lineWidth = 5;
	 			dibujo.stroke();
	 			dibujo.closePath()
	 			if(this.intentos > 3){ //Dibuja piernas
	 				dibujo.beginPath();
	 				dibujo.moveTo(100,320);
	 				dibujo.lineTo(150,280);
	 				dibujo.lineTo(200,320);
	 				dibujo.strokeStyle = "#F00";
	 				dibujo.lineWidth = 5;
	 				dibujo.stroke();
	 				dibujo.closePath()
	 				if(this.intentos > 4){ // Dibuja ojos muertos
	 					dibujo.beginPath();
	 					dibujo.moveTo(125,120);
	 					dibujo.lineTo(145,145);
	 					dibujo.moveTo(145,120);
	 					dibujo.lineTo(125,145);
	 					dibujo.moveTo(155,120);
	 					dibujo.lineTo(175,145);
	 					dibujo.moveTo(175,120);
	 					dibujo.lineTo(155,145);
	 					dibujo.strokeStyle = "blue";
	 					dibujo.lineWidth = 5;
	 					dibujo.stroke();
	 					dibujo.closePath();
	 				}
	 			}
	 		}
	 	}
	}
}

Ahorcado.prototype.trazar = function(){
	this.intentos++;	//Aumenta 1 a intentos
	if(this.intentos >= this.maximo){ //Si el numero de intentos es mayor o igual al maximo de intentos (5)
		this.vivo = false;
		alert("¡Estas muerto!");
	}
	this.dibujar(); 	//Dibuja una parte del ahorcado
}

function perder(palabra){ //Llena la pista con la palabra completa cuando se pierde
	var p;
	for(p in palabra)
	{
			espacio[p] = palabra[p]; //Llena el array espacio posicion por posicion con el contenido de palabra posicion por posicion
	}
	mostrarPista(espacio);
}