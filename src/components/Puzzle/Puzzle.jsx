import React from 'react';
import './Puzzle.css';
import Draggable from 'react-draggable';

class Puzzle extends React.Component {
    constructor() {
        super();
        this.state = {
            activeDrags: 0,
            puzzlePiece: [
                {x: 0, y: 0, drag: true, finalX: 100, finalY: 200}, 
                {x: 0, y: 0, drag: true, finalX: 200, finalY: 200},
                {x: 0, y: 0, drag: true, finalX: 100, finalY: 300},
                {x: 0, y: 0, drag: true, finalX: 200, finalY: 300},
            ],
        };
    }

    onStart = () => {
        this.setState({activeDrags: ++this.state.activeDrags});
      };
    
      onStop = (e, ui) => {
        this.setState({activeDrags: --this.state.activeDrags});
        this.checkPlacement(ui.node.id)
      };

      checkPlacement =(p) => {
        const T = 10 //set tolerance in pixels
        if (this.state.puzzlePiece[p].x < this.state.puzzlePiece[p].finalX + T && this.state.puzzlePiece[p].x > this.state.puzzlePiece[p].finalX - T) {
          if (this.state.puzzlePiece[p].y < this.state.puzzlePiece[p].finalY + T && this.state.puzzlePiece[p].y > this.state.puzzlePiece[p].finalY - T) {
            let newPuzzlePiece = this.state.puzzlePiece
            newPuzzlePiece[p] = {...this.state.puzzlePiece[p], x: this.state.puzzlePiece[p].finalX, y: this.state.puzzlePiece[p].finalY, drag: false}
            this.setState({ puzzlePiece: newPuzzlePiece })
          }
        }
      }

    handleDrag = (e, ui) => {
        const i = ui.node.id
        let newPuzzlePiece = this.state.puzzlePiece
        newPuzzlePiece[i] = {...this.state.puzzlePiece[i],
        x: ui.x,
        y: ui.y}
        this.setState({
            puzzlePiece : newPuzzlePiece
    });
  };

  render(){
      const board = {x: "200px", y: "100px", size: "200px"};
      return(
        <div>
          <Draggable onStart={() => false}>
              <div className="board"
              style={{position: 'absolute', top: board.x, left: board.y, backgroundColor: 'red', width: board.size, height: board.size}}>Puzzle Board</div>
          </Draggable >
          <PuzzlePiece />
        </div>
        
      )

  }
}

export default Puzzle;