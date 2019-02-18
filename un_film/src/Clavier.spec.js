import React from 'react'
import { expect } from 'chai'
import { mount, shallow } from 'enzyme'
import sinon from 'sinon'

import Clavier from './gameplay/Clavier'

describe('<Clavier />', () => {
    it('should triggger its `onClick` prop when clicked', () => {
        const tuClick = sinon.spy()
        const wrapper = shallow(
            <Clavier letter="M" onClick={tuClick} />
        )      
    })
    
    it('should do a snapshot', () => {
        const tuClick = sinon.spy()
        const wrapper = shallow(
            <Clavier letter="M" onClick={tuClick} />
        )
        
        expect(wrapper).to.matchSnapshot()
    })
    
})