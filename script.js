//***************************** GLOBAL VARIABLES  *******************************//
var player1_name_value;
var player2_name_value;
var num_of_rows;
var num_of_cells_to_win;

//***************************** MICAH SECTION  *******************************//
//TODO 1. players will enter name into input field + click submit, click function will hide the player's name and append a larger name with glowing animation to indicate player's turn.
// CLICK HANDLER FOR PLAYER NAME SUBMIT BUTTON

    $(document).ready(function(){
        //Player1-name-value capture
        $("#player1-name-submit").click(function(){
                //capture plyr name store as var
            player1_name_value = $('#player1-name-value').val();
                console.log('var player1_name_value = ' + player1_name_value);
                // hide player input fields, append big name
            $('#player1-name-value').hide();
            $('#player1-name-submit').hide();
            var local_player1_name_value = player1_name_value;
            //local_player1_name_value.appendTo('player player2');
        });//end click

        //Player2-name-value capture
        $("#player2-name-submit").click(function(){
                //capture plyr nam store as var
            player2_name_value = $('#player2-name-value').val();
                console.log('var player2_name_value = ' + player2_name_value);
        });//end click

        // Player name animation function
        function animate_name (player_name) {
        }//end of animate_name function

    });//end document ready
//TODO 2. using jquery to capture and store as variables the number of rows and columns for the board
    //TODO disable inputs after select!! IMPORTANT , need RESET BUTTON
        // capture num_of_rows
        function capture_number_of_rows_input(){
            //capture num_of_rows store as var
            num_of_rows = $('.number_of_rows').val();
            console.log('num_of_rows = ' + num_of_rows);
            num_of_rows = parseInt(num_of_rows);
        }//end capture function

//TODO 3. using jquery to capture and store as variable the number of matches the player chooses, this will be the win condition parameter.
        // capture num_of_cells_to_win
        function capture_num_of_cells_input(){
            //capture num_of_cells_to_win store as var
            num_of_cells_to_win = $('.number_of_matches').val();
            console.log('num_of_cells_to_win_input = ' + num_of_cells_to_win);
            num_of_cells_to_win = parseInt(num_of_cells_to_win);
        }//end capture function

//TODO 4. using jquery to dynamically create game board based on user input
        //



//***************************** PEARL SECTION  *******************************//





//***************************** AMINA SECTION  *******************************//