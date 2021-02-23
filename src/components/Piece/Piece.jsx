import React from 'react';
import './Piece.css';
import Draggable from 'react-draggable';

class Piece extends React.Component{
    render(){
        return(
            <Draggable position={this.props.puzzlePiece} onDrag={this.props.handleDrag} onStop={this.props.onStop} onStart={() => this.props.puzzlePiece.drag}>
            <div className="puzzle-piece" id={this.props.id} 
            style={{position: 'absolute', top: 0, left: 0}}>
              <div>Puzzle Piece {this.props.id}</div>
              <div>x: {this.props.puzzlePiece.x.toFixed(0)} y: {this.props.puzzlePiece.y.toFixed(0)}</div>
              <div>Final: {this.props.puzzlePiece.finalX}, {this.props.puzzlePiece.finalY}</div>
            </div>
            </Draggable>

        )
    }
}

export default Piece;



