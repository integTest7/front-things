import React, { Component } from 'react'
//import { drawHandler } from './App'
//import PropTypes from 'prop-types'

import './Pendu.scss'

class Pendu extends Component {

    /* Gestion du Pendu */    
    drawImage (moveToX, moveToY, lineToX, lineToY) {
//        console.log(moveToX, moveToY, lineToX, lineToY)
        const c = this.refs.canvas
        var ctx = c.getContext("2d");
        ctx.moveTo(moveToX, moveToY);
        ctx.lineTo(lineToX, lineToY);
        ctx.stroke();
    }

    drawHandler() {
        this.drawImage(150, 130, 250, 130)
    }
    
    componentDidMount() {
        this.drawHandler()
    }

    render() {
        return (
            <canvas ref="canvas"></canvas>
        )
    }
    
}

//const Pendu = ({ drawHandler }) => (
//
////    <canvas ref="canvas"></canvas>
//    <div className="canvas-test">{ drawHandler }</div>
//            
//)

export default Pendu