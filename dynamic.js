/**
 * Created by Mantock on 5/3/16.
 */
var userGameBoardInput = prompt('What size do you wish to have? 3,10,15,20?');

//Change the Global variable for input to a number value
var userGameInputNumber = parseInt(userGameBoardInput);

$(document).ready(function () {
    
    dynamicGameAssignment();
    shipScroll();

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
                data: 'null',
                class: null,
                data_confirmed: null
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
                data: 'null',
                class: null,
                data_confirmed: null
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
                data: 'null',
                class: null,
                data_confirmed: null
            }).css({
                'border': '1px solid black',
                'box-sizing': 'border-box',
                'height': '100%',
                'width': '6.66%',
                'display': 'inline-block'
            });

            gameRow = $('<div>').css({
                'height': '6.66%',
                'width': '100%'
            });
        }

        else if (userGameBoardInput == '20') {
            gameTile = $('<div>').attr({
                onclick: 'ticTacBoardClick(this)',
                data: 'null',
                class: null,
                data_confirmed: null
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
        //Nested for loop for moving through the row
        for(e=0;e<userGameInputNumber;e++) {
            //append the gameTiles to the gameRow with attributes for getting the position
            $(gameRow).append(gameTile.clone().attr({
                'data-column': columnCounter,
                'data-row': rowCounter}));
            //increment the columnCounter
            columnCounter++;
        }
        //Append the newly created rown to the gameBoard
        $(".gameBoard").append(gameRow.clone());
        //increment the rowCounter
        rowCounter++;

        // console.log('I am i ' + i);
    }

    boardPush();
}

/////////////Begin Click Handler//////////////

var playerOneClick = null;
//variable set to false by default. Assumed to be a false click until set to true by true click.
var playerOneConfirmedClick = 'false';
var playerTwoClick = false;
var playerTwoConfirmedClick = 'false';
var chooseAgain;
var retrieveConfirmation;
//

function ticTacBoardClick (element) {
//variable to get the data-confirmed attribute of the element that has been clicked
    var confirmedAttribute = $(element).attr('data_confirmed');
    //variable for grabbing class and attributes of the element
    var elementInformation = $(element).attr('data_confirmed','data-column','data-row','class');

//Series of conditionals to determine what value to place in the divs
    if (playerOneClick == null && playerOneConfirmedClick == 'true') {
        //If it has a class of O and the confirmedAttribute is false then change the element
        if($(element).hasClass('classO') && confirmedAttribute == 'false') {
            $(element).attr({
                data_confirmed: playerOneConfirmedClick,
                class: 'classX'
            });
            console.log('Player One made the wise choice');
            console.log(confirmedAttribute);
            //disallow playerOnes turn
            playerOneClick = true;
            //Allow player two to click
            playerTwoClick = null;
        }
        //If it has a class of O and the confirmedAttribute is true then don't change the element
        else if ($(element).hasClass('classO') && confirmedAttribute == 'true') {
            $(element).attr({
                data_confirmed:'true'
            });
            console.log('Player one has made the wrong choice.');
            console.log(confirmedAttribute);
            chooseAgain = alert('Choose Again!');
            playerOneClick = null;
            playerTwoClick = true;
        }
            //else change the class of the empty div
        else {
            $(element).attr({
                data_confirmed: playerOneConfirmedClick,
                class: 'classX'
            });
            console.log('Player one has clicked ' + this);
            console.log(confirmedAttribute);
            //disallow playerOnes turn
            playerOneClick = true;
            //Allow player two to click
            playerTwoClick = null;
        }

    }

    else if (playerOneClick == null && playerOneConfirmedClick == 'false') {
        //Disallow playerOne from changing the class of the div
        if ($(element).hasClass('classO') && confirmedAttribute == 'false') {
            $(element).attr({
                data_confirmed: 'false'
            });
            console.log('Player One made the wrong choice');
            console.log(confirmedAttribute);
            chooseAgain = alert('Choose Again!');
            playerOneClick = null;
            playerTwoClick = true;
            return;
        }
        else if ($(element).hasClass('classO') && confirmedAttribute == 'true') {
            $(element).attr({
                data_confirmed: 'true'
            });
            console.log('Player One made the wrong choice');
            console.log(confirmedAttribute);
            chooseAgain = alert('Choose Again!');
            playerOneClick = null;
            playerTwoClick = true;
        }
        else {
            //Allow the false 'X' to be placed
            $(element).attr({
                data_confirmed: playerOneConfirmedClick,
                class: 'classX'
            });
            console.log('Player one has clicked ' + this);
            console.log(confirmedAttribute);
            playerOneClick = true;
            playerTwoClick = null;
        }

    }

    else if (playerTwoClick == null && playerTwoConfirmedClick == 'true') {
        //If it has a class of X and the confirmedAttribute is false then change the element
        if($(element).hasClass('classX') && confirmedAttribute == 'false') {
            $(element).attr({
                data_confirmed: 'true',
                class: 'classO'
            });
            console.log('Player Two made the wise choice');
            console.log(confirmedAttribute);
            //allow playerOne's turn
            playerOneClick = null;
            //disallow playerTwo
            playerTwoClick = true;
        }
        //If it has a class of O and the confirmedAttribute is true then don't change the element
        else if ($(element).hasClass('classX') && confirmedAttribute == 'true') {
            $(element).attr({
                data_confirmed: 'true'
            });
            console.log('Player two has made the wrong choice.');
            console.log(confirmedAttribute);
            chooseAgain = alert('Choose Again!');
            playerOneClick = true;
            playerTwoClick = null;
        }
            //else change the elements as necessary
        else {
            $(element).attr({
                data_confirmed:'true',
                class: 'classO'
            });
            console.log('Player two has clicked ' + this);
            console.log(confirmedAttribute);
            //allow playerOne's turn
            playerOneClick = null;
            //disallow playerTwo
            playerTwoClick = true;
        }

    }
        //

    else if (playerTwoClick == null && playerTwoConfirmedClick == 'false') {
        //Disallow PlayerTwo form changing the div's values
        if($(element).hasClass('classX') && confirmedAttribute == 'true') {
            $(element).attr({
                data_confirmed: 'true'
            });
            console.log('Player two has made the wrong choice.');
            console.log(confirmedAttribute);
            chooseAgain = alert('Choose Again!');
            playerOneClick = true;
            playerTwoClick = null;
        }
            //Allow player Two to place the false O
        else if ($(element).hasClass('classX') && confirmedAttribute == 'false') {
            $(element).attr({
                data_confirmed: 'false'
            });
            console.log('Player two has made the wrong choice.');
            console.log(confirmedAttribute);
            chooseAgain = alert('Choose Again!');
            playerOneClick = true;
            playerTwoClick = null;
        }
        else {
            $(element).attr({
                data_confirmed:'true',
                class: 'classO'
            });
            console.log('Player two has clicked ' + this);
            playerOneClick = null;
            playerTwoClick = true;
        }

    }
    console.log(elementInformation);
    gameArray = [];
    boardPush();

    playerOneConfirmedClick = 'false';
    playerTwoConfirmedClick = 'false';
}
//declare function for pushing div objects into the global array
function boardPush () {
    //declare local variable for the each function which will grab each div div div element
    var gamePiece = $('div div div').each(function () {
        //declare object variable
        var tempTile = {};
        //grab and assign attributes to the object
        tempTile.class = $(this).attr('class');
        tempTile.confirmed = $(this).attr('data_confirmed');
        tempTile.column = $(this).attr('data-column');
        tempTile.row = $(this).attr('data-row');
        //push object into the array
        gameArray.push(tempTile);
    });
    console.log(gameArray);
}

var gameArray = [];

//Begin Test for click change function of global variable
function falseClick () {
    playerOneConfirmedClick = 'true';
}

//Begin shipScroll function animation


function shipScroll () {
    var ele = $('.destroyer');
    var n = ele.css('bottom');
    if (n == '0px') {
        ele.animate({
            bottom: '+=600px'
        },5000,function () {
            ele.animate({
                bottom: '-=600px'
            },5000);
        });

    }
    setTimeout(function () {
        shipScroll();
    },100);
}
