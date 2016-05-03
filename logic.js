/**
 * Created by thomascase on 5/3/16.
 */


var matches_needed_for_win = 5;

global_array = [];
for (var i = 0; i < 10; i++){
    var temp_arr = [];
    for (var j = 0; j < 10; j++){
        temp_arr.push({
            class: 'x',
            confirmed: true,
            col: i,
            row: j
        })
    }
    global_array.push(temp_arr);
}
console.log(global_array);
//the length of global_array is the # of columns we have (width)
var width = global_array.length;
//the length of global_array[0] is the # of rows we have (height)
var height = global_array[0].length;



window.localStorage.setItem('globals', global_to_local());

function global_to_local(){
    var object_to_store = {};
    for (var i = 0; i < width; i++){
        for (var j = 0; j < height; j++){
            var temp_key = '' + i + j;
            console.log('tempkey: ' , temp_key);
            object_to_store[temp_key] = global_array[i][j];
            console.log('resulting object: ' , object_to_store[temp_key]);
        }
    }
    var stringified_object = JSON.stringify(object_to_store);
    return stringified_object;
}

function local_to_global(){
    var temp_jawn = window.localStorage.getItem('globals');
    var object_from_local = $.parseJSON(temp_jawn);
    console.log('object from local ' , object_from_local);
    for (var i = 0; i < width; i++) {
        for (var j = 0; j < height; j++) {
            var temp_key = '' + i + j;
            global_array[i][j] = object_from_local[temp_key];
            console.log(global_array[i][j]);
        }
    }
    console.log('finished local to global transfer');
}
local_to_global();
console.log(global_array);


//function win_check_row: takes in the y position of the row we want to check and determines if there is a victory based on the elements in that row
//It will return a boolean that says whether or not it found a victory
function win_check_row(row_index){//checks to see if there is a match in the specified row
    // console.log('starting row check');
    var start = row_index; //just shortening the variable name
    var temp_type = global_array[0][start].class; //store the type of the first element in that row
    var consecutive_objects = 1; //this number will increment every time there are two identical consecutive symbols
    for (var i = 1; i < global_array.length; i++){ //This loop will iterate once for each element in the row we're checking
        if (temp_type == global_array[i][start].class){//checks to see if there is a match between the last object checked and the current object
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
            temp_type = global_array[i][y].class;
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
    var temp_type = global_array[start][0].class;
    var consecutive_objects = 1;
    console.log(global_array[start].length);
    for (var i = 0; i < global_array[start].length; i++){
        console.log('looping', i , 'type is: ' , global_array[start][i].class);
        if(temp_type == global_array[start][i].class){
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
            temp_type = global_array[start][i].class;
            consecutive_objects = 1;
        }
    }
    return false;
}

function tile_in_range(column, row){
    if (column < 0 || row < 0 || column > width || row > height){
        return false;
    }
        return true;
}



function win_check_upward_diagonal(current_col, current_row) {
    console.log('upward diag');
    var temp_type = global_array[current_col][current_row].class;
    var consecutive_objects = 1;
    current_col++;
    current_row--;
    console.log("Tile in range: " , tile_in_range(0, -1));
    for (var i = 0; tile_in_range(current_col, current_row); i) {//makes sure we never exceed our bounds while checking for matches
        console.log('looping at', current_col, current_row);
        if (temp_type == global_array[current_col][current_row].class){
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
        console.log('looping');
        if (temp_type == global_array[current_col][current_row].class){
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
        current_row++;
    }
    return false;
}