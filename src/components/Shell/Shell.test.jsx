import React from 'react';
import renderer from 'react-test-renderer';
import Shell from './Shell';

jest.mock('../App', () => 'App');

describe('Shell', () => {
  it('renders', () => {
    const component = renderer.create(<Shell />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
