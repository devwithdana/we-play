import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './Minesweeper.css'

//easy is 9 9 10

class Minesweeper extends Component {
  constructor() {
    super();
    const gameMode = {
      EASY: [9, 9, 10],
      INTERMEDIATE: [16, 16, 40],
      EXPERT: [16, 30, 99]
    }
    this.state = {...this.getStartingGameState(gameMode.EASY)}
    this.updateBoard = this.updateBoard.bind(this)
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  getStartingGameState(gameMode) {
    let rows = gameMode[0]
    let cols = gameMode[1]
    let mines = gameMode[2]

    const directions = {
      N: [-1, 0],
      NE: [-1, 1],
      E: [0, 1],
      SE: [1, 1],
      S: [1, 0],
      SW: [1, -1],
      W: [0, -1],
      NW: [-1, -1]
    }

    return {
      gameHasStarted: false,
      boardHeight: rows,
      boardWidth: cols,
      mineTotal: mines,
      directions: directions,
      board: [...Array(rows)].map(e => Array(cols).fill('[ ? ]')),
      gameState: [...Array(rows)].map(e => Array(cols).fill(0)),
    }
  }

  updateBoard(cell) {
    if (!this.state.gameHasStarted) {
      this.generateStartingBoard(cell);
    }
    this.incrementDisplayNeighbors(cell, this.state.board, Object.values(this.state.directions))
  }

  generateStartingBoard(clickedCell) {
    this.setState({gameHasStarted: true})

    let row = clickedCell[0]
    let col = clickedCell[1]

    let gameBoard = [...Array(this.state.boardHeight)].map(e => Array(this.state.boardWidth).fill(0))
    

    //Populate Board
    let mineCount = 0
    while (mineCount < this.state.mineTotal) {
      let bomb = this.generateBombPosition();
      let cellIsBomb = clickedCell[0] === bomb[0] && clickedCell[1] === bomb[1]
      if (!cellIsBomb) {
        gameBoard[bomb[0]][bomb[1]] = 'x'
        this.incrementBombNeighbors(bomb, gameBoard, Object.values(this.state.directions))
        mineCount++;
      }
    }

    this.setState({gameState: gameBoard})
  }

  generateBombPosition() {
    let rowPos = this.getRandomInt(this.state.boardHeight)
    let colPos = this.getRandomInt(this.state.boardWidth)
    return [rowPos, colPos]
  }

  incrementBombNeighbors(bomb, board, neighbors) {
    neighbors.forEach((direction) => {
      let dirCell = [bomb[0] + direction[0], bomb[1] + direction[1]]
      if (this.isValidPosition(dirCell) && board[dirCell[0]][dirCell[1]] !== 'x') {
        board[dirCell[0]][dirCell[1]]++;
      }
    })
  }

  incrementDisplayNeighbors(cell, board, neighbors) {
    let gameStateVal = this.state.gameState[cell[0]][cell[1]]

    if (gameStateVal === 0) {
      board[cell[0]][cell[1]] = '[ C ]'
    }
    else if (gameStateVal === 'x') {
      board[cell[0]][cell[1]] = '[ B ]'
    }
    else {
      board[cell[0]][cell[1]] = '[ ' + gameStateVal + ' ]'
    }

    this.setState({board: board})



    // neighbors.forEach((direction) => {
    //   let dirCell = [cell[0] + direction[0], cell[1] + direction[1]]
    //   if (this.isValidPosition(dirCell)) {
    //     let gameStateVal = this.state.gameState[dirCell[0]][dirCell[1]]
    //     if (gameStateVal === '0') {
    //       //recursion?
    //     }
    //     else if (gameStateVal === 'x') {
    //       board[dirCell[0]][dirCell[1]] = '[ B ]'
    //     }
    //     else {
    //       board[dirCell[0]][dirCell[1]] = '[ ' + gameStateVal + ' ]'
    //     }
    //     // if(this.gameState[dirCell[0]][dirCell[1]] == 0) {
    //       // board[dirCell[0]][dirCell[1]] = '[ C ]'
    //     // }
    //   }
    // })
  }

  isValidPosition(cell) {
    let rowCheck = cell[0] >= 0 && cell[0] < this.state.boardHeight
    let colCheck = cell[1] >= 0 && cell[1] < this.state.boardWidth
    return rowCheck && colCheck
  }

  render() {
    console.log("Minesweeper component")
    console.log(this.state)

    let boardDisplay = this.state.board.map((rows, row_idx) => {
      return (
        <div key={row_idx}> 
          {
            rows.map((cell, col_idx) => {
              return(
                <span key={col_idx} onClick={() => this.updateBoard([row_idx, col_idx])}>{cell} </span>
              )
            })
          }
        </div>
      )
    })

    let gameDisplay = this.state.gameState.map((rows, row_idx) => {
      return (
        <div key={row_idx}> 
          {
            rows.map((cell, col_idx) => {
              return(
                <span key={col_idx}>{cell} </span>
              )
            })
          }
        </div>
      )
    })

    return (
      <div className="minesweeper-content">
        <Link to="/">
          Home
        </Link>
        <div>Minesweeper Page</div>
        <div>{boardDisplay}</div>
        <hr/>
        <div>{gameDisplay}</div>
      </div>
    )
  }
}

export default Minesweeper;