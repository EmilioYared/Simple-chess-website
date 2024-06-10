import { Chess } from '../chess.js'
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

var moves = [];
var index = 0;

document.getElementById('new_input').addEventListener('click', () => {
    var userInput = prompt("Enter something:");
    chess.loadPgn(userInput);
    initialise(translatefen2board(chess.fen()));
    console.log(chess.fen());
    moves = chess.history();
    console.log(chess.history());
    index = moves.length;
  });

document.getElementById('backward').addEventListener('click', () => {
    chess.undo();
    initialise(translatefen2board(chess.fen()));
    index = index -1;
});

document.getElementById('forward').addEventListener('click', () => {
    chess.move(moves[index]);
    initialise(translatefen2board(chess.fen()));
    index = index + 1;
});