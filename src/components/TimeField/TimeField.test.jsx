import React from 'react';
import renderer from 'react-test-renderer';
import TimeField from './TimeField';

describe('TimeField', () => {
  const props = {
    onChange: () => null,
    value: '',
  };

  it('renders', () => {
    const component = renderer.create(<TimeField {...props} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
