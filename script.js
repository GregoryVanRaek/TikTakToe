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

    const Win = () => {
        const winConditions = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6]
        ];
    
        for(const [i, condition] of winConditions.entries()) {
            const [a, b, c] = condition;
    
            if(gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c])
                return { winner: gameBoard[a], combination: condition, combinationIndex: i };
    
            if(gameBoard.every(cell => cell !== ""))
                return { winner: 'tie' };
        }
    
        return null;
    }
    
    return {GetBoard, Reset, SetMark, Win};
})();

// Management of the game
const gameController = (() => 
{
    const cells = document.querySelectorAll('.cell');
    const message = document.querySelector('.message');
    const restart = document.getElementById('restart');
    const firstPlayer = player("Player 1", "X");
    const secondPlayer = player("Player 2", "O");
    
    let round = 1;

    const GetCurrentPlayer = () => 
    {
        currentPlayer = (round % 2 === 1)? firstPlayer : secondPlayer;
        return currentPlayer;
    }

    const PlayRound = () => {
        message.textContent = "Player X's turn";
        cells.forEach((cell) => {
            cell.addEventListener('click', (e) => {
                let currentPlayer = GetCurrentPlayer().GetMark();

    
                if (e.target.textContent === "" && board.Win() === null) {
                    e.target.textContent = currentPlayer;
                    board.SetMark(e.target.dataset.index, currentPlayer);
    
                    const winResult = board.Win(); 
    
                    if (winResult) {
                        if (winResult.winner !== 'tie') {
                            const combinationCells = winResult.combination.map(index => cells[index]);
                            combinationCells.forEach(cell => cell.classList.add('winning-cell'));
                            message.textContent = `Player ${currentPlayer} has won!`;
                        }
    
                         if (winResult.winner === 'tie') {
                            message.textContent = "It's a tie !";
                        }
    
                        cells.forEach(cell => cell.removeEventListener('click', handleClick));
                    } else {
                        round++;
                        currentPlayer = GetCurrentPlayer().GetMark();
                        message.textContent = `Player ${currentPlayer}'s turn`;
                    }
                }
            });
        });
    };
    
    restart.addEventListener('click', () => {
        board.Reset();
        cells.forEach(cell => {
            cell.textContent = "";
            cell.classList.remove('winning-cell');
        });
        currentPlayer = firstPlayer;
        message.textContent = `Player X's turn`;
        round = 1;
    });


    return {PlayRound};
})();

gameController.PlayRound();