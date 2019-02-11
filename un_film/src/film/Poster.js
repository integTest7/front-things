import React from 'react'
import PropTypes from 'prop-types'

import Rules from '../gameplay/Rules'

import './Poster.scss'

const Poster = ({ image, feedback, altTitleFilm }) => (
    <div className="picture">
        { feedback === 'hidden' ? <Rules /> : <img src={ image } alt={ altTitleFilm } /> }
    </div>
)

export default Poster

Poster.propTypes = {
    altTitleFilm: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired
}