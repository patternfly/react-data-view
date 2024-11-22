import React, { useState } from 'react';
import { DataViewTextFilter } from '@patternfly/react-data-view/dist/dynamic/DataViewTextFilter';
import { DataViewToolbar } from '@patternfly/react-data-view/dist/dynamic/DataViewToolbar';

const defaultProps = {
  filterId: 'name',
  title: 'Name',
  value: '',
  ouiaId: 'DataViewTextFilter',
  placeholder: 'Filter by name'
};

const DataViewToolbarWithState = (props: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
  const [ value, setValue ] = useState('Repository one');

  return (
    <DataViewToolbar clearAllFilters={() => setValue('')}>
      <DataViewTextFilter {...defaultProps} value={value} onChange={() => setValue('')} {...props} />
    </DataViewToolbar>
  );
};

describe('DataViewTextFilter', () => {

  it('renders DataViewTextFilter with correct initial values', () => {
    cy.mount(<DataViewToolbarWithState value="" />);
    cy.get('[data-ouia-component-id="DataViewTextFilter"]').should('exist');
    cy.get('[data-ouia-component-id="DataViewTextFilter-input"] input')
      .should('have.attr', 'placeholder', 'Filter by name')
      .and('have.value', '');
  });

  it('accepts input when passed', () => {
    cy.mount(<DataViewToolbarWithState value="" />);
    cy.get('[data-ouia-component-id="DataViewTextFilter-input"] input')
      .type('Repository one')
      .should('have.value', 'Repository one');
  });

  it('displays a label when value is present and removes it on delete', () => {
    cy.mount(<DataViewToolbarWithState />);
    cy.get('[data-ouia-component-id="DataViewTextFilter-input"] input').should('have.value', 'Repository one');

    cy.get('.pf-v6-c-label__text').contains('Repository one');
    cy.get('.pf-m-label-group button.pf-v6-c-button.pf-m-plain').click();

    cy.get('.pf-v6-c-label__text').should('not.exist');
    cy.get('[data-ouia-component-id="DataViewTextFilter-input"] input').should('have.value', '');
  });

  it('clears input when the clear button is clicked', () => {
    cy.mount(<DataViewToolbarWithState />);
    cy.get('[data-ouia-component-id="DataViewTextFilter-input"] input').should('have.value', 'Repository one');

    cy.get('[data-ouia-component-id="DataViewToolbar-clear-all-filters"]').click();

    cy.get('[data-ouia-component-id="DataViewTextFilter-input"] input').should('have.value', '');
  });

  it('hides or shows the toolbar item based on showToolbarItem prop', () => {
    cy.mount(
      <DataViewToolbar>
        <DataViewTextFilter {...defaultProps} showToolbarItem={false} />
      </DataViewToolbar>
    );
    cy.get('[data-ouia-component-id="DataViewTextFilter"]').should('not.exist');

    cy.mount(
      <DataViewToolbar>
        <DataViewTextFilter {...defaultProps} showToolbarItem />
      </DataViewToolbar>
    );
    cy.get('[data-ouia-component-id="DataViewTextFilter"]').should('exist');
  });
});
