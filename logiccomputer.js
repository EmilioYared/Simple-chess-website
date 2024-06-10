import { Game, move, status, moves, aiMove, getFen } from '../chessengine/lib/js-chess-engine.mjs'
let game = new Game();


import { Chess } from '../chess.js'
import { NEW_GAME_BOARD_CONFIG } from './chessengine/lib/const/board.mjs';
const chess = new Chess();

var box = document.getElementsByClassName('box');
initialisebackground();
function initialisebackground(){
var changecolor;
for (var i =0; i< box.length; i++){
    var id = box[i].id;
    changecolor = document.getElementById(id);

    if((parseInt(id[1])+parseInt(id[3]))%2 === 0){
        changecolor.style.backgroundColor = '#6c757d';
    }
    else{
        changecolor.style.backgroundColor = '#F0F0F0';
    }
}}
function initialise(fenstring){
    fenstring=fenstring.split(" ");
    var fenstring1=fenstring[0];
    fenstring1=fenstring1.split("/");
    for (var i = 0; i < fenstring1.length; i ++){
        for(var j =0; j < fenstring1[i].length; j++){
            if(fenstring1[i][j]!='1' ){
                var rownumber = fenstring1.length - i;
                var x = j +1;
                var custring = "b" + rownumber.toString() + "0" + x.toString();
                var item = document.getElementById(custring);
                item.innerHTML = fenstring1[i][j];
            }
            else {
                var rownumber = fenstring1.length - i;
                x = j + 1;
                var custring = "b" + rownumber.toString() + "0" + x.toString();
                var item = document.getElementById(custring);
                item.innerHTML = "empty";
            }
        }
    }
    addimage();
}
function translatefen2board(fenstring){
    var res = fenstring.replace(/2/gi, "11");
     res = res.replace(/2/gi, "11");
     res = res.replace(/3/gi, "111");
     res = res.replace(/4/gi, "1111");
     res = res.replace(/5/gi, "11111");
     res = res.replace(/6/gi, "111111");
     res = res.replace(/7/gi, "1111111");
     res = res.replace(/8/gi, "11111111");
     return res;
};
function addimage(){
    for (var i =0; i< box.length; i++){
        if(box[i].innerHTML === "p"){
            box[i].innerHTML = "p" + "<img src='Bpawn.png' class='image'>";
        }
        else if(box[i].innerHTML === "k"){
            box[i].innerHTML = "k" + "<img src='Bking.png' class='image'>";
        }
        else if(box[i].innerHTML === "r"){
            box[i].innerHTML = "r" + "<img src='Brook.png' class='image'>";
        }
        else if(box[i].innerHTML === "b"){
            box[i].innerHTML = "r" + "<img src='Bbishop.png' class='image'>";
        }
        else if(box[i].innerHTML === "n"){
            box[i].innerHTML = "n" + "<img src='Bknight.png' class='image'>";
        }
        else if(box[i].innerHTML === "q"){
            box[i].innerHTML = "q" + "<img src='Bqueen.png' class='image'>";
        }
        else if(box[i].innerHTML === "P"){
            box[i].innerHTML = "P" + "<img src='Wpawn.png' class='image'>";
        }
        else if(box[i].innerHTML === "Q"){
            box[i].innerHTML = "Q" + "<img src='Wqueen.png' class='image'>";
        }
        else if(box[i].innerHTML === "N"){
            box[i].innerHTML = "N" + "<img src='Wknight.png' class='image'>";
        }
        else if(box[i].innerHTML === "R"){
            box[i].innerHTML = "R" + "<img src='Wrook.png' class='image'>";
        }
        else if(box[i].innerHTML === "B"){
            box[i].innerHTML = "B" + "<img src='Wbishop.png' class='image'>";
        }
        else if(box[i].innerHTML === "K"){
            box[i].innerHTML = "K" + "<img src='Wking.png' class='image'>";
        }
        else{
            box[i].innerHTML = "empty";
        }

    }
}
let movepair=["",""];
let c = 0;
var container = document.body;
container.addEventListener('click', function(event) {
    // Check if the clicked element or its ancestor has the class 'box'
    var clickedElement = event.target.closest('.box');
    var clickedElement2 = event.target.closest('#reset');

    if(clickedElement2){
        chess.load('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1');
        initialise(translatefen2board(chess.fen()));
        game = new Game();
        console.log(game.exportFEN());
    }

    if (clickedElement) {
      // If a box element is found, get its ID
      var clickedElementId = clickedElement.id;
      console.log(clickedElementId);
      movepair[c]=translateid(clickedElementId);
      console.log(movepair[c]);
      c = c +1;

      // You can perform additional actions here based on the clicked element
    }
    if(c==1){
        var move1 = movepair[0];
        let arraymoves = chess.moves({ square: move1 });
        console.log(arraymoves);
        if(arraymoves.length === 0){
        }
        else{
            for(var i =0; i < arraymoves.length; i++){
                var id2 = detranslateid(getsquare(arraymoves[i]));
                var changecolor = document.getElementById(id2);
                var colors = ['#f07167','#fed9b7','#fdfcdc','#00afb9','#0081a7'];
                var randomIndex = Math.floor(Math.random() * colors.length);
                changecolor.style.backgroundColor = colors[randomIndex];
            }

        }

    }
    if(c==2){
        c = 0;
        initialisebackground();
        var move1 = movepair[0];
        var move2 = movepair[1];
        console.log("move1="+move1);
        console.log("move2="+move2);
        let arraymoves = chess.moves({ square: move1 });
        console.log(arraymoves);
        var count = false;
        for(let i =0; i < arraymoves.length;i++){
            if(arraymoves[i].indexOf(move2)){
                count = true;
            }
            if(arraymoves[i]==move2){
                count = true;
            }
            console.log("arraymovessubstring="+arraymoves[i].substr(-2));
        }
        if(count){
            if(arraymoves[0].indexOf('=') != '-1'){
                var userInput = prompt('please choose what perive you want to prompto to (b,n,q,r)');
                chess.move(move1+move2+userInput);
                initialise(translatefen2board(chess.fen()));
            }
               
            else{
                chess.move(move1+move2);
                initialise(translatefen2board(chess.fen()));
            }
            game.move(move1,move2);
            game.aiMove(4);
            initialise(translatefen2board(game.exportFEN()));
            chess.load(game.exportFEN());
            count=false;
            if(chess.isCheckmate()){
                console.log("checkmate")
            }
        }
        else{
            console.log('invalid move');
        }
    }

  });

function translateid(id1){
    let file=['a','b','c','d','e','f','g','h'];
    let id2 = file[parseInt(id1[3])-1] + id1[1];
    return id2;
}
initialise(translatefen2board(chess.fen()));
function getAsciiCode(character) {
    if (character.length === 1) {
      // Use charCodeAt for a single character
      var asciiCode = character.charCodeAt(0);
      console.log('ASCII code of \'' + character + '\':', asciiCode);
      return asciiCode;
    } else {
      console.error('Please provide a single character.');
      return null;
    }
  }
function detranslateid(id1){
    let file=['1','2','3','4','5','6','7','8'];
    let i = parseInt(getAsciiCode(id1[0])%96 - 1);
    let id2 = "b" + id1[1] + "0" +file[i];
    return id2;   
}
function getsquare(move){
    if(move === 'O-O'){
        if(chess.turn() === 'w'){
           var move2 = "g1";
           return move2; 
        }
        else{
            var move2 = "g8"
            return move2;
        }
    }
    else if(move === 'O-O-O'){
        if(chess.turn() === 'w'){
           var move2 = "c1";
           return move2; 
        }
        else{
            var move2 = "c8"
            return move2;
        }
    }
    else if(move.indexOf('x') !== -1){
        var x = move.indexOf('x');
        var move2 = move[x+1] + move[x+2];
        console.log('1');
        return move2;
    }
    else if(move.indexOf('=') !== -1){
        var x = move.indexOf('=');
        var move2 = move[x-2] + move[x-1];
        console.log('2');
        return move2;
    }
    else if(move.indexOf('+') !== -1){
        var x = move.indexOf('+');
        var move2 = move[x-2] + move[x-1];
        console.log('3');
        return move2;
    }
    else{
        var x = move.length;
        var move2 = move[x-2] + move[x-1];
        console.log('4');
        return move2;
    }

}