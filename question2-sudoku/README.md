Run Instruction
- Make sure that .Net 8.0 is installed with Visual Studio 2022    
- After cloning the repository from Github, from Visual Studio 2022, go to File -> Open -> Project/Solution -> select question2-sudoku/Sudoku/Sudoku.sln  
- Press "F5" to run the application in debug mode or "Ctrl + F5" to run without debug  
- Press "Ctrl + R,A" to run unit tests   

Sudoku Algorithm explanation:  
The algorithm is backtracking implemented using iteration instead of recursion. All empty spaces from the puzzle are represented by zeros.  
- First, the algorithm runs a preliminary check of initial puzzle hints. If a violation is found, return false.    
- All empty space coordinates are extracted from the starting board and stored in a one-dimensional array.  
- Then, we iterate the empty spaces array from position 0.  
- For each iteration, the value of the current empty space in the starting board is increased by one.  
- If the value for that empty space is valid/safe, we move the next empty space by increasing the current empty space position by 1 and repeat the last step.  
- If the value for the current empty space reaches 9 and no valid values are found, reset the value to 0 and decrease the current empty space position by 1 (backtracking).  
- A solution is found when the current empty space position reaches the end of the empty space array and the corresponding value is safe. 
- When a solution is found for the first time, a snapshot of the board is taken as the result of the puzzle but the process keeps on going. If another solution is found, it means the previous solution is not unique and the initial puzzle is invalid. Terminate the algorithm and return false.   
- If the current empty space position goes minus, it means there is no move left and there is no other solution to be discovered. In this case, if no solution was discovered, it means the puzzle is unsolvable. The algorithm is terminated and returns false.   
- The algorithm returns true and the snapshot result if only one solution is found.  

Further improvements can be made by eliminating certain combinations by applying constraints on the current board state for each iteration.  

Algorithm time complexity: O(9^(n^2))  
Algorithm space complexity: O(n^2)  
n is the dimension of the board.  
 

