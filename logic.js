/**
 * Created by thomascase on 5/3/16.
 */

$('.tile').on('click', function(){
    
});

var matches_needed_for_win = 5;

global_array = [];
for (var i = 0; i < 10; i++){
    var temp_arr = [];
    for (var j = 0; j < 10; j++){
        temp_arr.push({
            type: 'x'
        })
    }
    global_array.push(temp_arr);
}

console.log(global_array[0][1].type);
global_array[1][2].type = null;
console.log(win_check_column(1));


//the length of global_array is the # of columns we have (width)
//the length of global_array[0] is the # of rows we have (height)

//function win_check_row: takes in the y position of the row we want to check and determines if there is a victory based on the elements in that row
//It will return a boolean that says whether or not it found a victory
function win_check_row(row_index){//checks to see if there is a match in the specified row
    // console.log('starting row check');
    var start = row_index; //just shortening the variable name
    var temp_type = global_array[0][start].type; //store the type of the first element in that row
    var consecutive_objects = 1; //this number will increment every time there are two identical consecutive symbols
    for (var i = 1; i < global_array.length; i++){ //This loop will iterate once for each element in the row we're checking
        if (temp_type == global_array[i][start].type){//checks to see if there is a match between the last object checked and the current object
            console.log('checking a loop: ', i , start);
            if(temp_type == null){
                //this block ensures that we only increment the consecutive_matches variable if the tiles actually contain a players symbol
            }
            else{
                consecutive_objects++;
                console.log(consecutive_objects);
                if (consecutive_objects == matches_needed_for_win){
                    return true;
                }
            }
        }
        else{//this else block executes when we encounter a mismatch
            temp_type = global_array[i][y].type;
            consecutive_objects = 1;
        }
    }
    return false;
}

//function win_check_column: takes in the x position of the column we want to check and determines if there is a victory based on the elements in that column
//It will return a boolean that says whether or not it found a victory
function win_check_column(col_index){
    console.log('starting col check');
    var start = col_index;
    var temp_type = global_array[start][0].type;
    var consecutive_objects = 1;
    console.log(global_array[start].length);
    for (var i = 0; i < global_array[start].length; i++){
        console.log('looping', i , 'type is: ' , global_array[start][i].type);
        if(temp_type == global_array[start][i].type){
            if (temp_type == null){
                console.log('doing nothing');
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
            console.log('mismatch');
            temp_type = global_array[start][i].type;
            consecutive_objects = 1;
        }
    }
    return false;
}

function win_check_upward_diagonal(current_col, current_row) {
    var temp_type = global_array[col_start][current_row].type;
    var consecutive_objects = 1;
    current_col++;
    current_row--;
    while (current_col < global_array.length && current_row < global_array[0].length) {//makes sure we never exceed our bounds while checking for matches
        if (temp_type == global_array[current_col][current_row].type){
            if (temp_type == null) {
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
}