import React from 'react'
import Adapter from 'enzyme-adapter-react-16' /*  */
import chai from 'chai' /* Utilisation de l'assertion (expect()) de Chai */
import dirtyChai from 'dirty-chai' /* Transforme les accesseurs en méthodes => si faute de frappe => is not defined*/
import createChaiJestDiff from 'chai-jest-diff' /* Plugin de diff en cas d'inégalité structurelle */
import { configure as configureEnzyme } from 'enzyme' /* Configuration des tests de composants en isolation */
import createChaiEnzyme from 'chai-enzyme' /* Adaptateur Enzyme pour Chai */
import sinonChai from 'sinon-chai' /* Simulation d'évènements */
import createJestSnapshot from 'chai-jest-snapshot' /* "Photo" d'un morceau de code */
import enzymeToJSON from 'enzyme-to-json/serializer'

chai
    .use(dirtyChai)
    .use(createChaiJestDiff())
    .use(createJestSnapshot)
    .use(createChaiEnzyme())
    .use(sinonChai)

configureEnzyme({ adapter: new Adapter() })
expect.addSnapshotSerializer(enzymeToJSON)