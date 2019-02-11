import React from 'react'

import './Rules.scss'

import Hidden from './../images/hidden.png'

const Rules = () => (
        <div className="rules">
            <img src={ Hidden } alt="Film à deviner" />
        
            <h4>Règles du jeu : </h4>
            <ul>
                <li>Trouver le titre du film en moins tentative possible</li>
                <li>Une lettre découverte : <strong>+2pts</strong></li>
                <li>Tentative échouée : <strong>-1pt</strong></li>
                <li>Bonne chance !</li>
            </ul>
        </div>
)

export default Rules