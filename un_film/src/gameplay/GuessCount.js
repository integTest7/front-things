import React from 'react'
import PropTypes from 'prop-types'

import './GuessCount.scss'
import scoreMaxImage from './../images/score-max.png'
import scoreWinImage from './../images/gagne.png'
import scoreLoseImage from './../images/perdu.png'

const GuessCount = ({ guesses, score, winningResult, youLose }) => (
    <div className="guesses">
        <p><span>{ guesses }</span>&nbsp;{ guesses <= 1 ? 'tentative' : 'tentatives' }</p>
        <p>Score :&nbsp;<span>{ score }</span>&nbsp;pts</p>
        <p className={`you-win ${ winningResult }`}>
            { winningResult === "winmax" ? <img src={ scoreMaxImage } alt="Score Maximum" /> : <img src={ scoreWinImage } alt="Gagné" />}
        </p>
        <p className={`you-lose ${ youLose }`}>
            <img src={ scoreLoseImage } alt="Perdu" />
        </p>
    </div>
)

GuessCount.propTypes = {
    guesses: PropTypes.number.isRequired,
    score: PropTypes.number.isRequired,
    winningResult: PropTypes.string.isRequired
}

export default GuessCount