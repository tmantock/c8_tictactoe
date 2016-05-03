var grid_array = [
    [0,"ex",0,0,"ow"],
    [0,"ex",0,"ex","ex"],
    [0,"oh","ex",0,"oh"],
    [0,"ex","oh","ex","ow"],
    [0,"oh",0,0,0]
];
var num_of_rows = 5;
var num_of_cells_to_win = 3;
var last_click = {
    col : 3,
    row : 3
};

console.log("row: ",last_click.row," col: ",last_click.col);
check_the_win (last_click.row,last_click.col);



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

///////////////check for diagonal match from left to right
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