import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


// for implementing single cell
function GridCell(props) {
  const classes = `grid-cell 
${props.ratCell ? "grid-cell--rat" : ""} 
${props.snakeCell ? "grid-cell--snake" : ""}
`;
return (
    <div
      className={classes}
      style={{ height: props.size + "px", width: props.size + "px" }}
      />
  );
}

function arrayDiff(arr1, arr2){
  return arr1.map((a, i)=>{ 
    return a - arr2[i]
  })
}

function shallowEquals(arr1, arr2) {
  if (!arr1 || !arr2 || arr1.length !== arr2.length) return false;
  let equals = true;
  for (var i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) equals = false;
  }
  return equals;
}

// the main view
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      snake: [],
      rat: [],
      // 0 = not started, 1 = in progress, 2= finished
      status: 0,
      // using keycodes to indicate direction
      direction: 39
    };
    
    this.SnakeonProwl = this.SnakeonProwl.bind(this);
    this.doesntOverlap = this.doesntOverlap.bind(this);
    this.setDirection = this.setDirection.bind(this);
    this.moveRat = this.moveRat.bind(this);
    this.hadRat = this.hadRat.bind(this);
    this.startGame = this.startGame.bind(this);
    this.endGame = this.endGame.bind(this);    
    this.removeTimers = this.removeTimers.bind(this);
  }
  
  setDirection({ keyCode }) {
    // if it's the same direction or simply reversing, ignore
    let changeDirection = true;
    [[38, 40], [37, 39]].forEach(dir => {
      if (dir.indexOf(this.state.direction) > -1 && dir.indexOf(keyCode) > -1) {
        changeDirection = false;
      }
    });

    if (changeDirection) this.setState({ direction: keyCode });
  }
  
  // randomly place rat
  moveRat() {
    if (this.moveRatTimeout) clearTimeout(this.moveRatTimeout)
    const x = parseInt(Math.random() * this.numCells);
    const y = parseInt(Math.random() * this.numCells);
    this.setState({ rat: [x, y] });
    this.moveRatTimeout = setTimeout(this.moveRat, 5000)
  }
  
  // is the cell's position inside the grid?
  isValid(cell) {
    return (
      cell[0] > -1 &&
      cell[1] > -1 &&
      cell[0] < this.numCells &&
      cell[1] < this.numCells
    );
  }

  SnakeonProwl() {
    const newSnake = [];
    // set in the new "head" of the snake    
    switch(this.state.direction) {
        // down
      case 40:
        newSnake[0] = [this.state.snake[0][0], this.state.snake[0][1] + 1];
        break;
        // up
      case 38:
        newSnake[0] = [this.state.snake[0][0], this.state.snake[0][1] - 1];
        break;
        // right
      case 39:
        newSnake[0] = [this.state.snake[0][0] + 1, this.state.snake[0][1]];
        break;
        // left
      case 37:
        newSnake[0] = [this.state.snake[0][0] - 1, this.state.snake[0][1]];
        break;
      default:
        // do nothing
                                }
    // now shift each "body" segment to the previous segment's position
    [].push.apply(
      newSnake,
      this.state.snake.slice(1).map((s, i) => {
        // by slicing make a copy and map it
        return this.state.snake[i];
      })
    );

    this.setState({ snake: newSnake });

    this.hadRat(newSnake);
    if (!this.isValid(newSnake[0]) || !this.doesntOverlap(newSnake)) {
      // end the game
      this.endGame()
    } 
  }

  hadRat(newSnake) {
    if (!shallowEquals(newSnake[0], this.state.rat)) return
      // snake gets longer
      let newSnakeSegment;
      const lastSegment = newSnake[newSnake.length - 1];

      // some potential positions, we can choose the best looking one
      let lastPositionOptions = [[-1, 0], [0, -1], [1, 0], [0, 1]];
      
      // the snake is moving along the y-axis, so try that instead
      if ( newSnake.length > 1 ) {
        lastPositionOptions[0] = arrayDiff(lastSegment, newSnake[newSnake.length - 2]);
      }

      for (var i = 0; i < lastPositionOptions.length; i++) {
        newSnakeSegment = [
          lastSegment[0] + lastPositionOptions[i][0],
          lastSegment[1] + lastPositionOptions[i][1]
        ];
        if (this.isValid(newSnakeSegment)) {
          break;
        }
      }

      this.setState({
        snake: newSnake.concat([newSnakeSegment]),
        rat: []
      });
    this.moveRat();
  }

  doesntOverlap(snake) {
    return (
      snake.slice(1).filter(c => {
        return shallowEquals(snake[0], c);
      }).length === 0
    );
  }

  startGame() {
    this.removeTimers();
    this.SnakeonProwlInterval = setInterval(this.SnakeonProwl, 150);
    this.moveRat();

    this.setState({
      status: 1,
      snake: [[5, 5]],
      rat: [10, 10]
    });
    //need to focus so keydown listener will work!
    this.el.focus();
  }
  
  endGame(){
    this.removeTimers();
    this.setState({
      status : 2
    })
  }

  removeTimers() {
    if (this.SnakeonProwlInterval) clearInterval(this.SnakeonProwlInterval);
    if (this.moveRatTimeout) clearTimeout(this.moveRatTimeout)
  }

  componentWillUnmount() {
    this.removeTimers();
  }

  render() {
    // each cell should be approximately 15px wide, so calculate how many we need
    this.numCells = Math.floor(this.props.size / 15);
    const cellSize = this.props.size / this.numCells;
    const cellIndexes = Array.from(Array(this.numCells).keys());
    const cells = cellIndexes.map(y => {
      return cellIndexes.map(x => {
        const ratCell = this.state.rat[0] === x && this.state.rat[1] === y;
        let snakeCell = this.state.snake.filter(c => c[0] === x && c[1] === y);
        snakeCell = snakeCell.length && snakeCell[0];

        return (
          <GridCell
            ratCell={ratCell}
            snakeCell={snakeCell}
            size={cellSize}
            key={x + " " + y}
            />
        );
      });
    });

    let overlay;
    if (this.state.status === 0) {
      overlay = (
        <div className="snake-app__overlay">
          <button onClick={this.startGame}>Start game!</button>
        </div>
      );
    } else if (this.state.status === 2) {
      overlay = (
        <div className="snake-app__overlay">
          <div className="mb-1"><b>GAME OVER!</b></div>
          <div className="mb-1">Your score: {this.state.snake.length} </div>
          <button onClick={this.startGame}>Start a new game</button>
        </div>
      );
    }
    return (
      <div
        className="snake-app"
        onKeyDown={this.setDirection}
        style={{
          width: this.props.size + "px",
            height: this.props.size + "px"
        }}
        ref={el => (this.el = el)}
        tabIndex={-1}
        >
        {overlay}
        <div
          className="grid"
          style={{
            width: this.props.size + "px",
              height: this.props.size + "px"
          }}
          >
          {cells}
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App size={350} />, document.getElementById("root"));