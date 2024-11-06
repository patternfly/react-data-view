import React from 'react';
import { useDataViewFilters } from '@patternfly/react-data-view/dist/dynamic/Hooks';
import { DataViewFilters } from '@patternfly/react-data-view/dist/dynamic/DataViewFilters';
import { DataViewTextFilter } from '@patternfly/react-data-view/dist/dynamic/DataViewTextFilter';
import { DataViewToolbar } from '@patternfly/react-data-view/dist/esm/DataViewToolbar';
import { FilterIcon } from '@patternfly/react-icons';

const filtersProps = {
  ouiaId: 'DataViewFilters',
  toggleIcon: <FilterIcon />,
  values: { name: '', branch: '' }
};

interface RepositoryFilters {
  name: string,
  branch: string
};

const DataViewToolbarWithState = (props: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
  const { filters, onSetFilters, clearAllFilters } = useDataViewFilters<RepositoryFilters>({ initialFilters: { name: '', branch: '' } });

  return (
    <DataViewToolbar
      ouiaId='FiltersExampleHeader'
      clearAllFilters = {clearAllFilters}
      filters={ 
        <DataViewFilters {...filtersProps} onChange={(_e, values) => onSetFilters(values)} values={filters} {...props}>
          <DataViewTextFilter filterId="name" title='Name' placeholder='Filter by name' />
          <DataViewTextFilter filterId="branch" title='Branch' placeholder='Filter by branch' />
        </DataViewFilters>
      }
    />
  );
};

describe('DataViewFilters', () => {
  it('renders DataViewFilters with menu and filter items', () => {
    cy.mount(<DataViewToolbarWithState />);
    cy.get('[data-ouia-component-id="DataViewFilters"]').should('exist');
    cy.get('[data-ouia-component-id="DataViewFilters"] .pf-v5-c-menu-toggle').click();

    cy.contains('Name').should('exist');
    cy.contains('Branch').should('exist');
  });

  it('can select a filter option', () => {
    cy.mount(<DataViewToolbarWithState />);
    cy.get('[data-ouia-component-id="DataViewFilters"]').should('contain.text', 'Name');
    cy.get('[data-ouia-component-id="DataViewFilters"] .pf-v5-c-menu-toggle').click();
    cy.contains('Branch').click();

    cy.get('[data-ouia-component-id="DataViewFilters"]').should('contain.text', 'Branch');
  });

  it('responds to input and clears the filters', () => {
    cy.mount(<DataViewToolbarWithState />);
    cy.get('[data-ouia-component-id="DataViewFilters"] .pf-v5-c-menu-toggle').click();
    cy.contains('Name').click();

    cy.get('input[placeholder="Filter by name"]').type('Repository one');
    cy.get('.pf-v5-c-chip__text').should('have.length', 1);
    cy.get('input[placeholder="Filter by name"]').clear();
    cy.get('.pf-v5-c-chip__text').should('have.length', 0);
  });

  it('displays chips for selected filters', () => {
    cy.mount(<DataViewToolbarWithState />);
    cy.get('[data-ouia-component-id="DataViewFilters"] .pf-v5-c-menu-toggle').click();
    cy.contains('Name').click();
    cy.get('input[placeholder="Filter by name"]').type('Repository one');

    cy.get('[data-ouia-component-id="DataViewFilters"] .pf-v5-c-menu-toggle').click();
    cy.contains('Branch').click();
    cy.get('input[placeholder="Filter by branch"]').type('Main branch');

    cy.get('.pf-v5-c-chip__text').should('have.length', 2);
    cy.get('.pf-v5-c-chip__text').eq(0).should('contain.text', 'Repository one');
    cy.get('.pf-v5-c-chip__text').eq(1).should('contain.text', 'Main branch');
  });

  it('removes filters by clicking individual chips', () => {
    cy.mount(<DataViewToolbarWithState />);
    cy.get('[data-ouia-component-id="DataViewFilters"] .pf-v5-c-menu-toggle').click();
    cy.contains('Name').click();
    cy.get('input[placeholder="Filter by name"]').type('Repository one');

    cy.get('[data-ouia-component-id="DataViewFilters"] .pf-v5-c-menu-toggle').click();
    cy.contains('Branch').click();
    cy.get('input[placeholder="Filter by branch"]').type('Main branch');

    cy.get('[data-ouia-component-id="close"]').should('have.length', 2);

    cy.get('[data-ouia-component-id="close"]').first().click();
    cy.get('[data-ouia-component-id="close"]').last().click();

    cy.get('[data-ouia-component-id="close"]').should('have.length', 0);
  });

  it('clears all filters using the clear-all button', () => {
    cy.mount(<DataViewToolbarWithState />);
    cy.get('[data-ouia-component-id="DataViewFilters"] .pf-v5-c-menu-toggle').click();
    cy.contains('Name').click();
    cy.get('input[placeholder="Filter by name"]').type('Repository one');

    cy.get('[data-ouia-component-id="DataViewFilters"] .pf-v5-c-menu-toggle').click();
    cy.contains('Branch').click();
    cy.get('input[placeholder="Filter by branch"]').type('Main branch');

    cy.get('[data-ouia-component-id="FiltersExampleHeader-clear-all-filters"]').should('exist').click();
  });
});
