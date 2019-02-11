import React from 'react'
import PropTypes from 'prop-types'

import './Synopsis.scss'

const Synopsis = ({ film }) => (
    <div className="synopsis">
        <h3>Synopsis</h3>
        { film }
    </div>
)

export default Synopsis

Synopsis.propTypes = {
    film: PropTypes.string.isRequired,
}