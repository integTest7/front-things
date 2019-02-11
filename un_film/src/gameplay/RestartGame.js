import React from 'react'
import PropTypes from 'prop-types'

import './RestartGame.scss'

const RestartGame = ({ onClick }) => (
    <div className="restart-container">
        <button onClick={() => onClick()}>
            Recommencer
        </button>
    </div>
)

RestartGame.propTypes = {
    onClick: PropTypes.func.isRequired
}

export default RestartGame