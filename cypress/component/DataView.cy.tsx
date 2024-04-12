import React from 'react';

describe('DataView', () => {
  it('renders data view', () => {
    cy.mount(<div id="test">Some text</div>);

    cy.get('[id="test"]').should('contain', 'Some text');
  })
})