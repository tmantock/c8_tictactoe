//***************************** GLOBAL VARIABLES  *******************************//
var player1_name_value;
var player2_name_value;
var num_of_rows=3;
var num_of_cells_to_win;
var player_symbol = 'ex';

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
            $('.player.player1').addClass('appended');
            $('.player.player1.appended').append(local_player1_name_value);
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


//TODO 2. using jquery to capture and store as variables the number of rows and columns for the board
    //TODO disable inputs after select!! IMPORTANT , need RESET BUTTON
    //     // capture num_of_rows
    //     function capture_number_of_rows_input(){
    //         //capture num_of_rows store as var
    //         num_of_rows = $('.number_of_rows').val();
    //         console.log('num_of_rows = ' + num_of_rows);
    //         num_of_rows = parseInt(num_of_rows);
    //     }//end capture function

//TODO 3. using jquery to capture and store as variable the number of matches the player chooses, this will be the win condition parameter.
//         // capture num_of_cells_to_win
//         function capture_num_of_cells_input(){
//             //capture num_of_cells_to_win store as var
//             num_of_cells_to_win = $('.number_of_matches').val();
//             console.log('num_of_cells_to_win_input = ' + num_of_cells_to_win);
//             num_of_cells_to_win = parseInt(num_of_cells_to_win);
//         }//end capture function

//TODO 4. using jquery to dynamically create game board based on user input
        //
        /////dynamic creation
        for(var x = 0;x <= num_of_rows-1; x++){
            for(var y = 0;y <= num_of_rows-1; y++) {
                var new_obj =
                {
                    row : x,
                    col : y,
                    html: $("<div class='cell'></div>"),
                    click_handler: function(){
                        var symbol = toggle_and_get_current_symbol();
                        this.html.addClass('clicked '+symbol);

                    }//click handler
                };///new obj
                make_click(new_obj);
                $(".game_board").append(new_obj.html);
            }////y
        }////x

        //TODO width and height of cell
        var cell_width = 95/num_of_rows+'vh';

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
//***************************** PEARL SECTION  *******************************//





//***************************** AMINA SECTION  *******************************//
var array_num = function () {
    var num_of_rows = 6;
    var grid_array = [];
    for (var i = 0; i < num_of_rows; i++ ) {
        var inside_array = [];
        for (var j = 0; j < num_of_rows; j++) {
            inside_array.push(0);
        }
        grid_array.push(inside_array);
    }
    console.log(grid_array);
};

