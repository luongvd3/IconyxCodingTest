
namespace sudoku
{
    internal class Program
    {
        private record struct Position(int Row, int Column);
        static void Main(string[] args)
        {
            int[,] board = new int[,] 
            {
                { 3, 0, 6, 5, 0, 8, 4, 0, 0 },
                { 5, 2, 0, 0, 0, 0, 0, 0, 0 },
                { 0, 8, 7, 0, 0, 0, 0, 3, 1 },
                { 0, 0, 3, 0, 1, 0, 0, 8, 0 },
                { 9, 0, 0, 8, 6, 3, 0, 0, 5 },
                { 0, 5, 0, 0, 9, 0, 6, 0, 0 },
                { 1, 3, 0, 0, 0, 0, 2, 5, 0 },
                { 0, 0, 0, 0, 0, 0, 0, 7, 4 },
                { 0, 0, 5, 2, 0, 6, 3, 0, 0 }
            };

            Position[] emptyPositions = GetAllEmptyPosition(board);

            bool isSolved = SolveSudoku(board, emptyPositions);

            int n = board.GetLength(0);
            if (isSolved)
            {
                Print(board, n);
            }
            else
            {
                Console.WriteLine("No solution exists");
            }

        }
        //Solve using backtracking without recursion
        private static bool SolveSudoku(int[,] board, Position[] emptyPositions)
        {
            int currentEmptyPosition = 0;
            bool isMoveLeft = true;
            bool isSolved = false;
            while (isMoveLeft && !isSolved)
            {
                Position currentPos = emptyPositions[currentEmptyPosition];
                board[currentPos.Row, currentPos.Column]++;
                if (currentEmptyPosition < 0)
                {
                    isMoveLeft =false;
                    continue;
                }
                if (board[currentPos.Row, currentPos.Column] > 9 && currentEmptyPosition != 0)
                {
                    board[currentPos.Row, currentPos.Column] = 0;
                    currentEmptyPosition--;
                    continue;
                }

                if (currentEmptyPosition + 1 == emptyPositions.Length)
                {
                    isSolved = true;
                    continue;
                }

                if (IsSafe(board, currentPos))
                {
                    currentEmptyPosition++;
                }
            }
            return isSolved;

        }

        private static Position[] GetAllEmptyPosition(int[,] board)
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

        public static void Print(int[,] board, int N)
        {

            // We got the answer, just print it
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
    }
}
