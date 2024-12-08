var gamePattern=[]
var buttonColours=[]
var userClickedPattern=[]
buttonColours=["red", "blue", "green", "yellow"];

var flag=0,level=0;
$(document).on("keydown",function(){
    if(flag===0){
        nextSequence(level);
        flag=1;
    }
});



// alert("nextChar is "+randomChosenColour);
$(".btn").on("click",function(event){
    var userChosenColour=event.target.id;
    // console.log(event.target);
    playSound(userChosenColour);
    userClickedPattern.push(userChosenColour);
    animatePress(event.target);
    checkAnswer(userClickedPattern.length-1);
});

function nextSequence(){
    userClickedPattern=[]
    level++;
    $("h1").text("Level "+level);
    var randomNumber=Math.floor((Math.random()*4));
    var randomChosenColour=buttonColours[randomNumber];
    playSound(randomChosenColour);
    gamePattern.push(randomChosenColour);
    var selectedElem=$("#"+randomChosenColour);
    selectedElem.fadeOut(30).fadeIn(30);
}

function playSound(name){
    var audio=new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColour){
    currentColour.classList.add("pressed");
    setTimeout(function(){
        currentColour.classList.remove("pressed");
    },100);
}

function checkAnswer(currentLevel){
    // console.log(userClickedPattern);
    if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
        // console.log("Correct");
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(nextSequence,1000);
        }
    }
    else{
        // console.log("Wrong");
        var audio=new Audio("sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();  
    }
}

function startOver(){
    level=0;
    gamePattern=[];
    flag=0;
}