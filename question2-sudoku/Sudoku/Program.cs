
namespace Sudoku
{
    public class Program
    {
        public record struct Position(int Row, int Column);
        static void Main(string[] args)
        {
            while (true)
            {
                int boardSize = 9;
                int[,] board = BoardInputPrompt(boardSize);

                Position[] emptyPositions = GetAllEmptyPosition(board);

                bool isSolved = SolveSudoku(board, emptyPositions, out int[,] resultBoard);

                if (isSolved)
                {
                    Console.WriteLine("\nSolution:");
                    Print(resultBoard, boardSize);
                }
                else
                {
                    Console.WriteLine("No unique solution exists or invalid puzzle");
                }

            }
        }
        //Solve using backtracking without recursion
        public static bool SolveSudoku(int[,] board, Position[] emptyPositions, out int[,] resultBoard)
        {
            resultBoard = (int[,])board.Clone();
            bool isValidPuzzle = VerifyPuzzle(board, board.GetLength(0));
            int currentEmptyPosition = 0;
            int numberSolutionsFound = 0;
            if (emptyPositions.Length == 0 && isValidPuzzle)
            {
                return true;
            } else if (!isValidPuzzle)
            {
                return false;
            }
            // Break when the algorithm backtracks past the first empty position
            // Or more than 1 solution is found
            while (currentEmptyPosition >= 0 && numberSolutionsFound < 2)
            {
                // A solution is found, if all empty positions are filled with safe values
                // If it's the first solution, store it in resultBoard
                // and continue to see if the the solution is unique
                if (currentEmptyPosition == emptyPositions.Length)
                {
                    resultBoard = (int[,])board.Clone();
                    numberSolutionsFound++;
                    currentEmptyPosition--;
                    continue;
                }

                Position currentPos = emptyPositions[currentEmptyPosition];

                // Increment the current position
                board[currentPos.Row, currentPos.Column]++;

                // If the current position's value is greater than 9, reset it to 0
                // and backtrack to the previous empty position
                if (board[currentPos.Row, currentPos.Column] > 9)
                {
                    board[currentPos.Row, currentPos.Column] = 0;
                    currentEmptyPosition--;
                    continue;
                }

                // If the current position is safe, move to the next empty position
                if (IsSafe(board, currentPos))
                {
                    currentEmptyPosition++;
                }
            }
            // If only 1 solution is found, return true
            return numberSolutionsFound == 1 ? true : false ;

        }

        public static Position[] GetAllEmptyPosition(int[,] board)
        {
            List<Position> emptyPosition = new List<Position>();
            for (int i = 0; i < board.GetLength(0); i++)
            {
                for (int j = 0; j < board.GetLength(1); j++)
                {
                    if (board[i, j] == 0)
                    {
                        Position position = new Position(i, j);
                        emptyPosition.Add(position);
                    }
                }
            }
            return emptyPosition.ToArray();
        }
        private static bool IsSafe(int[,] board, Position pos)
        {

            // Row has the unique (row-clash)
            for (int c = 0; c < board.GetLength(0); c++)
            {
                if (c != pos.Column && board[pos.Row, c] == board[pos.Row, pos.Column])
                {
                    return false;
                }
            }

            // Column has the unique numbers (column-clash)
            for (int r = 0; r < board.GetLength(0); r++)
            {
                if (r != pos.Row && board[r, pos.Column] == board[pos.Row, pos.Column])
                {
                    return false;
                }
            }

            // corresponding square has
            // unique number (box-clash)
            int sqrt = (int)Math.Sqrt(board.GetLength(0));
            int boxRowStart = pos.Row - pos.Row % sqrt;
            int boxColStart = pos.Column - pos.Column % sqrt;

            for (int r = boxRowStart; r < boxRowStart + sqrt; r++)
            {
                for (int c = boxColStart; c < boxColStart + sqrt; c++)
                {
                    if ((r != pos.Row || c != pos.Column) && board[r, c] == board[pos.Row, pos.Column])
                    {
                        return false;
                    }
                }
            }

            // if there is no clash, it's safe
            return true;
        }

        private static int[,] BoardInputPrompt(int boardSize)
        {
            int[,] sudokuGrid = new int[boardSize, boardSize];

            Console.WriteLine("Enter your 9x9 Sudoku puzzle row by row.");
            Console.WriteLine("Use 0 to represent empty cells.");
            Console.WriteLine("At any time type \"exit\" to terminate or \"reset\" to enter new puzzle");
            for (int i = 0; i < boardSize; i++)
            {
                Console.Write($"Enter row {i + 1} (9 digits with spaces in between): ");
                string input = Console.ReadLine();
                input = input != null ? input.Trim() : string.Empty;

                if (input.Equals("exit", StringComparison.OrdinalIgnoreCase))
                {
                    Environment.Exit(0);
                } else if (input.Equals("reset", StringComparison.OrdinalIgnoreCase))
                {
                    sudokuGrid = new int[boardSize, boardSize];
                    i = -1; // Reset the loop
                    continue;
                }

                string[] rowValues = input.Split(' ');

                if (rowValues.Length != boardSize)
                {
                    Console.WriteLine("Invalid input. Each row must have exactly 9 numbers.");
                    i--; // Retry current row
                    continue;
                }

                for (int j = 0; j < boardSize; j++)
                {
                    if (int.TryParse(rowValues[j], out int value) && value >= 0 && value <= boardSize)
                    {
                        sudokuGrid[i, j] = value;
                    }
                    else
                    {
                        Console.WriteLine("Invalid input. Each cell must be a number between 0 and 9.");
                        i--; // Retry current row
                        break;
                    }
                }
            }

            Console.WriteLine("\nYou have entered the following Sudoku puzzle:");
            Print(sudokuGrid, boardSize);
            return sudokuGrid;
        }

        private static void Print(int[,] board, int N)
        {
            for (int r = 0; r < N; r++)
            {
                for (int d = 0; d < N; d++)
                {
                    Console.Write(board[r, d]);
                    Console.Write(" ");
                }
                Console.Write("\n");

                if ((r + 1) % (int)Math.Sqrt(N) == 0)
                {
                    Console.Write("");
                }
            }
        }

        private static bool VerifyPuzzle(int[,] board, int N)
        {
            for (int r = 0; r < N; r++)
            {
                for (int c = 0; c < N; c++)
                {
                    if (board[r, c] != 0 && !IsSafe(board, new Position(r, c)))
                    {
                        return false;
                    }
                }
            }
            return true;
        }
    }
}
