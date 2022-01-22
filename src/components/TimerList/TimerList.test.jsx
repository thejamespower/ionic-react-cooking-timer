import React from 'react'
import renderer from 'react-test-renderer'
import TimerList from './TimerList'

jest.mock('../SuperTimer', () => 'SuperTimer')
jest.mock('../Timer', () => 'Timer')

describe('TimerList', () => {
  let props = {
    timers: [],
  }

  describe('render', () => {
    it('renders default state', () => {
      const component = renderer.create(
        <TimerList {...props} />,
      )
      const tree = component.toJSON()
      expect(tree).toMatchSnapshot()
    })

    it('renders timers state', () => {
      props = {
        ...props,
        timers: [...props.timers, {
          id: 'test',
          duration: '00:00:01',
          durationInSeconds: 1,
          name: 'test',
          active: false,
          timeToStart: '00:00:01',
          timeToStartInSeconds: 1,
          complete: false,
        }],
      }

      const component = renderer.create(
        <TimerList {...props} />,
      )
      const tree = component.toJSON()
      expect(tree).toMatchSnapshot()
    })
  })
})
