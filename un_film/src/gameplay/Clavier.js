import React from 'react'
import PropTypes from 'prop-types'

import './Clavier.scss'

const Clavier = ({ letter, onClick }) => (
    <div className="btn-custom">
        <button className={`letter ${letter}`} onClick={() => onClick(letter)}>
            { letter }
        </button>
    </div>
)

Clavier.propTypes = {
    letter: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
}

export default Clavier