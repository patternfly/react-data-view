import React from 'react';
import { DataViewCheckboxFilter, DataViewCheckboxFilterProps } from '@patternfly/react-data-view/dist/dynamic/DataViewCheckboxFilter';
import { DataViewToolbar } from '@patternfly/react-data-view/dist/dynamic/DataViewToolbar';

describe('DataViewCheckboxFilter component', () => {
  const defaultProps: DataViewCheckboxFilterProps = {
    filterId: 'test-checkbox-filter',
    title: 'Test checkbox filter',
    value: [ 'workspace-one' ],
    options: [
      { label: 'Workspace one', value: 'workspace-one' },
      { label: 'Workspace two', value: 'workspace-two' },
      { label: 'Workspace three', value: 'workspace-three' },
    ],
  };

  it('renders a checkbox filter with options', () => {
    const onChange = cy.stub().as('onChange');

    cy.mount(
      <DataViewToolbar filters={<DataViewCheckboxFilter {...defaultProps} onChange={onChange} />} />
    );

    cy.get('[data-ouia-component-id="DataViewCheckboxFilter-toggle"]')
      .contains('Test checkbox filter')
      .should('be.visible');

    cy.get('[data-ouia-component-id="DataViewCheckboxFilter-badge"]')
      .should('exist')
      .contains('1');

    cy.get('[data-ouia-component-id="DataViewCheckboxFilter-toggle"]').click();
    cy.get('[data-ouia-component-id="DataViewCheckboxFilter-menu"]').should('be.visible');

    cy.get('[data-ouia-component-id="DataViewCheckboxFilter-menu"]')
      .find('li')
      .should('have.length', 3)
      .first()
      .contains('Workspace one');

    cy.get('[data-ouia-component-id="DataViewCheckboxFilter-menu"]')
      .find('li')
      .first()
      .find('input[type="checkbox"]')
      .should('be.checked');

    cy.get('[data-ouia-component-id="DataViewCheckboxFilter-menu"]')
      .find('li')
      .eq(1)
      .find('input[type="checkbox"]')
      .click();

    cy.get('@onChange').should('have.been.calledWith', Cypress.sinon.match.object, [ 'workspace-two', 'workspace-one' ]);
  });

  it('renders a checkbox filter with no options selected', () => {
    const emptyProps = { ...defaultProps, value: [] };

    cy.mount(
      <DataViewToolbar filters={<DataViewCheckboxFilter {...emptyProps} />} />
    );

    cy.get('[data-ouia-component-id="DataViewCheckboxFilter-toggle"]').contains('Test checkbox filter');
    cy.get('[data-ouia-component-id="DataViewCheckboxFilter-badge"]').should('not.exist');
  });
});
