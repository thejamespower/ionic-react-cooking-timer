import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import Button from '@material-ui/core/Button';
import TimerCreator from './TimerCreator';
import CustomTimeField from '../TimeField';

jest.mock('uuid/v4', () => () => '1');

describe('TimerCreator', () => {
  let props;
  beforeEach(() => {
    props = {
      createTimer: () => null,
      createSubTimer: () => null,
      name: 'test',
    };
  });

  describe('render', () => {
    it('renders', () => {
      const component = renderer.create(<TimerCreator {...props} />);
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('behaviour', () => {
    it('handles CustomTimeField onChange', () => {
      const duration = '00:00:01';
      const wrapper = shallow(<TimerCreator {...props} />);

      wrapper.instance().handleTimeChange = jest.fn();
      wrapper.instance().setState({ duration });
      const customTimeField = wrapper.find(CustomTimeField);

      customTimeField.prop('onChange')(duration);

      expect(wrapper.instance().handleTimeChange).toHaveBeenCalledWith(
        duration,
      );
    });

    it('handles handleTimeChange', () => {
      const duration = '00:00:01';
      const wrapper = shallow(<TimerCreator {...props} />);

      wrapper.setState({ duration }, () => {
        wrapper.instance().setState = jest.fn();
        wrapper.instance().handleTimeChange(duration);
        expect(wrapper.instance().setState).toHaveBeenCalledWith({ duration });
      });
    });

    it('handles Button onClick', () => {
      const wrapper = shallow(<TimerCreator {...props} />);
      const button = wrapper.find(Button);

      wrapper.instance().handleClick = jest.fn();
      button.prop('onClick')();

      expect(wrapper.instance().handleClick).toHaveBeenCalled();
    });

    it('handles handleClick with invalid duration', () => {
      props.createTimer = jest.fn();
      const wrapper = shallow(<TimerCreator {...props} />);

      wrapper.instance().handleClick();

      expect(props.createTimer).not.toHaveBeenCalled();
    });

    it('handles handleClick with valid duration', () => {
      const duration = '00:00:01';
      props.createTimer = jest.fn();
      const wrapper = shallow(<TimerCreator {...props} />);

      wrapper.setState({ duration }, () => {
        wrapper.instance().handleClick();

        expect(props.createTimer).toHaveBeenCalledWith({
          name: props.name,
          duration,
          id: expect.any(String),
        });
      });
    });
  });
});
