import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import DataView from './DataView';

describe('DataView', () => {

  it('should render data view', () => {
    render(<DataView />);
    expect(screen.getByText('This is Data view')).toBeInTheDocument();
  });

});
