/**  Created by Qzxtzrtz on 5/3/2016. */
//***************************** GLOBAL VARIABLES  *******************************//

var player1_name_value;
var player2_name_value;
var num_of_rows=3;
var num_of_cells_to_win=3;
var player_symbol = 'ex';
var grid_array = [];
var flag_to_move = true;// if player's turn to move, this flag must be true.

//***************************** MICAH SECTION  *******************************//
//TODO 1. players will enter name into input field + click submit, click function will hide the player's name and append a larger name with glowing animation to indicate player's turn.
// CLICK HANDLER FOR PLAYER NAME SUBMIT BUTTON

$(document).ready(function(){
    //Player1-name-value capture
    $("#player1-name-submit").click(function(){
        //capture plyr name store as var
        player1_name_value = $('#player1-name-value').val();
        console.log('var player1_name_value = ' + player1_name_value);
        // hide player input fields, append player name
        $('#player1-name-value').hide();
        $('#player1-name-submit').hide();
        var local_player1_name_value = player1_name_value;
        $('.player.player1').addClass('appended');
        $('.player.player1.appended').append(local_player1_name_value);
        animate_name();
    });//end click

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
    function animate_name () {
        if(flag_to_move === true) {
        $('.player.appended').addClass('animate');
        }
    }//end of animate_name function


// TODO 2. using jquery to capture and store as variables the number of rows and columns for the board
//     TODO disable inputs after select!! IMPORTANT , need RESET BUTTON
        // capture num_of_rows
        function capture_number_of_rows_input(){
            //capture num_of_rows store as var player2_name_value = $('#player2-name-value').val();
            num_of_rows = $('.number_of_rows').val();
            console.log('num_of_rows = ' + num_of_rows);
            $('.row-number').hide();
            num_of_rows = parseInt(num_of_rows);
        }//end capture function

// TODO 3. using jquery to capture and store as variable the number of matches the player chooses, this will be the win condition parameter.
        // capture num_of_cells_to_win
        function capture_num_of_cells_input(){
            //capture num_of_cells_to_win store as var
            num_of_cells_to_win = $('.number_of_matches').val();
            console.log('num_of_cells_to_win_input = ' + num_of_cells_to_win);
            $('.number_of_matches').hide();
            num_of_cells_to_win = parseInt(num_of_cells_to_win);
        }//end capture function

// TODO 4. using jquery to dynamically create game board based on user input
//     //creating the array grid
    create_grid_array();
    /////dynamic creation of game board
    for(var x = 0;x <= num_of_rows-1; x++){
        for(var y = 0;y <= num_of_rows-1; y++) {
            var new_obj =
            {
                row : x,
                col : y,
                html: $("<div class='cell'></div>"),
                click_handler: function(){
                    var symbol = toggle_and_get_current_symbol();
                    grid_array[this.row][this.col]=symbol;
                    if(!this.html.hasClass("clicked")) {
                        this.html.addClass('clicked ' + symbol);
                    }///////if the div hasn't been clicked before
                    else {
                       toggle_and_get_current_symbol();
                    }
                }//click handler
            };///new obj
            make_click(new_obj);
            $(".game_board").append(new_obj.html);
        }////y
    }////x

    //TODO width and height of cell
    var cell_width = 78/num_of_rows+'vh';

    $('.cell').css({"width": cell_width,"height": cell_width});

    function make_click(the_object){
        the_object.html.click(function(){
            console.log('object that was triggered',the_object);
            the_object.click_handler();
        });
    }

    function toggle_and_get_current_symbol(){
        if(player_symbol=='ex'){
            player_symbol = 'ow';
        }
        else{
            player_symbol = 'ex';
        }
        return player_symbol;
    }
});//end document ready

//TODO ***************************** PEARL SECTION  *******************************//

// var grid_array = [
//     [0,"ex",0,0,"ow"],
//     [0,"ex",0,"ow","ex"],
//     [0,"ow","ow",0,"oh"],
//     [0,"ex","ow","ex","ow"],
//     [0,"ow",0,0,0]
// ];
// var num_of_rows = 5;
// var num_of_cells_to_win = 3;
// var last_click = {
//     col : 2,
//     row : 2
// };
// console.log("row: ",last_click.row," col: ",last_click.col);
// check_the_win (last_click.row,last_click.col);

function check_the_win (row, col) {
    var row_win = check_row(row);
    console.log("row win: ",row_win);
    if (!row_win) {
        var col_win = check_col(col);
        console.log("col win", col_win);
    }
    if(!row_win && !col_win) {
        var left_right_win =diagonal_check_left_to_right(row,col);
        console.log("left to right win: ", left_right_win);
    }
    if (!row_win && !col_win && !left_right_win) {
        var right_left_win = diagonal_check_right_to_left(row, col);
        console.log(" right to left win: ", right_left_win);
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
    for(var i=1; i<num_of_rows-1;i++) {
        var new_row= row-i;
        var new_col = col-i;
        if (new_col>=0 && new_row>=0){
            if (grid_array[row][col]==grid_array[new_row][new_col]&& grid_array[row][col]!=0) {
                counter_top++;
            }//////////if equal
            else {
                break;
            }///////if not equal
        }else {
            i=num_of_rows-1;
        }
    }///////for loop to go down
    for(var d=1; d<num_of_rows-1;d++) {
        var new_ro= row+d;
        var new_co = col+d;
        if (new_col<=num_of_rows-1 && new_row<=num_of_rows-1){
            if (grid_array[row][col]==grid_array[new_ro][new_co]&& grid_array[row][col]!=0) {
                counter_down++;
            }//////////if equal
            else {
                break;
            }///////if not equal
        }else {
            i=num_of_rows-1;
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
    for (var i = 1; i < num_of_rows - 1; i++) {
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
            i = num_of_rows - 1;
        }
    }///////for loop to go down
    for (var d = 1; d < num_of_rows - 1; d++) {
        var new_ro = row + d;
        var new_co = col - d;
        if (new_col >= 0 && new_row <= num_of_rows - 1) {
            if (grid_array[row][col] == grid_array[new_ro][new_co] && grid_array[row][col] != 0) {
                counter_down++;
            }//////////if equal
            else {
                break;
            }///////if not equal
        } else {
            i = num_of_rows - 1;
        }
    }///////for loop to go down
    var total = counter_down + counter_top;
    if (total >= num_of_cells_to_win) {
        return true;
    } else {
        return false;
    }

}////end

/////click handler needs to specify the last click

//TODO ***************************** AMINA SECTION  *******************************//
var create_grid_array = function () {

    for (var i = 0; i < num_of_rows; i++ ) {
        var inside_array = [];
        for (var j = 0; j < num_of_rows; j++) {
            inside_array.push(0);
        }
        grid_array.push(inside_array);
    }
    console.log(grid_array);
};//////////end of create grid array







