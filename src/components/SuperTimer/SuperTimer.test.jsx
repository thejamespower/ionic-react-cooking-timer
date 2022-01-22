import React from 'react';
import renderer from 'react-test-renderer';
import { mount, shallow } from 'enzyme';
import Button from '@material-ui/core/Button/Button';
import Countdown from 'react-countdown-now';
import SuperTimer from './SuperTimer';

describe('SuperTimer', () => {
  let props;

  beforeEach(() => {
    props = {
      superTimer: {
        duration: '00:00:00',
        durationInSeconds: 0,
        active: false,
        currentCount: null,
        elapsedTime: 0,
        complete: false,
      },
      startSuperTimer: () => null,
      tickSuperTimer: () => null,
      completeSuperTimer: () => null,
    };
  });

  describe('render', () => {
    it('renders default state', () => {
      const component = renderer.create(<SuperTimer {...props} />);
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('renders duration state', () => {
      props.superTimer.duration = '00:00:01';

      const component = renderer.create(<SuperTimer {...props} />);
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('renders active state', () => {
      props.superTimer.active = true;

      const component = renderer.create(<SuperTimer {...props} />);
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('renders complete state', () => {
      props.superTimer.complete = true;

      const component = renderer.create(<SuperTimer {...props} />);
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('behaviour', () => {
    it('handles Button onClick', () => {
      const wrapper = shallow(<SuperTimer {...props} />);
      const button = wrapper.find(Button);

      wrapper.instance().handleSubmitClick = jest.fn();
      button.prop('onClick')();

      expect(wrapper.instance().handleSubmitClick).toHaveBeenCalled();
    });

    it('handles invalid handleSubmitClick', () => {
      props.startSuperTimer = jest.fn();
      const wrapper = shallow(<SuperTimer {...props} />);
      wrapper.instance().handleSubmitClick();

      expect(props.startSuperTimer).not.toHaveBeenCalled();
    });

    it('handles valid handleSubmitClick', () => {
      props.superTimer.durationInSeconds = 1;
      props.superTimer.duration = '00:00:01';
      props.startSuperTimer = jest.fn();
      const wrapper = shallow(<SuperTimer {...props} />);
      wrapper.instance().handleSubmitClick();

      expect(props.startSuperTimer).toHaveBeenCalled();
    });

    // it('handles Countdown onTick', () => {
    //   props.superTimer.active = true
    //   props.superTimer.duration = '00:00:01'
    //   const wrapper = shallow(<SuperTimer {...props} />)
    //   const countdown = wrapper.find(Countdown)
    //
    //   wrapper.instance().handleTick = jest.fn()
    //   countdown.prop('onTick')({ total: 1000 })
    //
    //
    //   expect(wrapper.instance().handleTick).toHaveBeenCalledWith({ total: 1000 })
    // })

    // it('handles Countdown onComplete', () => {
    //   props.superTimer.active = true
    //   props.superTimer.duration = '00:00:01'
    //   const wrapper = shallow(<SuperTimer {...props} />)
    //   const countdown = wrapper.find(Countdown)
    //
    //   wrapper.instance().handleComplete = jest.fn()
    //   countdown.prop('onComplete')()
    //
    //
    //   expect(wrapper.instance().handleComplete).toHaveBeenCalled()
    // })

    it('handles handleTick', () => {
      props.tickSuperTimer = jest.fn();
      const total = 1000;
      const tick = 1000 / 1000;

      const wrapper = shallow(<SuperTimer {...props} />);
      wrapper.instance().handleTick({ total });

      expect(props.tickSuperTimer).toHaveBeenCalledWith(tick);
    });

    it('handles handleComplete', () => {
      props.completeSuperTimer = jest.fn();

      const wrapper = shallow(<SuperTimer {...props} />);
      wrapper.instance().handleComplete();

      expect(props.completeSuperTimer).toHaveBeenCalled();
    });

    describe('shouldComponentUpdate', () => {
      it('handles active change false -> true', () => {
        const wrapper = shallow(<SuperTimer {...props} />);
        const nextProps = {
          ...props,
          superTimer: {
            ...props.superTimer,
            active: true,
          },
        };
        expect(wrapper.instance().shouldComponentUpdate(nextProps)).toEqual(
          true,
        );
      });

      it('handles active change true -> false', () => {
        props.superTimer.active = true;
        const wrapper = shallow(<SuperTimer {...props} />);
        const nextProps = {
          ...props,
          superTimer: {
            ...props.superTimer,
            active: false,
          },
        };
        expect(wrapper.instance().shouldComponentUpdate(nextProps)).toEqual(
          true,
        );
      });

      it('handles duration change', () => {
        const wrapper = shallow(<SuperTimer {...props} />);
        const nextProps = {
          ...props,
          superTimer: {
            ...props.superTimer,
            duration: '00:00:01',
            durationInSeconds: 1,
          },
        };
        expect(wrapper.instance().shouldComponentUpdate(nextProps)).toEqual(
          true,
        );
      });

      it('does not update if active persists', () => {
        const wrapper = shallow(<SuperTimer {...props} />);
        const nextProps = {
          ...props,
          superTimer: {
            ...props.superTimer,
            active: false,
          },
        };
        expect(wrapper.instance().shouldComponentUpdate(nextProps)).toEqual(
          false,
        );
      });

      it('does not update if duration persists', () => {
        const wrapper = shallow(<SuperTimer {...props} />);
        const nextProps = {
          ...props,
          superTimer: {
            ...props.superTimer,
            duration: '00:00:00',
            durationInSeconds: 0,
          },
        };
        expect(wrapper.instance().shouldComponentUpdate(nextProps)).toEqual(
          false,
        );
      });
    });
  });
});
