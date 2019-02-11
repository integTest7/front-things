import React from 'react'
import PropTypes from 'prop-types'
import './Mot.scss'

const HIDDEN_SYMBOL = '_'

const Mot = ({ word, feedback }) => (
    <div className={`word ${feedback}`} data-misc={`${word === " " ? "space" : "" }`}>
        <span className="symbol">
            { feedback === 'hidden' ? HIDDEN_SYMBOL : word }
        </span>
    </div>
)

Mot.propTypes = {
    word: PropTypes.string.isRequired,
    feedback: PropTypes.oneOf([
        'hidden',
        'justMatched',
        'justMismatched',
        'visible'
    ]).isRequired,
}

export default Mot