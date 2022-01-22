import React from 'react';
import renderer from 'react-test-renderer';
import { mount, shallow } from 'enzyme';
import Countdown from 'react-countdown-now';
import Timer from './Timer';

jest.mock('../TimerDeleteButton', () => () => 'TimerDeleteButton');

describe('Timer', () => {
  let props;

  beforeEach(() => {
    props = {
      timer: {
        id: 'test',
        duration: '00:00:00',
        durationInSeconds: 0,
        name: '',
        active: false,
        timeToStart: '00:00:00',
        timeToStartInSeconds: 0,
        complete: false,
      },
      completeTimer: () => null,
      superTimerActive: false,
    };
  });

  describe('render', () => {
    it('renders default state', () => {
      const component = renderer.create(<Timer {...props} />);
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('renders active state', () => {
      props.timer = {
        ...props.timer,
        active: true,
        duration: '00:00:01',
        durationInSeconds: 1,
      };

      const component = renderer.create(<Timer {...props} />);
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('renders complete state', () => {
      props.timer = {
        ...props.timer,
        active: false,
        complete: true,
      };

      const component = renderer.create(<Timer {...props} />);
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('behaviour', () => {
    it('handles timer completion', () => {
      props.timer.active = true;
      props.completeTimer = jest.fn();

      const wrapper = mount(<Timer {...props} />);
      const countdown = wrapper.find(Countdown);
      countdown.prop('onComplete')();

      expect(props.completeTimer).toHaveBeenCalledWith(props.timer.id);
    });

    it('updates if active changes', () => {
      const wrapper = shallow(<Timer {...props} />);
      const nextProps = {
        ...props,
        timer: {
          ...props.timer,
          active: true,
        },
      };
      const shouldUpdate = wrapper.instance().shouldComponentUpdate(nextProps);
      expect(shouldUpdate).toBe(true);
    });

    it('updates if timeToStart changes', () => {
      const wrapper = shallow(<Timer {...props} />);
      const nextProps = {
        ...props,
        timer: {
          ...props.timer,
          timeToStart: '00:00:01',
        },
      };
      const shouldUpdate = wrapper.instance().shouldComponentUpdate(nextProps);
      expect(shouldUpdate).toBe(true);
    });
  });
});
