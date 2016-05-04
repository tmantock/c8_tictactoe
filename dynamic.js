/**
 * Created by Mantock on 5/3/16.
 */
var userGameBoardInput = prompt('What size do you wish to have? 3,10,15,20?');

//Change the Global variable for input to a number value
var userGameInputNumber = parseInt(userGameBoardInput);

var width = 0;
var height = 0;

$(document).ready(function () {
    //we will need something here to check whether or not there is saved data
    //function to load in information from the global array is here and assign them to the appropriate
    console.log(local_to_global());
    dynamicGameAssignment();

});
//function declared for dynamically creating tic tac rows and columns
function dynamicGameAssignment () {
    // global_array = [];
    console.log('wtf mate');
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
                class: 'null',
                data_confirmed: null
            }).css({
                'border': '1px solid white',
                'box-sizing': 'border-box',
                'height': '100%',
                'width': '33.3%',
                'display': 'inline-block',
                'z-index':'+2'
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
                class: 'null',
                data_confirmed: null
            }).css({
                'border': '1px solid white',
                'box-sizing': 'border-box',
                'height': '100%',
                'width': '10%',
                'display': 'inline-block',
                'z-index':'+2'
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
                class: 'null',
                data_confirmed: null
            }).css({
                'border': '1px solid white',
                'box-sizing': 'border-box',
                'height': '100%',
                'width': '6.66%',
                'display': 'inline-block',
                'z-index':'+2'
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
                class: 'null',
                data_confirmed: null
            }).css({
                'border': '1px solid white',
                'box-sizing': 'border-box',
                'height': '100%',
                'width': '5%',
                'display': 'inline-block',
                'z-index':'+2'
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
        $(".gameArea").append(gameRow.clone());
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
//variable set to false by default. Assumed to be a false click until set to true by true click.
var playerTwoConfirmedClick = 'false';
var chooseAgain;

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
                data_confirmed: playerTwoConfirmedClick,
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
                data_confirmed:playerTwoConfirmedClick,
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
                data_confirmed: playerTwoConfirmedClick,
                class: 'classO'
            });
            console.log('Player two has clicked ' + this);
            playerOneClick = null;
            playerTwoClick = true;
        }

    }
    var elementInformation = {};
    // var elementInformation = $(element).attr('data-confirmed','data-column','data-row','class');
    // elementInformation.class = $(element).attr('class');
    // elementInformation.confirmed = $(element).attr('data-confirmed');
    // elementInformation.col = $(element).attr('data-column');
    // elementInformation.row = $(element).attr('data-row');
    // console.log(elementInformation);
    // console.log('ele info: ' , elementInformation);
    // global_array[elementInformation.col][elementInformation.row] = elementInformation;
    console.log(elementInformation);
    global_array = [];
    boardPush();
    end_turn();
    playerOneConfirmedClick = 'false';
    playerTwoConfirmedClick = 'false';
}
//declare function for pushing div objects into the global array
function boardPush () {
    for (var i = 0; i < userGameBoardInput; i++){
        global_array[i] = [];
    }
    //declare local variable for the each function which will grab each div div div element
    var counter = 0;
    var gamePiece = $('.gameArea div div').each(function () {
        //declare object variable
        var tempTile = {};
        //grab and assign attributes to the object
        tempTile.class = $(this).attr('class');
        tempTile.confirmed = $(this).attr('data_confirmed');
        tempTile.column = $(this).attr('data-column');
        tempTile.row = $(this).attr('data-row');
        //push object into the array
        // global_array.push(tempTile);
        global_array[counter%userGameInputNumber].push(tempTile);
        counter++;
    });
    // console.log(global_array);
    width = global_array.length;
    height = global_array[0].length;
}

function end_turn(){
    var winner = check_all_win_conditions();
    if (winner){
        alert("you win! gj my friend");
    }
    global_to_local();//puts everything in global_array into local storage as an object;
}

var global_array = [];

//Begin Test for click change function of global variable
function trueClick () {
    playerOneConfirmedClick = 'true';
}

//Begin shipScroll function animation

//Experimental Javascript animation
//function shipScroll () {
//    var ele = $('.destroyer');
//        ele.animate({
//            bottom: '+=600px'
//        },15000,function () {
//            ele.animate({
//                bottom: '-=600px'
//            },15000);
//        });
//    setTimeout(function () {
//        shipScroll();
//    },100);
//}

function randomPosition(){

    var h = $('.battleship').height() - 50;
    var w = $('.battleship').width() - 10;

    var nh = Math.floor(Math.random() * h);
    var nw = Math.floor(Math.random() * w);

    return [nh,nw];

}

function shipCreator () {
    var new_time = 0;
    for(i=0;i<userGameInputNumber;i++) {
        new_time += .5;
        var newPosition = randomPosition();
        var ship = $('<div>').css({
            'position':'relative',
            'height':'15px',
            'width':'15px',
            'background':'black',
            'animation-delay': new_time + 's'
        }).addClass('destroyer');
        var shipContainer = $('<div>').css({
            'position':'absolute',
            'height':'16px',
            'width':'16px',
            'bottom': newPosition[0],
            'right': newPosition[1],
            'animation-delay': new_time + 's'
        }).addClass('traveler').attr('onclick','trueClick()');
        $(shipContainer).append(ship.clone());
        $('.battleship').append(shipContainer.clone());

    }

}

var matches_needed_for_win = userGameInputNumber;

//the length of global_array is the # of columns we have (width)
// var width = global_array.length;
// //the length of global_array[0] is the # of rows we have (height)
// var height = global_array[0].length;

function global_to_local(){
    var object_to_store = {};
    for (var i = 0; i < width; i++){
        for (var j = 0; j < height; j++){
            var temp_key = '' + i + j;
            // console.log('tempkey: ' , temp_key);
            object_to_store[temp_key] = global_array[i][j];
        }
    }
    console.log('resulting object: ' , object_to_store);
    var stringified_object = JSON.stringify(object_to_store);
    window.localStorage.setItem('globals', stringified_object);
}

function local_to_global(){
    var temp_jawn = window.localStorage.getItem('globals');
    var object_from_local = $.parseJSON(temp_jawn);
    // console.log('object from local ' , object_from_local);
    for (var i = 0; i < width; i++) {
        for (var j = 0; j < height; j++) {
            var temp_key = '' + i + j;
            global_array[i][j] = object_from_local[temp_key];
            console.log('new global obj: ' , global_array[i][j]);
        }
    }
    console.log('finished local to global transfer');
    console.log(object_from_local);
    return object_from_local;
}


//function win_check_row: takes in the y position of the row we want to check and determines if there is a victory based on the elements in that row
//It will return a boolean that says whether or not it found a victory
function win_check_row(row_index){//checks to see if there is a match in the specified row
    console.log('starting row check');
    var start = row_index; //just shortening the variable name
    var temp_type = global_array[0][start].class; //store the type of the first element in that row
    var consecutive_objects = 1; //this number will increment every time there are two identical consecutive symbols
    for (var i = 1; i < global_array.length; i++){ //This loop will iterate once for each element in the row we're checking
        if (temp_type == global_array[i][start].class){//checks to see if there is a match between the last object checked and the current object
            console.log('checking a loop: ', i , start);
            if(temp_type == 'null'){
                //this block ensures that we only increment the consecutive_matches variable if the tiles actually contain a players symbol
            }
            else{
                consecutive_objects++;
                console.log(consecutive_objects);
                if (consecutive_objects == matches_needed_for_win){
                    console.log('row is true');
                    return true;
                }
            }
        }
        else{//this else block executes when we encounter a mismatch
            temp_type = global_array[i][start].class;
            consecutive_objects = 1;
        }
    }
    return false;
}

//function win_check_column: takes in the x position of the column we want to check and determines if there is a victory based on the elements in that column
//It will return a boolean that says whether or not it found a victory
function win_check_column(col_index){
    // console.log('starting col check');
    var start = col_index;
    // console.log(global_array);
    var temp_type = global_array[start][0].class;
    var consecutive_objects = 1;
    // console.log(global_array[start].length);
    for (var i = 1; i < global_array[start].length; i++){
        // console.log('looping', i , 'type is: ' , global_array[start][i].class);
        if(temp_type == global_array[start][i].class){
            if (temp_type == 'null'){
                // console.log('doing nothing');
                //do nothing
            }
            else{
                consecutive_objects++;
                console.log('consec: ', consecutive_objects);
                if (consecutive_objects == matches_needed_for_win){
                    return true;
                }
            }
        }
        else{
            // console.log('mismatch');
            temp_type = global_array[start][i].class;
            consecutive_objects = 1;
        }
    }
    return false;
}

function tile_in_range(column, row){
    if (column < 0 || row < 0 || column >= width || row >= height){
        return false;
    }
    return true;
}



function win_check_upward_diagonal(current_col, current_row) {
    // console.log('upward diag');
    var temp_type = global_array[current_col][current_row].class;
    var consecutive_objects = 1;
    current_col++;
    current_row--;
    // console.log("Tile in range: " , tile_in_range(0, -1));
    for (var i = 0; tile_in_range(current_col, current_row); i) {//makes sure we never exceed our bounds while checking for matches
        // console.log('looping at', current_col, current_row);
        if (temp_type == global_array[current_col][current_row].class){
            if (temp_type == 'null') {
                //this block ensures that we only increment the consecutive_matches variable if the tiles actually contain a players symbol
            }
            else {
                consecutive_objects++;
                console.log(consecutive_objects);
                if (consecutive_objects == matches_needed_for_win) {
                    return true;
                }
            }
        }
        else{
            temp_type = global_array[current_col][current_row];
            consecutive_objects = 1;
        }
        current_col++;
        current_row--;
    }
    return false;
}

function win_check_downward_diagonal(current_col, current_row) {
    console.log('downward diag');
    var temp_type = global_array[current_col][current_row].class;
    var consecutive_objects = 1;
    current_col++;
    current_row++;
    console.log('width: ', width , 'height', height);
    for (var i = 0; tile_in_range(current_col, current_row); i)  {//makes sure we never exceed our bounds while checking for matches
        console.log(global_array[current_col][current_row].class);
        if (temp_type == global_array[current_col][current_row].class){
            if (temp_type == 'null') {
                //this block ensures that we only increment the consecutive_matches variable if the tiles actually contain a players symbol
            }
            else {
                consecutive_objects++;
                // console.log(consecutive_objects);
                if (consecutive_objects == matches_needed_for_win) {
                    return true;
                }
            }
        }
        else{
            temp_type = global_array[current_col][current_row];
            consecutive_objects = 1;
        }
        current_col++;
        current_row++;
    }
    return false;
}

function check_all_win_conditions(){
    var result = false;
    for (var j = 0; j < height; j++){
        result = win_check_row(j);
        if (result){
            return result;
        }
    }
    for (var i = 0; i < width; i++){
        result = win_check_column(i);
        if(result)
            return result;
        for (var j = 0; j < height; j++){
            result = win_check_downward_diagonal(i, j);
            if (result)
                return result;
            result = win_check_upward_diagonal(i, j);
            if (result)
                return result;
        }
    }
    return result;
}
//
