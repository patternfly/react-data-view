import React from 'react';
import { Pagination } from '@patternfly/react-core';
import { BulkSelect, ResponsiveAction, ResponsiveActions } from '@patternfly/react-component-groups';
import DataViewToolbar from '../../packages/module/dist/dynamic/DataViewToolbar';

describe('DataViewToolbar', () => {
  it('renders the data view toolbar', () => {
    cy.mount(
      <DataViewToolbar
        pagination={<Pagination page={1} perPage={10} />} 
        bulkSelect={
          <BulkSelect
            canSelectAll
            pageCount={5}
            totalCount={10}
            selectedCount={2}
            pageSelected={false}
            pagePartiallySelected={true}
            onSelect={() => null}
          />
        }
        actions={
          <ResponsiveActions breakpoint="lg">
            <ResponsiveAction isPersistent variant="primary">Persistent</ResponsiveAction>
            <ResponsiveAction isPinned variant="secondary">Pinned</ResponsiveAction>
            <ResponsiveAction>Action three</ResponsiveAction>
            <ResponsiveAction>Action four</ResponsiveAction>
          </ResponsiveActions>
        }
      />
    )
    cy.get('[data-ouia-component-id="DataViewToolbar"]').should('exist');
    cy.get('[data-ouia-component-id="DataViewToolbar-pagination"]').should('exist');
    cy.get('[data-ouia-component-id="DataViewToolbar-bulk-select"]').should('exist');
    cy.get('[data-ouia-component-id="ResponsiveActions-menu"]').should('exist');
  });
});
