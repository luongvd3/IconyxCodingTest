using Newtonsoft.Json.Linq;
using static Sudoku.Program;
namespace UnitTest
{
    [TestClass]
    public class Tests
    {
        static JObject allSudokuPuzzle = JObject.Parse(File.ReadAllText("TestData.json"));
        static int[,] ConvertJsonTo2DArray(JToken[] jsonArray)
        {
            
            int n = jsonArray.Length;
            // Create a 2D array with the same dimensions
            int[,] result = new int[n, n];

            for (int i = 0; i < n; i++)
            {
                JToken[] row = jsonArray[i].ToArray();
                for (int j = 0; j < n; j++)
                {
                    result[i, j] = row[j].Value<int>();
                }
            }

            return result;
        }
        //Prep valid puzzles for data driven testing
        public static IEnumerable<object[]> ValidPuzzles
        {
            get
            {
                JToken[] validPuzzle = allSudokuPuzzle["NormalValidSudoku"].ToArray();
                object[][] results = new object[validPuzzle.Length][];
                for (int i = 0; i < validPuzzle.Length; i++)
                {
                    JToken[] jTokens = validPuzzle[i].ToArray();
                    results[i] = [ConvertJsonTo2DArray(jTokens)];
                }
                return results;
            }
        }

        [TestMethod]
        [DynamicData(nameof(ValidPuzzles))]
        public void SolveSudoku_CorrectPuzzle_ReturnTrue(int[,] puzzle)
        {
            Position[] emptyPositions = GetAllEmptyPosition(puzzle);
            bool isSolved = SolveSudoku(puzzle, emptyPositions, out int[,] resultBoard);
            Assert.IsTrue(isSolved);
        }
        [TestMethod]
        public void SolveSudoku_EmptyPuzzle_ReturnFalse()
        {
            int[,] puzzle = ConvertJsonTo2DArray(allSudokuPuzzle["Empty"].ToArray());
            Position[] emptyPositions = GetAllEmptyPosition(puzzle);
            bool isSolved = SolveSudoku(puzzle, emptyPositions, out int[,] resultBoard);
            Assert.IsTrue(!isSolved);
        }
        [TestMethod]
        public void SolveSudoku_SingleGiven_ReturnFalse()
        {
            int[,] puzzle = ConvertJsonTo2DArray(allSudokuPuzzle["SingleGiven"].ToArray());
            Position[] emptyPositions = GetAllEmptyPosition(puzzle);
            bool isSolved = SolveSudoku(puzzle, emptyPositions, out int[,] resultBoard);
            Assert.IsTrue(!isSolved);
        }
        [TestMethod]
        public void SolveSudoku_InsufficientGivens_ReturnFalse()
        {
            int[,] puzzle = ConvertJsonTo2DArray(allSudokuPuzzle["InsufficientGivens"].ToArray());
            Position[] emptyPositions = GetAllEmptyPosition(puzzle);
            bool isSolved = SolveSudoku(puzzle, emptyPositions, out int[,] resultBoard);
            Assert.IsTrue(!isSolved);
        }
        [TestMethod]
        public void SolveSudoku_DuplicateGivenBox_ReturnFalse()
        {
            int[,] puzzle = ConvertJsonTo2DArray(allSudokuPuzzle["DuplicateGivenBox"].ToArray());
            Position[] emptyPositions = GetAllEmptyPosition(puzzle);
            bool isSolved = SolveSudoku(puzzle, emptyPositions, out int[,] resultBoard);
            Assert.IsTrue(!isSolved);
        }
        [TestMethod]
        public void SolveSudoku_DuplicateGivenColumn_ReturnFalse()
        {
            int[,] puzzle = ConvertJsonTo2DArray(allSudokuPuzzle["DuplicateGivenColumn"].ToArray());
            Position[] emptyPositions = GetAllEmptyPosition(puzzle);
            bool isSolved = SolveSudoku(puzzle, emptyPositions, out int[,] resultBoard);
            Assert.IsTrue(!isSolved);
        }
        [TestMethod]
        public void SolveSudoku_DuplicateGivenRow_ReturnFalse()
        {
            int[,] puzzle = ConvertJsonTo2DArray(allSudokuPuzzle["DuplicateGivenRow"].ToArray());
            Position[] emptyPositions = GetAllEmptyPosition(puzzle);
            bool isSolved = SolveSudoku(puzzle, emptyPositions, out int[,] resultBoard);
            Assert.IsTrue(!isSolved);
        }
        [TestMethod]
        public void SolveSudoku_UnsolvableSquare_ReturnFalse()
        {
            int[,] puzzle = ConvertJsonTo2DArray(allSudokuPuzzle["UnsolvableSquare"].ToArray());
            Position[] emptyPositions = GetAllEmptyPosition(puzzle);
            bool isSolved = SolveSudoku(puzzle, emptyPositions, out int[,] resultBoard);
            Assert.IsTrue(!isSolved);
        }
        [TestMethod]
        public void SolveSudoku_UnsolvableBox_ReturnFalse()
        {
            int[,] puzzle = ConvertJsonTo2DArray(allSudokuPuzzle["UnsolvableBox"].ToArray());
            Position[] emptyPositions = GetAllEmptyPosition(puzzle);
            bool isSolved = SolveSudoku(puzzle, emptyPositions, out int[,] resultBoard);
            Assert.IsTrue(!isSolved);
        }
        [TestMethod]
        public void SolveSudoku_UnsolvableRow_ReturnFalse()
        {
            int[,] puzzle = ConvertJsonTo2DArray(allSudokuPuzzle["UnsolvableRow"].ToArray());
            Position[] emptyPositions = GetAllEmptyPosition(puzzle);
            bool isSolved = SolveSudoku(puzzle, emptyPositions, out int[,] resultBoard);
            Assert.IsTrue(!isSolved);
        }
    }

}