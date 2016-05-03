var grid_array = [
    [0,"ex",0,0,"ow"],
    [0,"ex",0,"ex","ex"],
    [0,"ex","oh",0,"oh"],
    [0,"ex","ex","ex","ow"],
    [0,"oh",0,0,0]
];
var num_of_rows = 5;
var num_of_cells_to_win = 3;
var last_click = {
    col : 4,
    row : 4
};

console.log("row: ",last_click.row," col: ",last_click.col);
check_the_win (last_click.row,last_click.col);



function check_the_win (row, col) {
    var win = check_row(row);
    console.log("row win: ",win);
    if (!win) {
       win = check_col(col);
        console.log("col win", win);
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




/////click handler needs to specify the last click