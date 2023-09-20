// Creation of the players
const player = (name, mark) => {
    this.name = name;
    this.mark = mark;

    const GetName = () => name;
    const GetMark = () => mark;

    return{GetName, GetMark}
};

// Management of the board
const board = (() => 
{
    const gameBoard = ["","","","","","","","",""];

    const GetBoard = () => gameBoard;

    const Reset = () => {
        for(let i = 0 ; i < gameBoard.length ; i++)
            gameBoard[i] = "";
    }

    const SetMark = (index, mark) => 
    {
        if(gameBoard[index] === "")
        {
            gameBoard[index] = mark;
        }
    }

    const Win = () => 
    {
        let gameOver = false;
        let winConditions = 
        [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6]
        ]
        
        for(const condition of winConditions)
        {
            const [a, b, c] = condition;
            if(gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c])
                return gameBoard[a];

            if(gameBoard.every(cell => cell != ""))
                return "It's a tie !";

            return null;
        }
    }

    return {GetBoard, Reset, SetMark, Win};
})();

// Management of the display
const displayController = (() => 
{
    const cells = document.querySelectorAll('.cell');
    const message = document.querySelector('.message');
    const boardArea = document.querySelector('main');
    boardArea.appendChild(message);

    const displayMessage = () => {
        
    }

    cells.forEach((cell) => 
    {
        cell.addEventListener('click', (e) => 
        {
            let currentPlayerMark = gameController.GetCurrentPlayer().GetMark();
            if(e.target.textContent === "" && board.Win() === null )
            {
                e.target.textContent = currentPlayerMark ;
            }

            board.SetMark(e.target.dataset.index, currentPlayerMark);  
        })
    })
})();

// Management of the game
const gameController = (() => 
{
    const firstPlayer = player("Player 1", "X");
    const secondPlayer = player("Player 2", "O");
    let currentPlayer;
    let round = 1;

    const GetCurrentPlayer = () => 
    {
        currentPlayer = (round % 2 === 1)? firstPlayer : secondPlayer;
        round++;
        return currentPlayer;
    }

    return {GetCurrentPlayer};
})();
