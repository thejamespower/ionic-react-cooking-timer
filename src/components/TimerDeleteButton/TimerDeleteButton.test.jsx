import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import Button from '@material-ui/core/Button/Button';

import TimerDeleteButton from './TimerDeleteButton';

describe('TimerDeleteButton', () => {
  let props;

  beforeEach(() => {
    props = {
      active: false,
      complete: false,
      superTimerActive: false,
      deleteTimer: () => null,
      id: 'test',
    };
  });

  describe('render', () => {
    it('renders default state', () => {
      const component = renderer.create(<TimerDeleteButton {...props} />);
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('renders active state', () => {
      props.active = true;

      const component = renderer.create(<TimerDeleteButton {...props} />);
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('renders complete state', () => {
      props.complete = true;

      const component = renderer.create(<TimerDeleteButton {...props} />);
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('renders superTimerActive state', () => {
      props.superTimerActive = true;

      const component = renderer.create(<TimerDeleteButton {...props} />);
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('behaviour', () => {
    it('handles button click', () => {
      props.deleteTimer = jest.fn();

      const wrapper = shallow(<TimerDeleteButton {...props} />);
      const button = wrapper.find(Button);
      button.prop('onClick')();

      expect(props.deleteTimer).toHaveBeenCalledWith(props.id);
    });
  });
});
