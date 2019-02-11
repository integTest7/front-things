import React, { Component } from 'react'
//import { drawHandler } from './App'
//import PropTypes from 'prop-types'

import './Pendu.scss'

class Pendu extends Component {

    /* Gestion du Pendu */    
    drawImage (moveToX, moveToY, lineToX, lineToY) {
//        console.log(moveToX, moveToY, lineToX, lineToY)
        const c = this.refs.canvas
//        console.log(c)
        var ctx = c.getContext("2d");
        ctx.moveTo(moveToX, moveToY);
        ctx.lineTo(lineToX, lineToY);
        ctx.stroke();
    }

    drawHandler() {
        console.log("Boum")
//        const { badAttempt } = this.state
//        const drawArray = []
//        badAttempt === 1 && drawArray.push(150, 130, 250, 130)
//        console.log(drawArray)
//        return this.drawImage(...drawArray)
//        return drawArray
//        badAttempt === 1 && this.drawImage(150, 130, 250, 130)
//        badAttempt === 2 && this.drawImage(200, 130, 200, 20)
//        badAttempt === 3 && this.drawImage(200, 20, 130, 20)
//        badAttempt === 4 && this.drawImage(130, 20, 130, 40)
//        badAttempt === 5 && this.drawImage(150, 130, 250, 130)
//        badAttempt === 6 && this.drawImage(130, 60, 130, 90)
//        badAttempt === 7 && this.drawImage(130, 65, 120, 90)
//        badAttempt === 8 && this.drawImage(130, 65, 140, 90)
//        badAttempt === 9 && this.drawImage(130, 90, 120, 120)
//        badAttempt === 10 && this.drawImage(130, 90, 140, 120)
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