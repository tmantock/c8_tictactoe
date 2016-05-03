/**
 * Created by Mantock on 5/3/16.
 */
var userGameBoardInput = prompt('What size do you wish to have? 3,10,15,20?');

//Change the Global variable for input to a number value
var userGameInputNumber = parseInt(userGameBoardInput);

$(document).ready(function () {
    
    dynamicGameAssignment();

});
//function declared for dynamically creating tic tac rows and columns
function dynamicGameAssignment () {
    //variable declared for counting the rows assigned to each tile
    var rowCounter = 0;
    //for loop started for moving through rows
    for(i=0;i<userGameInputNumber;i++) {
        //local variable for game tiles declared
        var gameTile;
        //local variable for game rows declared
        var gameRow;
        //local variable for column counter declared for getting the position of an element
        var columnCounter = 0;
        //Series of declarations for determining which size to use for the rows and the columns
        if (userGameBoardInput == '3') {
            //set gameTile variable to a new DOM element
            gameTile = $('<div>').attr({
                onclick: 'ticTacBoardClick(this)',
                data: 'null'
            }).css({
                'border': '1px solid black',
                'box-sizing': 'border-box',
                'height': '100%',
                'width': '33.3%',
                'display': 'inline-block'
            });
            //set gameRow variable to a new DOM element
            gameRow = $('<div>').css({
                'height': '33%',
                'width': '100%'
            });
        }

        else if (userGameBoardInput == '10') {
            gameTile = $('<div>').attr({
                onclick: 'ticTacBoardClick(this)',
                data: 'null'
            }).css({
                'border': '1px solid black',
                'box-sizing': 'border-box',
                'height': '100%',
                'width': '10%',
                'display': 'inline-block'
            });

            gameRow = $('<div>').css({
                'height': '10%',
                'width': '100%'
            });
        }

        else if (userGameBoardInput == '15') {
            gameTile = $('<div>').attr({
                onclick: 'ticTacBoardClick(this)',
                data: 'null'
            }).css({
                'border': '1px solid black',
                'box-sizing': 'border-box',
                'height': '100%',
                'width': '7%',
                'display': 'inline-block'
            });

            gameRow = $('<div>').css({
                'height': '7%',
                'width': '100%'
            });
        }

        else if (userGameBoardInput == '20') {
            gameTile = $('<div>').attr({
                onclick: 'ticTacBoardClick(this)',
                data: 'null',
                data_position:[columnCounter,rowCounter]
            }).css({
                'border': '1px solid black',
                'box-sizing': 'border-box',
                'height': '100%',
                'width': '5%',
                'display': 'inline-block'
            });

            gameRow = $('<div>').css({
                'height': '5%',
                'width': '100%'
            });

        }
        console.log(gameTile);
        //Nested for loop for moving through the row
        for(e=0;e<userGameInputNumber;e++) {
            console.log('I am e ' + e);
            //append the gameTiles to the gameRow with attributes for getting the position
            $(gameRow).append(gameTile.clone().attr({
                'data-column': columnCounter,
                'data-row': rowCounter}));
            console.log(this+' I am tile.');
            //increment the columnCounter
            columnCounter++;
        }
        //Append the newly created rown to the gameBoard
        $(".gameBoard").append(gameRow.clone());
        //increment the rowCounter
        rowCounter++;

        // console.log('I am i ' + i);
    }
}

/////////////Begin Click Handler//////////////

var playerOneClick = null;
var playerOneConfirmedClick = true;
var playerTwoClick = false;
var playerTwoConfirmedClick = true;

function ticTacBoardClick (element) {
//variable to get the data-confirmed attribute of the element that has been clicked
    var confirmedAttribute = $(element).attr('data-confirmed');
//Series of conditionals to determine what value to place in the divs
    if (playerOneClick == null && playerOneConfirmedClick == true) {
        //If it has a class of O and the confirmedAttribute is false then change the element
        if($(element).hasClass('classO') && confirmedAttribute == 'false') {
            $(element).addClass('classX').attr('data-confirmed','true');
            console.log('Player One made the wise choice');
            console.log(confirmedAttribute);
            return;
        }
        //If it has a class of O and the confirmedAttribute is true then don't change the element
        else if ($(element).hasClass('classO') && confirmedAttribute == 'true') {
            console.log('Player one has made the wrong choice.');
            console.log(confirmedAttribute);
            return;
        }
            //else change the class of the empty div
        else {
            $(element).addClass('classX').attr('data-confirmed','true');
            console.log('Player one has clicked ' + this);
            console.log(confirmedAttribute);
        }
        //disallow playerOnes turn
        playerOneClick = true;
        //Allow player two to click
        playerTwoClick = null;
    }

    else if (playerOneClick == null && playerOneConfirmedClick == false) {
        //Disallow playerOne from changing the class of the div
        if ($(element).hasClass('classO') && confirmedAttribute == 'false') {
            console.log('Player One made the wrong choice');
            console.log(confirmedAttribute);
            return;
        }
        else {
            //Allow the false 'X' to be placed
            $(element).addClass('classX').attr('data-confirmed','false');
            console.log('Player one has clicked ' + this);
            console.log(confirmedAttribute);
        }
        playerOneClick = true;
        playerTwoClick = null;
    }

    else if (playerTwoClick == null && playerTwoConfirmedClick == true) {
        //If it has a class of X and the confirmedAttribute is false then change the element
        if($(element).hasClass('classX') && confirmedAttribute == 'false') {
            $(element).addClass('classO').attr('data-confirmed','true');
            console.log('Player Two made the wise choice');
            console.log(confirmedAttribute);
            return;
        }
        //If it has a class of O and the confirmedAttribute is true then don't change the element
        else if ($(element).hasClass('classX') && confirmedAttribute == 'true') {
            console.log('Player two has made the wrong choice.');
            console.log(confirmedAttribute);
            return;
        }
            //else change the elements as necessary
        else {
        $(element).addClass('classO').attr('data-confirmed','true');
            console.log('Player two has clicked ' + this);
            console.log(confirmedAttribute);
        }
        //allow playerOne's turn
        playerOneClick = null;
        //disallow playerTwo
        playerTwoClick = true;
    }

    else if (playerTwoClick == null && playerTwoConfirmedClick == false) {
        //Disallow PlayerTwo form changing the div's values
        if($(element).hasClass('classX') && confirmedAttribute == 'true') {
            console.log('Player two has made the wrong choice.');
            console.log(confirmedAttribute);
            return;
        }
            //Allow player Two to place the false O
        else {
        $(element).addClass('classO').attr('data-confirmed','false');
        console.log('Player two has clicked ' + this);
        }
        playerOneClick = null;
        playerTwoClick = true;
    }
}
