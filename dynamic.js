/**
 * Created by Mantock on 5/3/16.
 */
//Global variable for cube generation


//global variable for three row creation


//global variable for ten row creation
//var gameRowTen;

//global variable for 15 row creation
//var gameRowFifteen;

//global variable for 20 row creation
//var gameRowTwenty;

//Global variable for user input
var userGameBoardInput = prompt('What size do you wish to have? 3,10,15,20?');

//Change the Global variable for input to a number value
var userGameInputNumber = 3;


$(document).ready(function () {
    
    dynamicGameAssignment();

});

var gameTile;
var gameRow;

//

function dynamicGameAssignment () {


    if (userGameBoardInput == '3') {
         gameTile = $('<div>').attr({
             onclick: 'getTileValue',
            data: 'null'}).css({
            'border':'1px solid black',
            'height':'100%',
            'width':'33%',
             'display': 'inline-block'
        });

         gameRow = $('<div>').css({
            'border':'1px solid black',
            'height': '33%',
            'width':'100%'
        });
    }

    else if (userGameBoardInput == '10') {
         gameTile = $('<div>').attr({
             onclick: 'getTileValue',
             data: 'null'}).css({
            'border':'1px solid black',
            'height':'100%',
            'width':'10%',
            'display': 'inline-block'
        });

         gameRow = $('<div>').css({
            'border':'1px solid black',
            'height': '10%',
            'width':'100%'
        });
    }

    else if (userGameBoardInput == '15') {
         gameTile = $('<div>').attr({
             onclick: 'getTileValue',
             data: 'null'}).css({
            'border':'1px solid black',
            'height':'100%',
            'width':'7%',
            'display': 'inline-block'
        });

         gameRow = $('<div>').css({
            'border':'1px solid black',
            'height': '7%',
            'width':'100%'
        });
    }

    else if (userGameBoardInput == '20') {
         gameTile = $('<div>').attr({
             onclick: 'getTileValue',
             data: 'null'}).css({
            'border':'1px solid black',
            'height':'100%',
            'width':'5%',
            'display': 'inline-block'
        });

         gameRow = $('<div>').css({
            'border':'1px solid black',
            'height': '5%',
            'width':'100%'
        });

    }

    tileCreation();
    console.log(gameTile);
}

function test () {
    var tile = gameTile;
}

var realTile = new test();

function tileCreation () {
    for(i=0;i<userGameInputNumber;i++) {
        $(".gameBoard").append(gameRow.clone());
        console.log('I am i ' + i);
        for(e=0;e<userGameInputNumber;e++) {
            console.log('I am e ' + e);
            $(gameRow).append(gameTile.clone());
            console.log(this+' I am tile.');
        }
    }
}