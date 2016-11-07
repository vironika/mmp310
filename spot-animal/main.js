// Vironika Chhugani
// MMP310
// 11/05/2016


//array of backgrounds for canvas
var arrayPhoto = ["", "l.jpg", "r.jpg", "p.jpg", "pr.jpg", "w.jpg", "e.jpg"];
var iPhoto = 0; //array#
//array of locations for animals
var arrayAnimalX = [126, 436, 376, 80, 374, 73, 154]; //array x position of spot
var arrayAnimalY = [177, 379, 285, 300, 215, 253, 181]; //array x position of spot
var iAnimal = 0; //array#
var x; //storing x position of spot
var y; //storing y position of spot

var count = 31; //timer count
var score = 0; //game score
var extra = 1; //to regulate timer

var PosX = 0; //x mouse position
var PosY = 0; //y mouse position

//for canvas drowing
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

y = arrayAnimalY[0]; //getting Y spots coordinats of animal from ARRAY 
x = arrayAnimalX[0]; //getting X spots coordinats of animal from ARRAY 
//console.log("x = " + x);
//console.log("y = " + y);



var counter = setInterval(timer, 1000); //1000 will  run it every 1 second

$("#finish").hide();

document.getElementById("score").innerHTML = " Your score is:<br>  <br>" + score + "/7"; // shows count
function timer() {

    count = count - 1;
    document.getElementById("timer").innerHTML = "Timer:<br><br>" + count + " secs"; // shows count

    if (count <= 0) {
        timeUp();
    }


} //end timer

function timeUp() {
    clearInterval(counter);
    document.getElementById("timer").innerHTML = " Time is up"; // shows count
    counter;
}

//create on click eventListener for next button
var b = document.querySelector("#button"); //Button with ID button
b.addEventListener("click", function () {

    //to clear spots from before 
    ctx.clearRect(0, 0, 500, 500);

    //to get next array values
    iPhoto++;
    iAnimal++;
    //replace img for next slide from array
    $('#myCanvas').css('background-image', 'url("images/' + arrayPhoto[iPhoto] + '")');


    


    //pass new values for coordinats of the next slide
    y = arrayAnimalY[iAnimal];
    x = arrayAnimalX[iAnimal];

    console.log("x = " + x);
    console.log("y = " + y);
    
    //clear old timer
    clearInterval(counter);
    //start new timer
    timeAgain();


    //check if slides are done
    if (iAnimal >= 7) {
        $("#main").hide();
        $("#finish").show();
        document.getElementById("finalScore").innerHTML = " Your final score is " + score + "/7"; // shows count


    }

    return x, y, iAnimal;




}); //end EventListener




function timeAgain() {

    count = 31;
    counter = setInterval(timer, 1000); //1000 will  run it every 1 second
    return counter;
    counter;
}

var c = document.querySelector("#myCanvas"); //Button with ID button
c.addEventListener("click", function () {
    
    //spot function have locations of spots of animals
    spot(x, y);
});


//find mouse coordinates on canvas
//was found on http://www.chestysoft.com/imagefile/javascript/get-coordinates.asp
function FindPosition(oElement) {
    if (typeof (oElement.offsetParent) != "undefined") {
        for (var posX = 0, posY = 0; oElement; oElement = oElement.offsetParent) {
            posX += oElement.offsetLeft;
            posY += oElement.offsetTop;
        }
        return [posX, posY];
    } else {
        return [oElement.x, oElement.y];
    }
}

var myImg = document.getElementById("myCanvas");
myCanvas.onmousedown = GetCoordinates;


//find mouse coordinates on canvas
//was found on http://www.chestysoft.com/imagefile/javascript/get-coordinates.asp
function GetCoordinates(e) {

    var ImgPos;
    ImgPos = FindPosition(myCanvas);
    if (!e) var e = window.event;
    if (e.pageX || e.pageY) {
        PosX = e.pageX;
        PosY = e.pageY;
    } else if (e.clientX || e.clientY) {
        PosX = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
        PosY = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }
    PosX = PosX - ImgPos[0];
    PosY = PosY - ImgPos[1];
    document.getElementById("x").innerHTML = PosX;
    document.getElementById("y").innerHTML = PosY;
}
//here we calculate how fur from the spot the mouse click was
function spot(spX, spY) {
    var animalX = spX;
    var animalY = spY;
    var loc = (PosX - animalX) + (PosY - animalY)
    console.log(loc);

    if (count > 0 && loc < 30) {
        if (count > 0 && loc > -30) {
            score++;
            //stop timer
            clearInterval(counter);
            document.getElementById("score").innerHTML = " Your score is:<br>  <br>" + score + "/7"; // shows count
            //drow a sircle
            str();
        }
    }

}

//show/draw  a circle around animal spot
function str() {
    ctx.beginPath();
    ctx.lineWidth = 5;
    ctx.arc(x, y, 50, 0, 8 * Math.PI);
    ctx.strokeStyle = "red";
    ctx.stroke();



}

