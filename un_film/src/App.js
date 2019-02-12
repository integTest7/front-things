import React, { Component } from 'react';
import shuffle from 'lodash.shuffle'; /* Module de hasard */
import "core-js/fn/symbol/iterator.js"; /* Microsoft Edge Fix */

/* App Stylesheet */
import './App.scss';

/* Pendu - Images */
import erreur1 from './images/erreur_1.jpg'
import erreur2 from './images/erreur_2.jpg'
import erreur3 from './images/erreur_3.jpg'
import erreur4 from './images/erreur_4.jpg'
import erreur5 from './images/erreur_5.jpg'
import erreur6 from './images/erreur_6.jpg'
import erreur7 from './images/erreur_7.jpg'
import erreur8 from './images/erreur_8.jpg'
import erreur9 from './images/erreur_9.jpg'
import erreur10 from './images/erreur_10.jpg'
import erreur11 from './images/erreur_11.jpg'
import erreur12 from './images/erreur_12.jpg'

/* Film - Components */
import Poster from './film/Poster'
import Mot from './film/Mot'
import Synopsis from './film/Synopsis'

/* Gameplay - Components */
import Clavier from './gameplay/Clavier'
import GuessCount from './gameplay/GuessCount'
import RestartGame from './gameplay/RestartGame'
//import Pendu from './gameplay/Pendu'

/* Main Variables */
const API_KEY = "0a80ead2396f043bebacbd87dd476659"
const API_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=fr-FR&primary_release_year=2019`
const SIZE = 1
const buttons = document.getElementsByClassName("letter")
const errorsArray = [erreur1, erreur2, erreur3, erreur4, erreur5, erreur6, erreur7, erreur8, erreur9, erreur10, erreur11, erreur12]


class App extends Component {

    /* State */
    state = {
        words: [],
        letters: this.generateLetters(33,90),
        letterAttempt: [],
        guesses: 0,
        badAttempt: 0,
        score: 0,
        matchedWordsLetters: [],
        altFilmTitle: '',
        filmImage: '',
        filmOverview: '',
        display: 'hidden'        
    }

    /*****************************/
    /********  Generation ********/
    /*****************************/
    
    /* AJAX GET pour parser l'URL de l'API */
    getApi(url) {
        return new Promise(function(resolve, reject) { 
            let request = new XMLHttpRequest();
            request.open("GET", url);
            
            request.onload = function() {
                if(request.status === 200) {
                    resolve(request.responseText)
                } else {
                    reject(request.statusText)
                }
            };            
            request.onerror = function() {
                reject(Error("Erreur Serveur"));
            };            
            request.send();        
        });
    }

    /* Génération aléatoire du mot à trouver */
    generateWords() {
        
        this.getApi(API_URL).then(function(reponse){
            
            const resultatApi = JSON.parse(reponse).results
            
            /* Tirage aléatoire du film à trouver */
            const chosenFilm = []
            const candidateFilm = shuffle(resultatApi);
            /* Boucle pour Tant que le tableau est inf à SIZE */
            while(chosenFilm.length < SIZE) {
                const film = candidateFilm.pop();
                /* Push du mot dans le tableau (MAJUSCULE) */
                chosenFilm.push(film);
            }

            const filmTitle = chosenFilm[0].title.toUpperCase()
            
            /* Traitement du titre du film à deviner */
            if(typeof filmTitle === "string") {
                /* Suppression de tout accent */
                const normalizedFilmTitle = filmTitle.normalize('NFD').replace(/[\u0300-\u036f]/g, "")
                /* Transformation en Array */
                const arrayFilmTitle = normalizedFilmTitle.split("")
                /* Set State - Titre du film, Affiche du film (+ alt), Description du film -> AVANT LE 1ER RENDER */
                return this.setState({ 
                    words: arrayFilmTitle, 
                    altFilmTitle: chosenFilm[0].title,
                    filmImage: `https://image.tmdb.org/t/p/w300_and_h450_bestv2/${chosenFilm[0].poster_path}`,
                    filmOverview: chosenFilm[0].overview
                })
            }

        }.bind(this),
            function(error){
                console.log("Failed", error)
            }
        )
        
    }

    /* Génération des caractères */
    generateLetters(charA, charZ) {
        let lettersArray = [];
        let splitedLetters = [];
        let i = charA;
        let j = charZ;

        for(; i <= j; i++) {
            lettersArray.push(String.fromCharCode(i));
        }        
        for(let n = 0; n <= lettersArray.length - 1; n++) {
            splitedLetters.push(lettersArray[n]);
        }
        return splitedLetters;
    };


    /*****************************/
    /******   PlayThrough   ******/
    /*****************************/

    /* Traitement des tentatives + gestion du score + gestion des caractères (clavier) */
    handleNewPairClosedBy(pLetter) {
        const { words, guesses, badAttempt, score, matchedWordsLetters } = this.state
        
        const matched = words.includes(pLetter)
        const newLetter = [pLetter]
        this.setState({ letterAttempt: newLetter }) 
        
        const buttons = document.getElementsByClassName(pLetter)
        const checkButtonAttr = buttons[0].getAttribute("disabled")
        
        if (matched) {
            this.setState({ matchedWordsLetters: [...matchedWordsLetters, ...newLetter] })
            
            /* Désactivation des touches trouvées */
            if(!checkButtonAttr) {
                buttons[0].setAttribute("disabled", "true")
                this.setState({ guesses: guesses + 1, score: score + 2 })
            }            
        } else {
            
            /* Désactivation des touches tentées */
            if(!checkButtonAttr) {
                buttons[0].setAttribute("disabled", "true")
                this.setState({ guesses: guesses + 1, score: score - 1, badAttempt: badAttempt + 1 })
                
                /* Dessine le pendu dans le canvas */
                this.drawHandler()
            }            
        }        
    }

    /* Visibilité des caractères composant le mot */
    getFeedbackForWord(pWord) {
        const { letterAttempt, matchedWordsLetters } = this.state
        const indexMatched = matchedWordsLetters.includes(pWord)
        
        if (letterAttempt.includes(pWord)) {
            return indexMatched ? 'justMatched' : 'justMismatched'
        }
        
        return indexMatched ? 'visible' : 'hidden'
    }

    /* Gestion du Pendu */
    drawImage = (pImg) => {
        const usedCanvas = this.refs.canvas
        const context = usedCanvas.getContext("2d");
        var errorImage = new Image()
        errorImage.src = pImg
        errorImage.onload = function() {            
            usedCanvas.width = errorImage.width;
            usedCanvas.height = errorImage.height;
            context.drawImage(errorImage, 0, 0, errorImage.width, errorImage.height, 0, 0, errorImage.width, errorImage.height);            
        }        
    }

    drawHandler() {
        const { badAttempt } = this.state        
        badAttempt > 0 && this.drawImage(errorsArray[badAttempt])
    }

    clearCanvas() {
        const usedCanvas = this.refs.canvas
        const context = usedCanvas.getContext("2d");
        context.clearRect(0, 0,  usedCanvas.width, usedCanvas.height);
    }

    winningResult() {
        const{ guesses, badAttempt, score } = this.state        
        /* Délivré de la pendaison */
        badAttempt > 6 && this.drawImage(erreur6)
        
        /* Gestion de l'image de victoire à afficher */
        const isScoreMax = score === (guesses * 2)        
        return isScoreMax ? 'winmax' : 'win'
    }

    /* Redemarrage du jeu - Reactivation clavier - Reset du Canvas */
    restartGame = () => (
        [this.setState({ words: [this.generateWords()], letterAttempt: [], guesses: 0, badAttempt: 0, score: 0, matchedWordsLetters: [] }), this.keyboardBeginGame(), this.clearCanvas()]
    )


    /*****************************/
    /********    Events   ********/
    /*****************************/

    /* Gestion du Click */
    handleLetterClick = (pLetter) => {
        this.handleNewPairClosedBy(pLetter)
    }
    
    /* Gestion des touches claviers (! à Z) */
    generateKeyboard = (event) => {
        const { letters } = this.state;
        let index = letters.indexOf(event.key.toUpperCase());
        
        if(index !== -1) {
            this.handleNewPairClosedBy(event.key.toUpperCase())
        }
    }
    
    /* Gestion du clavier (début et fin de jeu) */
    keyboardBeginGame() {
        for(let button of buttons) {
            if(button.getAttribute("disabled")) {
                button.removeAttribute("disabled")
            }
        }
    }

    keyboardEndGame() {        
        for(let button of buttons) {
            if(!button.getAttribute("disabled")) {
                button.setAttribute("disabled","true")
            }
        }
    }


    /*****************************/
    /******** Life Cycles ********/
    /*****************************/
    
    /* Génération des données AVANT LE PREMIER RENDER */
    componentWillMount() {
        this.generateWords()
    }

    componentDidMount() {
        document.addEventListener("keypress", this.generateKeyboard, false);
    }

    componentWillUnmount() {
        document.removeEventListener("keypress", this.generateKeyboard, false);
    }


    /*****************************/
    /******    Array Fill   ******/
    /*****************************/

    /* Remplissage pour comparaison */
    fillArray(arr1, arr2) {
        const { words } = this.state
        const finalArray = [];
        
        /* Gestion et push des espaces dans le titre du film */
        if(arr1.indexOf(" ") > -1) {
            const spaceIn = words.filter(word => word === " ");
            for(var i = 0; i < spaceIn.length; i++) {
                finalArray.push(" ")
            }
        }
        
        arr1.forEach((e1) => arr2.forEach((e2) => {
            if ((e1 === e2) && !finalArray.includes(e1)) {
                /* compteur de présence du caractère */
                var count = 0;
                for(var i = 0; i < words.length; ++i){
                    if(words[i] === e2){
                        count++;
                    }
                }                
                /* Pousse le caractère autant de fois que présente dans le mot */
                for(var j = 0; j < count; j++) {
                    finalArray.push(e1);
                }                
            }            
        }));
        
        return finalArray;
    }
    
  render() {
    
    /* Déclaration de " l'état " des States */
    const { words, letters, guesses, badAttempt, score, matchedWordsLetters, altFilmTitle, filmImage, filmOverview, display } = this.state

    /* Passage de finalArray */
    const finalMatch = this.fillArray(words, matchedWordsLetters)

    /* Si Tableau deviné === mot à trouver */
    const won = finalMatch.length === words.length
    const lose = badAttempt === errorsArray.length
      
    /* Désactivation des touches/tentatives supp */
    won && this.keyboardEndGame()
    lose && this.keyboardEndGame()

    return (

        <div className="un-pendu">
            
            <div className="film-container">                
                <div className="left">
                    <Poster 
                        feedback={!won && display}
                        altTitleFilm={ altFilmTitle }
                        image={ filmImage }
                    /> 
                </div>
                <div className="right">
                    <Synopsis film={ filmOverview } />
                    <div className="letters-container">
                        {letters.map((letter, index) => (
                            <Clavier
                                letter={letter}
                                index={index}
                                key={index}
                                onClick={this.handleLetterClick}
                            />
                        ))}
                    </div>                    
                    <GuessCount
                        guesses={guesses}
                        score={score}
                        winningResult={won ? this.winningResult() : 'hidden' }
                        youLose={lose ? 'visible' : 'hidden' }
                    />                    
                </div>
                <div className="gradient-line"></div>
                <div className="titre">
                    {words.map((word, index) => (
                        <Mot
                            word={word}
                            feedback={this.getFeedbackForWord(word)}
                            index={index}
                            key={index}
                        />
                    ))}
                </div>

                {won && <RestartGame onClick={this.restartGame} /> }
                {lose && <RestartGame onClick={this.restartGame} /> }
                
            </div>
            <div className="draw-container">
                <canvas ref="canvas"></canvas>
                <span>This product uses the TMDb API but is not endorsed or certified by TMDb.</span>
                <span>&copy; Author <a href="https://github.com/integTest7" target="_blank" rel="noopener noreferrer">integTest7</a> realised with <a href="https://reactjs.org/"  target="_blank" rel="noopener noreferrer">React</a></span>
            </div>
        </div>
    );
  }
}

export default App;
