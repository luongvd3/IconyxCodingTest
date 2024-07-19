Run Instruction
- Make sure that .Net 8.0 is installed with Visual Studio 2022    
- After cloning the repository from Github, from Visual Studio 2022, go to File -> Open -> Project Solution -> select question2-sudoku/Sudoku/Sudoku.sln  
- Press "F5" to run the application in debug mode or "Ctrl + F5" to run without debug  
- Press "Ctrl + R,A" to run unit tests   

Sudoku Algorithm explanation:  
The algorithm is backtracking implemented using iteration instead of recursion.  
- First, all empty space coordinates are extracted from the starting board and stored in a one-dimensional array.  
- Then, we iterate the empty spaces array from position 0.  
- For each iteration, the value of the current empty space in the starting board is increased by one.  
- If the value for that empty space is valid/safe, we move the next empty space by increasing the current empty space position by 1 and repeat the last step.  
- If the value for the current empty space reaches 9 and no valid values are found, reset the value to 0 and decrease the current empty space position by 1 (backtracking).  
- A solution is found when the current empty space position reaches the end of the empty space array and the corresponding value is safe.  
- If the current empty space position goes minus, it means there is no move left and there is no other solution to be discovered. In this case, if no solution is discovered, it means the puzzle is unsolvable. The algorithm is terminated and returns false.   
- When a solution is found for the first time, a snapshot of the board is taken as the result of the puzzle but the process keeps on going. If another solution is found, it means the previous solution is not unique and the initial puzzle is invalid. Terminate the algorithm and return false.  
- The algorithm returns true and the snapshot result if only one solution is found.  

The algorithm assumes that there is no violation in initial puzzle hints because no check is done on the hints, so a preliminary check for the hints is necessary to ensure a correct result.  

The algorithm is a brute force that tries all possible combinations to find the solution. This will scale badly if the size of the board gets larger. However, the early termination when a second solution is found makes the algorithm perform quite well in most cases with a 9x9 puzzle. Further improvements can be made by eliminating certain combinations by applying constraints  on the current board state.  

Algorithm time complexity: O(9^(n^2))  
Algorithm space complexity: O(n^2)  
n is the dimension of the board.  
 

