/**  Created by Qzxtzrtz on 5/3/2016. */

//TODO **************************  LOCAL STORAGE   *******************************/

function local_storage_restore() {
    var contents_last_game = JSON.parse(localStorage.getItem("storeKey"));
    return contents_last_game;
}//end local_storage_restore

function restore_last_game_board (last_data) {
    ///////////if local storage is not empty
    if (last_data!="") {
        player1_name_value = last_data.player1_name_value;
        player2_name_value= last_data.player2_name_value;
        player_symbol= last_data.player_symbol;
        num_of_rows= last_data.num_of_rows;
        num_of_cells_to_win= last_data.num_of_cells_to_win;
        grid_array=last_data.grid_array;
        last_clicked= last_data.last_clicked;
        game_won= last_data.game_won;
        $(".game_board").empty();
        game_board_grid=[];
        game_board_creation();
        for (var i=0;i<num_of_rows;i++) {
            for (var j=0;j<num_of_rows;j++) {
                if (grid_array[i][j]!=0) {
                    game_board_grid[i][j].html.addClass(grid_array[i][j]+" clicked");
                }////end of if
            }////end of for j
        }////end of for i
        click_player1_name();
        click_player2_name();
    }
}

//TODO ***************************** GLOBAL VARIABLES  *******************************//

var player1_name_value;
var player2_name_value;
var num_of_rows = 3;
var num_of_cells_to_win = 3;
var theme_value = "class_room";
var background_value = "chalkboard_background";
var player_symbol = 'ex';
var grid_array = [];
var last_clicked;
var game_won = false;
var last_data
var game_board_grid=[];
//var stored_data;
//var contents_last_game;
//TODO ***************************** BOARD CREATION  SECTION  *******************************//

function game_board_creation () {
    for(var x = 0;x <= num_of_rows-1; x++){
        var inside_array=[];
        for(var y = 0;y <= num_of_rows-1; y++) {
            var new_obj =
            {
                row : x,
                col : y,
                html: $("<div class='cell'></div>"),
                click_handler: function(){                      //this function handles the object when it is clicked
                    var symbol = toggle_and_get_current_symbol();   //retrieves last used, ie. current, symbol
                    if(!this.html.hasClass("clicked")) {
                        grid_array[this.row][this.col]=symbol;          //stores the symbol x or o in the grid array
                        this.html.addClass('clicked ' + symbol);    //sets x or o in the html cell
                        check_the_win (last_clicked.row , last_clicked.col);  //calls win condition check
                        store_essential_data();                               //
                    }///////if the div hasn't been clicked before
                    else {
                        toggle_and_get_current_symbol();
                    }/// end of else
                    animate_name();         //glow current player's name if it is his turn
                    theme_click_sound_controls(theme_value);
                    theme_ex_changer(theme_value);
                    theme_ow_changer(theme_value);
                    this.html.addClass('shakes');
                }//click handler
            };///new obj
            make_click(new_obj);
            inside_array.push(new_obj);
            $(".game_board").append(new_obj.html);
        }////y
        game_board_grid.push(inside_array);
    }////x
    // width and height of cell
    var cell_width = 80/num_of_rows+'vh';
    $('.cell').css({"width": cell_width,"height": cell_width});
}//end function game_board_creation

function make_click(the_object){
    the_object.html.click(function(){
        console.log('object that was triggered',the_object);
        if (game_won === false) {                               //if game is not won
            last_clicked = the_object;                          //stores object for win check function
            the_object.click_handler();                         //call click handler method
        }//end if
    });//end .click function
}//end make_click

function toggle_and_get_current_symbol(){
    if(player_symbol=='ex'){
        player_symbol = 'ow';
    }
    else{
        player_symbol = 'ex';
    }
    return player_symbol;
} //end toggle_and_

//TODO **** begin document ready
$(document).ready(function(){
    //TODO 0.9 click sound for all button clicks
    $("button, input").click(button_click_sound);
    //TODO 1. players will enter name into input field + click submit, click function will
    //Player1-name-value capture
    $("#player1-name-submit").click(click_player1_name);
    //Player2-name-value capture
    $("#player2-name-submit").click(function(){
        //capture plyr nam store as var
        player2_name_value = $('#player2-name-value').val();
        console.log('var player2_name_value = ' + player2_name_value);
        $('#player2-name-value').hide();
        $('#player2-name-submit').hide();
        var local_player2_name_value = player2_name_value;
        $('.player.player2').addClass('appended');
        $('.player.player2.appended').append(local_player2_name_value);
        animate_name();
    });//end click

    // Player name animation function

    // TODO 2. using jquery to capture and store as variables the number of rows and columns for the board
    // capture num_of_rows
    $("#number_of_rows-submit").click(function (){
        //capture num_of_rows store as var num_of_rows
        num_of_rows = $('.number_of_rows').val();
        console.log('var num_of_rows is now: '+num_of_rows);
        $('.row-number').hide();
        num_of_rows = parseInt(num_of_rows);
        //call game board creation
        $(".game_board").empty();
        grid_array = [];
        create_grid_array();
        game_board_creation();
    });//end capture function

    // TODO 3. using jquery to capture and store as variable the number of matches the player chooses, this will be the win condition parameter.
    // capture num_of_cells_to_win
    $("#number_of_matches-submit").click(function (){
        //capture num_of_cells_to_win store as var
        num_of_cells_to_win = $('.number_of_matches').val();
        console.log('num_of_cells_to_win = ' + num_of_cells_to_win);
        $('.matches-number').hide();
        num_of_cells_to_win = parseInt(num_of_cells_to_win);
        $(".game_board").empty();
        grid_array = [];
        create_grid_array();
        game_board_creation();
    });//end capture function

    // TODO 3.65 "shut up barney button"
    $(".shutup-barney-button").click(intro_sound_pause);

    // TODO 3.7 disable background sound button theme_background_sound_pause
    $(".pause-background-sound-button").click(theme_background_sound_pause_initiator);
    
    // TODO 4. using jquery to dynamically create game board based on user input
    //creating the array grid
    create_grid_array();
    // console.log("grid array at first: ",grid_array);
    /////dynamic creation of game board
    game_board_creation();
    console.log("game board grid: ",game_board_grid);

    //TODO RESET BUTTON
    $(".reset-button").click(function() {
        console.log('Begin Reset');
        num_of_rows = 3;                            //reset global variables
        num_of_cells_to_win = 3;
        player_symbol = 'ex';
        last_clicked = null;
        game_won = false;
        $('.matches-number').show();                //show user inputs
        $('.row-number').show();
        grid_array = [];                            //reset the grid
        create_grid_array();
        console.log("grid_array after reset: ",grid_array);
        $(".game_board").empty();                   //empty game board
        game_board_grid=[];
        game_board_creation();                      // recreate game board
    });//end RESET


    //TODO LOCAL STORAGE RESTORE
    last_data = local_storage_restore();
    // console.log(last_data);
    // restore_last_game_board(last_data);

    //TODO RESTORE BUTTON
    $('.restore-button').click(function () {
    restore_last_game_board(last_data);
    });
});//TODO **** end document ready
function store_essential_data () {
    var stored_data = {
        player1_name_value: player1_name_value,
        player2_name_value: player2_name_value,
        player_symbol: player_symbol,
        num_of_rows: num_of_rows,
        num_of_cells_to_win: num_of_cells_to_win,
        grid_array: grid_array,
        last_clicked: last_clicked,
        game_won: game_won
    };
    var data = JSON.stringify(stored_data);
    window.localStorage.setItem('storeKey',data);
}//end store_ess
function animate_name () {
    if(player_symbol === 'ex') {
        $('.player1').addClass('animate');
        $('.player2').removeClass('animate');
    }//end if
    else {
        $('.player2').addClass('animate');
        $('.player1').removeClass('animate');
    }//end else
}//end of animate_name function
function toggle_and_get_current_symbol(){
    if(player_symbol=='ex'){
        player_symbol = 'ow';
    }
    else{
        player_symbol = 'ex';
    }
    return player_symbol;
} //end toggle_and_
function make_click(the_object)
{
    the_object.html.click(function(){
        console.log('object that was triggered',the_object);
        if (game_won === false) {                               //if game is not won
            last_clicked = the_object;                          //stores object for win check function
            the_object.click_handler();                         //call click handler method
        }//end if
    });//end .click function
}//end make_click
function game_board_creation (){
    for(var x = 0;x <= num_of_rows-1; x++){
        var inside_array=[];
        for(var y = 0;y <= num_of_rows-1; y++) {
            var new_obj =
            {
                row : x,
                col : y,
                html: $("<div class='cell'></div>"),
                click_handler: function(){                      //this function handles the object when it is clicked
                    var symbol = toggle_and_get_current_symbol();   //retrieves last used, ie. current, symbol
                    grid_array[this.row][this.col]=symbol;          //stores the symbol x or o in the grid array
                    if(!this.html.hasClass("clicked")) {
                        this.html.addClass('clicked ' + symbol);    //sets x or o in the html cell
                        console.log("last_clicked",last_clicked);
                        console.log("grid array: ",grid_array);
                        console.log("last clicked row: ",last_clicked.row );
                        console.log("last clicked col: ",last_clicked.col );
                        check_the_win (last_clicked.row , last_clicked.col);  //calls win condition check
                        store_essential_data();                               //
                    }///////if the div hasn't been clicked before
                    else {
                        toggle_and_get_current_symbol();
                    }/// end of else
                    animate_name();         //glow current player's name if it is his turn
                }//click handler
            };///new obj
            make_click(new_obj);
            inside_array.push(new_obj);
            $(".game_board").append(new_obj.html);
        }////y
        game_board_grid.push(inside_array);
    }////x
    // width and height of cell
    var cell_width = 80/num_of_rows+'vh';
    $('.cell').css({"width": cell_width,"height": cell_width});
}//end function game_board_creation

function restore_last_game_board (last_data) {
    ///////////if local storage is not empty
    if (last_data!="") {
        player1_name_value = last_data.player1_name_value;
        player2_name_value= last_data.player2_name_value;
        player_symbol= last_data.player_symbol;
        num_of_rows= last_data.num_of_rows;
        num_of_cells_to_win= last_data.num_of_cells_to_win;
        grid_array=last_data.grid_array;
        last_clicked= last_data.last_clicked;
        game_won= last_data.game_won;
        $(".game_board").empty();
        game_board_grid=[];
        game_board_creation();
        for (var i=0;i<num_of_rows;i++) {
            for (var j=0;j<num_of_rows;j++) {
                if (grid_array[i][j]!=0) {
                    game_board_grid[i][j].html.addClass(grid_array[i][j]);
                }////end of if
            }////end of for j
        }////end of for i
    }
}

    theme_background_sound_pause_initiator();   //pause current theme background sound to prevent overlapping of theme sounds when user chooses new one.
    grid_array = [];                            //reset the grid
    create_grid_array();                        //recreate array
    console.log("grid_array is now: "+grid_array);
    $(".game_board").empty();                   //empty game board
    game_board_grid=[];
    game_board_creation();                      //recreate game board
}//end RESET

//TODO *****************************  SECTION - CHECK WIN CONDITIONS *******************************//

function check_the_win (row, col) {
    var row_win = check_row(row);
    console.log("row win: ",row_win);
    if (!row_win) {  // if no match in the row
        var col_win = check_col(col);   //check the col
        console.log("col win", col_win);
    } else {                            // ie. if row win
        game_won = true;
        animate_winner_name ();
        applause_winner();

    }
    if(!row_win && !col_win) {   // if no match in row or column
        var left_right_win =diagonal_check_left_to_right(row,col);  //check diagonal left to right
        console.log("left to right win: ", left_right_win);
    }else {                      // if match in row or column
        game_won = true;
        animate_winner_name ();
        applause_winner();
    }
    if (!row_win && !col_win && !left_right_win) {  //  if no row , column or left to right diagonal matches
        var right_left_win = diagonal_check_right_to_left(row, col);  // check diagonal right to left
        console.log(" right to left win: ", right_left_win);
        /////////if there is a match in the last case
        if (right_left_win) {                   // if right to left match
            game_won = true;
            animate_winner_name ();
            applause_winner();
        }
    }else {
        game_won = true;
        animate_winner_name ();
        applause_winner();
    }

}//check the win
//////////check if there is a match in row
function check_row(row) {
    var match_counter = 0;
    for (var i=0;i<num_of_rows-1;i++){
        if(grid_array[row][i]==grid_array[row][i+1] && grid_array[row][i]!==0){
            match_counter++;
        }else {
            if (match_counter<num_of_cells_to_win-1){
                match_counter = 0;
            }else {
                i=num_of_rows-1;
            }///if counter is less than the num to win
        }///if there is no match
    }////for
    if (match_counter>= num_of_cells_to_win-1) {
        return true
    }else {
        return false;
    }
}////check row
////////////check if there is a match in column
function check_col(col) {
    var match_counter = 0;
    for (var i=0;i<num_of_rows-1;i++){
        if(grid_array[i][col]==grid_array[i+1][col] && grid_array[i][col]!==0){
            match_counter++;
        }else {
            if (match_counter<num_of_cells_to_win-1){
                match_counter = 0;
            }else {
                i=num_of_rows-1;
            }///if counter is less than the num to win
        }///if there is no match
    }////for
    if (match_counter>= num_of_cells_to_win-1) {
        return true
    }else {
        return false;
    }
}/////////end of check col
/////////////// check for diagonal match from left to right
function diagonal_check_left_to_right(row,col) {
    var counter_top = 1;
    var counter_down= 0;
    /////for loop to go up
    for(var i=1; i<num_of_rows;i++) {
        var new_row= row-i;
        var new_col = col-i;
        if (new_col>=0 && new_row>=0){
            if (grid_array[row][col]==grid_array[new_row][new_col] && grid_array[row][col]!=0) {
                counter_top++;
            }//////////if equal
            else {
                break;
            }///////if not equal
        }else {
            i=num_of_rows;
        }
    }///////for loop to go down
    for(var d=1; d<num_of_rows;d++) {
        var new_ro= row+d;
        var new_co = col+d;
        if (new_co<=num_of_rows-1 && new_ro<=num_of_rows-1){
            if (grid_array[row][col]==grid_array[new_ro][new_co] && grid_array[row][col]!=0) {
                counter_down++;
            }//////////if equal
            else {
                break;
            }///////if not equal
        }else {
            d=num_of_rows;
        }
    }///////for loop to go down
    var total = counter_down+counter_top;
    if (total>= num_of_cells_to_win) {
        return true;
    } else {
        return false;
    }
}//////end of diagonal_check_left_to_right
//////check for diagonal match from right to left
function diagonal_check_right_to_left(row,col) {
    var counter_top = 1;
    var counter_down = 0;
    /////for loop to go up
    for (var i = 1; i < num_of_rows ; i++) {
        var new_row = row - i;
        var new_col = col + i;
        if (new_col <= num_of_rows - 1 && new_row >= 0) {
            if (grid_array[row][col] == grid_array[new_row][new_col] && grid_array[row][col] != 0) {
                counter_top++;
            }//////////if equal
            else {
                break;
            }///////if not equal
        } else {
            i = num_of_rows ;
        }
    }///////for loop to go down
    for (var d = 1; d < num_of_rows ; d++) {
        var new_ro = row + d;
        var new_co = col - d;
        if (new_co >= 0 && new_ro <= num_of_rows - 1) {
            if (grid_array[row][col] == grid_array[new_ro][new_co] && grid_array[row][col] != 0) {
                counter_down++;
            }//////////if equal
            else {
                break;
            }///////if not equal
        } else {
            d = num_of_rows ;
        }
    }///////for loop to go down
    var total = counter_down + counter_top;
    if (total >= num_of_cells_to_win) {
        return true;
    } else {
        return false;
    }

}////end of diagonal_check_right to left
/////click handler needs to specify the last click

//TODO ***************************** GRID ARRAY SECTION  *******************************//
var create_grid_array = function () {
    for (var i = 0; i < num_of_rows; i++ ) {
        var inside_array = [];
        for (var j = 0; j < num_of_rows; j++) {
            inside_array.push(0);
        }
        grid_array.push(inside_array);
    }
};//////////end of create grid array