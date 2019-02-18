import { expect } from 'chai'
import React from 'react'
import { mount, shallow } from 'enzyme'
import sinon from 'sinon'

import App from './App';
import Synopsis from './film/Synopsis';

describe('<App />', () => {

    /* Application tourne sans crasher */
    it('renders without crashing', () => {
        const wrapper = shallow(<App />)
    })
        
    /* Presence du composant GuessCount */
    it('A canvas for game wrong attempt ', () => {
        const wrapper = mount(<App />)
        expect(wrapper).to.have.ref('canvas')
    })
        
    it('Synopsis is declared and receive string', () => {
        const wrapper = shallow(<Synopsis />)
        expect(wrapper.props())
    })
    
})