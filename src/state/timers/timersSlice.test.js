import reducer, {
  createSubTimer,
  createTimer,
  deleteTimer,
  completeTimer,
  startSuperTimer,
  initialState,
} from './timersSlice';

const TimerState = ({
  active,
  inProgress = true,
  subTimer = null,
  endTime,
}) => ({
  superTimer: {
    endTime,
    active,
    complete: false,
    currentCount: inProgress ? 90 : 120,
    duration: '00:02:00',
    durationInSeconds: 120,
    elapsedTime: inProgress ? 30 : 0,
  },
  timers: [
    {
      active: false,
      complete: false,
      duration: '00:01:00',
      durationInSeconds: 60,
      id: '1',
      timeToStart: inProgress ? '00:00:30' : '00:01:00',
      timeToStartInSeconds: inProgress ? 30 : 60,
    },
    {
      active,
      complete: false,
      duration: '00:02:00',
      durationInSeconds: 120,
      id: '2',
      timeToStart: '00:00:00',
      timeToStartInSeconds: 0,
    },
    ...(subTimer
      ? [
          {
            active: false,
            complete: false,
            offset: '00:01:00',
            offsetInSeconds: 60,
            duration: '00:01:00',
            durationInSeconds: 60,
            id: 'subTimer A',
            timeToStart: '00:00:00',
            timeToStartInSeconds: 0,
          },
        ]
      : []),
  ],
});

describe('reducer', () => {
  it('returns initialState', () => {
    expect(reducer(undefined, {})).toEqual({
      superTimer: {
        endTime: null,
        startTime: null,
        active: false,
        complete: false,
        currentCount: null,
        duration: '00:00:00',
        durationInSeconds: 0,
        elapsedTime: 0,
      },
      timers: [],
    });
  });

  describe('createTimer', () => {
    describe('given initial state', () => {
      const state = initialState;

      describe('when reducing new state from action with payload duration is zero value ("00:00:00")', () => {
        const payload = {
          duration: '00:00:00',
        };
        const newState = reducer(state, createTimer(payload));

        it('returns correct state', () => {
          expect(newState).toEqual(state);
        });
      });

      describe('when payload duration is non-zero value ("00:01:00")', () => {
        const payload = {
          duration: '00:01:00',
          id: '1',
          name: 'sub timer 1',
        };
        const newState = reducer(state, createTimer(payload));

        it('returns correct state', () => {
          expect(newState).toEqual({
            superTimer: {
              active: false,
              complete: false,
              currentCount: 60,
              duration: '00:01:00',
              durationInSeconds: 60,
              elapsedTime: 0,
              endTime: null,
              startTime: null,
            },
            timers: [
              {
                active: false,
                complete: false,
                duration: '00:01:00',
                durationInSeconds: 60,
                id: '1',
                name: 'sub timer 1',
                timeToStart: '00:00:00',
                timeToStartInSeconds: 0,
              },
            ],
          });
        });
      });
    });

    describe('given inactive state', () => {
      const state = TimerState({ active: false });

      describe('when reducing new state from action with payload duration is zero value ("00:00:00")', () => {
        const payload = {
          duration: '00:00:00',
        };
        const newState = reducer(state, createTimer(payload));

        it('returns correct state', () => {
          expect(newState).toEqual(state);
        });
      });

      describe('when payload duration is zero value ("00:00:00")', () => {
        const payload = {
          duration: '00:00:00',
          id: '1',
          name: 'timer 1',
        };
        const newState = reducer(state, createTimer(payload));

        it('returns correct state', () => {
          expect(newState).toEqual(state);
        });
      });

      describe('when payload duration is non-zero value ("00:01:00")', () => {
        const payload = {
          duration: '00:01:00',
          id: '1',
          name: 'timer 1',
        };
        const newState = reducer(state, createTimer(payload));

        it('returns correct state', () => {
          expect(newState).toEqual({
            superTimer: {
              active: false,
              complete: false,
              currentCount: 120,
              duration: '00:02:00',
              durationInSeconds: 120,
              elapsedTime: 30,
            },
            timers: [
              {
                active: false,
                complete: false,
                duration: '00:01:00',
                durationInSeconds: 60,
                id: '1',
                timeToStart: '00:01:00',
                timeToStartInSeconds: 60,
              },
              {
                active: false,
                complete: false,
                duration: '00:02:00',
                durationInSeconds: 120,
                id: '2',
                timeToStart: '00:00:00',
                timeToStartInSeconds: 0,
              },
              {
                active: false,
                complete: false,
                duration: '00:01:00',
                durationInSeconds: 60,
                id: '1',
                name: 'timer 1',
                timeToStart: '00:01:00',
                timeToStartInSeconds: 60,
              },
            ],
          });
        });
      });
    });

    describe('given inactive state with endTime', () => {
      const state = TimerState({ active: false, endTime: '10:00:00' });

      describe('when payload duration is non-zero value ("02:00:00")', () => {
        const payload = {
          duration: '02:00:00',
          id: '2hr',
          name: 'timer 2 hour',
        };
        const newState = reducer(state, createTimer(payload));

        it('returns correct state', () => {
          expect(newState).toEqual({
            superTimer: {
              endTime: '10:00:00',
              startTime: '08:00:00',
              active: false,
              complete: false,
              currentCount: 7200,
              duration: '02:00:00',
              durationInSeconds: 7200,
              elapsedTime: 30,
            },
            timers: [
              {
                active: false,
                complete: false,
                duration: '00:01:00',
                durationInSeconds: 60,
                id: '1',
                timeToStart: '01:59:00',
                timeToStartInSeconds: 7140,
              },
              {
                active: false,
                complete: false,
                duration: '00:02:00',
                durationInSeconds: 120,
                id: '2',
                timeToStart: '01:58:00',
                timeToStartInSeconds: 7080,
              },
              {
                active: false,
                complete: false,
                duration: '02:00:00',
                durationInSeconds: 7200,
                id: '2hr',
                name: 'timer 2 hour',
                timeToStart: '00:00:00',
                timeToStartInSeconds: 0,
              },
            ],
          });
        });
      });
    });

    describe('given inactive state with subTimers', () => {
      const state = TimerState({ active: false, subTimer: true });

      describe('when reducing new state from action with payload duration is zero value ("00:00:00")', () => {
        const payload = {
          duration: '00:00:00',
        };
        const newState = reducer(state, createTimer(payload));

        it('returns correct state', () => {
          expect(newState).toEqual({
            superTimer: {
              active: false,
              complete: false,
              currentCount: 90,
              duration: '00:02:00',
              durationInSeconds: 120,
              elapsedTime: 30,
              endTime: undefined,
            },
            timers: [
              {
                active: false,
                complete: false,
                duration: '00:01:00',
                durationInSeconds: 60,
                id: '1',
                timeToStart: '00:00:30',
                timeToStartInSeconds: 30,
              },
              {
                active: false,
                complete: false,
                duration: '00:02:00',
                durationInSeconds: 120,
                id: '2',
                timeToStart: '00:00:00',
                timeToStartInSeconds: 0,
              },
              {
                active: false,
                complete: false,
                duration: '00:01:00',
                durationInSeconds: 60,
                id: 'subTimer A',
                offset: '00:01:00',
                offsetInSeconds: 60,
                timeToStart: '00:00:00',
                timeToStartInSeconds: 0,
              },
            ],
          });
        });
      });

      describe('when payload duration is zero value ("00:00:00")', () => {
        const payload = {
          duration: '00:00:00',
          id: '1',
          name: 'timer 1',
        };
        const newState = reducer(state, createTimer(payload));

        it('returns correct state', () => {
          expect(newState).toEqual({
            superTimer: {
              active: false,
              complete: false,
              currentCount: 90,
              duration: '00:02:00',
              durationInSeconds: 120,
              elapsedTime: 30,
              endTime: undefined,
            },
            timers: [
              {
                active: false,
                complete: false,
                duration: '00:01:00',
                durationInSeconds: 60,
                id: '1',
                timeToStart: '00:00:30',
                timeToStartInSeconds: 30,
              },
              {
                active: false,
                complete: false,
                duration: '00:02:00',
                durationInSeconds: 120,
                id: '2',
                timeToStart: '00:00:00',
                timeToStartInSeconds: 0,
              },
              {
                active: false,
                complete: false,
                duration: '00:01:00',
                durationInSeconds: 60,
                id: 'subTimer A',
                offset: '00:01:00',
                offsetInSeconds: 60,
                timeToStart: '00:00:00',
                timeToStartInSeconds: 0,
              },
            ],
          });
        });
      });

      describe('when payload duration is non-zero value ("00:01:00")', () => {
        const payload = {
          duration: '00:03:00',
          id: '3',
          name: 'timer 3',
        };
        const newState = reducer(state, createTimer(payload));

        it('returns correct state', () => {
          expect(newState).toEqual({
            superTimer: {
              active: false,
              complete: false,
              currentCount: 180,
              duration: '00:03:00',
              durationInSeconds: 180,
              elapsedTime: 30,
            },
            timers: [
              {
                active: false,
                complete: false,
                duration: '00:01:00',
                durationInSeconds: 60,
                id: '1',
                timeToStart: '00:02:00',
                timeToStartInSeconds: 120,
              },
              {
                active: false,
                complete: false,
                duration: '00:02:00',
                durationInSeconds: 120,
                id: '2',
                timeToStart: '00:01:00',
                timeToStartInSeconds: 60,
              },
              {
                active: false,
                complete: false,
                duration: '00:01:00',
                durationInSeconds: 60,
                id: 'subTimer A',
                offset: '00:01:00',
                offsetInSeconds: 60,
                timeToStart: '00:01:00',
                timeToStartInSeconds: 60,
              },
              {
                active: false,
                complete: false,
                duration: '00:03:00',
                durationInSeconds: 180,
                id: '3',
                name: 'timer 3',
                timeToStart: '00:00:00',
                timeToStartInSeconds: 0,
              },
            ],
          });
        });
      });
    });

    describe('given active state', () => {
      const state = TimerState({ active: true });

      describe('when reducing new state from action with payload duration is zero value ("00:00:00")', () => {
        const payload = {
          duration: '00:00:00',
        };

        const newState = reducer(state, createTimer(payload));

        it('returns correct state', () => {
          expect(newState).toEqual({
            superTimer: {
              active: true,
              complete: false,
              currentCount: 90,
              duration: '00:02:00',
              durationInSeconds: 120,
              elapsedTime: 30,
              endTime: undefined,
            },
            timers: [
              {
                active: false,
                complete: false,
                duration: '00:01:00',
                durationInSeconds: 60,
                id: '1',
                timeToStart: '00:00:30',
                timeToStartInSeconds: 30,
              },
              {
                active: true,
                complete: false,
                duration: '00:02:00',
                durationInSeconds: 120,
                id: '2',
                timeToStart: '00:00:00',
                timeToStartInSeconds: 0,
              },
            ],
          });
        });
      });

      describe('when payload duration is non-zero value ("00:01:00")', () => {
        const payload = {
          duration: '00:01:00',
          id: '3',
        };
        const newState = reducer(state, createTimer(payload));

        it('returns correct state', () => {
          expect(newState).toEqual({
            superTimer: {
              active: true,
              complete: false,
              currentCount: 90,
              duration: '00:02:00',
              durationInSeconds: 120,
              elapsedTime: 30,
              endTime: undefined,
            },
            timers: [
              {
                active: false,
                complete: false,
                duration: '00:01:00',
                durationInSeconds: 60,
                id: '1',
                timeToStart: '00:00:30',
                timeToStartInSeconds: 30,
              },
              {
                active: true,
                complete: false,
                duration: '00:02:00',
                durationInSeconds: 120,
                id: '2',
                timeToStart: '00:00:00',
                timeToStartInSeconds: 0,
              },
            ],
          });
        });
      });
    });
  });

  describe('createSubTimer', () => {
    describe('given initial state', () => {
      const state = initialState;

      describe('when reducing new state from action with payload offset is zero value ("00:00:00")', () => {
        const payload = {
          offset: '00:00:00',
          name: 'sub timer 1',
          id: '1',
        };
        const newState = reducer(state, createSubTimer(payload));

        it('returns correct state', () => {
          expect(newState).toEqual(state);
        });
      });

      describe('when payload offset is non-zero value ("00:01:00")', () => {
        const payload = {
          offset: '00:00:00',
          name: 'sub timer 1',
          id: '1',
        };
        const newState = reducer(state, createSubTimer(payload));

        it('returns correct state', () => {
          expect(newState).toEqual(state);
        });
      });

      describe('when payload contains no name', () => {
        const payload = {
          offset: '00:00:00',
          id: '1',
        };
        const newState = reducer(state, createSubTimer(payload));

        it('returns correct state', () => {
          expect(newState).toEqual(state);
        });
      });
    });

    describe('given inactive state', () => {
      const state = TimerState({ active: false });

      describe('when reducing new state from action with payload duration is zero value ("00:00:00")', () => {
        const payload = {
          offset: '00:00:00',
          duration: '00:00:00',
          id: '1',
          name: 'sub timer 1',
        };
        const newState = reducer(state, createSubTimer(payload));

        it('returns correct state', () => {
          expect(newState).toEqual({
            superTimer: {
              active: false,
              complete: false,
              currentCount: 90,
              duration: '00:02:00',
              durationInSeconds: 120,
              elapsedTime: 30,
              endTime: undefined,
            },
            timers: [
              {
                active: false,
                complete: false,
                duration: '00:01:00',
                durationInSeconds: 60,
                id: '1',
                timeToStart: '00:00:30',
                timeToStartInSeconds: 30,
              },
              {
                active: false,
                complete: false,
                duration: '00:02:00',
                durationInSeconds: 120,
                id: '2',
                timeToStart: '00:00:00',
                timeToStartInSeconds: 0,
              },
              {
                active: false,
                complete: false,
                duration: '00:00:00',
                durationInSeconds: 0,
                id: '1',
                name: 'sub timer 1',
                offset: '00:00:00',
                offsetInSeconds: 0,
                timeToStart: '00:00:00',
                timeToStartInSeconds: 0,
              },
            ],
          });
        });
      });

      describe('when payload duration is non-zero value ("00:01:00")', () => {
        const payload = {
          offset: '00:01:00',
          duration: '00:01:00',
          id: '1',
          name: 'sub timer 1',
        };
        const newState = reducer(state, createSubTimer(payload));

        it('returns correct state', () => {
          expect(newState).toEqual({
            superTimer: {
              active: false,
              complete: false,
              currentCount: 90,
              duration: '00:02:00',
              durationInSeconds: 120,
              elapsedTime: 30,
              endTime: undefined,
            },
            timers: [
              {
                active: false,
                complete: false,
                duration: '00:01:00',
                durationInSeconds: 60,
                id: '1',
                timeToStart: '00:00:30',
                timeToStartInSeconds: 30,
              },
              {
                active: false,
                complete: false,
                duration: '00:02:00',
                durationInSeconds: 120,
                id: '2',
                timeToStart: '00:00:00',
                timeToStartInSeconds: 0,
              },
              {
                active: false,
                complete: false,
                duration: '00:01:00',
                durationInSeconds: 60,
                id: '1',
                name: 'sub timer 1',
                timeToStart: '00:00:00',
                timeToStartInSeconds: 0,
                offset: '00:01:00',
                offsetInSeconds: 60,
              },
            ],
          });
        });
      });

      describe('when payload contains no name', () => {
        const payload = {
          offset: '00:01:00',
          id: '3',
        };
        const newState = reducer(state, createSubTimer(payload));

        it('returns correct state', () => {
          expect(newState).toEqual({
            superTimer: {
              active: false,
              complete: false,
              currentCount: 90,
              duration: '00:02:00',
              durationInSeconds: 120,
              elapsedTime: 30,
              endTime: undefined,
            },
            timers: [
              {
                active: false,
                complete: false,
                duration: '00:01:00',
                durationInSeconds: 60,
                id: '1',
                timeToStart: '00:00:30',
                timeToStartInSeconds: 30,
              },
              {
                active: false,
                complete: false,
                duration: '00:02:00',
                durationInSeconds: 120,
                id: '2',
                timeToStart: '00:00:00',
                timeToStartInSeconds: 0,
              },
            ],
          });
        });
      });
    });

    describe('given active state', () => {
      const state = TimerState({ active: true });

      describe('when reducing new state from action with payload offset is zero value ("00:00:00")', () => {
        const payload = {
          duration: '00:00:00',
          id: '1',
          name: 'sub timer 1',
        };
        const newState = reducer(state, createSubTimer(payload));

        it('returns correct state', () => {
          expect(newState).toEqual({
            superTimer: {
              active: true,
              complete: false,
              currentCount: 90,
              duration: '00:02:00',
              durationInSeconds: 120,
              elapsedTime: 30,
              endTime: undefined,
            },
            timers: [
              {
                active: false,
                complete: false,
                duration: '00:01:00',
                durationInSeconds: 60,
                id: '1',
                timeToStart: '00:00:30',
                timeToStartInSeconds: 30,
              },
              {
                active: true,
                complete: false,
                duration: '00:02:00',
                durationInSeconds: 120,
                id: '2',
                timeToStart: '00:00:00',
                timeToStartInSeconds: 0,
              },
            ],
          });
        });
      });

      describe('when payload duration is non-zero value ("00:01:00")', () => {
        const payload = {
          offset: '00:01:00',
          id: '1',
          name: 'sub timer 1',
        };
        const newState = reducer(state, createSubTimer(payload));

        it('returns correct state', () => {
          expect(newState).toEqual({
            superTimer: {
              active: true,
              complete: false,
              currentCount: 90,
              duration: '00:02:00',
              durationInSeconds: 120,
              elapsedTime: 30,
              endTime: undefined,
            },
            timers: [
              {
                active: false,
                complete: false,
                duration: '00:01:00',
                durationInSeconds: 60,
                id: '1',
                timeToStart: '00:00:30',
                timeToStartInSeconds: 30,
              },
              {
                active: true,
                complete: false,
                duration: '00:02:00',
                durationInSeconds: 120,
                id: '2',
                timeToStart: '00:00:00',
                timeToStartInSeconds: 0,
              },
            ],
          });
        });
      });

      describe('when payload contains no name', () => {
        const payload = {
          offset: '00:01:00',
          id: '3',
        };
        const newState = reducer(state, createSubTimer(payload));

        it('returns correct state', () => {
          expect(newState).toEqual({
            superTimer: {
              active: true,
              complete: false,
              currentCount: 90,
              duration: '00:02:00',
              durationInSeconds: 120,
              elapsedTime: 30,
              endTime: undefined,
            },
            timers: [
              {
                active: false,
                complete: false,
                duration: '00:01:00',
                durationInSeconds: 60,
                id: '1',
                timeToStart: '00:00:30',
                timeToStartInSeconds: 30,
              },
              {
                active: true,
                complete: false,
                duration: '00:02:00',
                durationInSeconds: 120,
                id: '2',
                timeToStart: '00:00:00',
                timeToStartInSeconds: 0,
              },
            ],
          });
        });
      });
    });
  });

  describe('deleteTimer', () => {
    describe('given any state', () => {
      const state = TimerState({ active: false });

      describe('when reducing new state from action with no id given', () => {
        const payload = '';
        const newState = reducer(state, deleteTimer(payload));

        it('returns correct state', () => {
          expect(newState).toEqual(state);
        });
      });
    });

    describe('given active timer state', () => {
      const state = TimerState({ active: true });

      describe('when reducing new state from action with id given', () => {
        const payload = '1';
        const newState = reducer(state, deleteTimer(payload));

        it('returns correct state', () => {
          expect(newState).toEqual({
            superTimer: {
              active: true,
              complete: false,
              currentCount: 90,
              duration: '00:02:00',
              durationInSeconds: 120,
              elapsedTime: 30,
              endTime: undefined,
            },
            timers: [
              {
                active: false,
                complete: false,
                duration: '00:01:00',
                durationInSeconds: 60,
                id: '1',
                timeToStart: '00:00:30',
                timeToStartInSeconds: 30,
              },
              {
                active: true,
                complete: false,
                duration: '00:02:00',
                durationInSeconds: 120,
                id: '2',
                timeToStart: '00:00:00',
                timeToStartInSeconds: 0,
              },
            ],
          });
        });
      });
    });

    describe('given inactive timer state', () => {
      const state = TimerState({ active: false });

      describe('when reducing new state from action with id given', () => {
        const payload = '1';
        const newState = reducer(state, deleteTimer(payload));

        it('returns correct state', () => {
          expect(newState).toEqual({
            superTimer: {
              active: false,
              complete: false,
              currentCount: 90,
              duration: '00:02:00',
              durationInSeconds: 120,
              elapsedTime: 30,
            },
            timers: [
              {
                active: false,
                complete: false,
                duration: '00:02:00',
                durationInSeconds: 120,
                id: '2',
                timeToStart: '00:00:00',
                timeToStartInSeconds: 0,
              },
            ],
          });
        });
      });
    });
  });

  describe('completeTimer', () => {
    describe('given no timer state', () => {
      const state = initialState;

      describe('when reducing new state from action with id given', () => {
        const payload = '1';
        const newState = reducer(state, completeTimer(payload));

        it('returns correct state', () => {
          expect(newState).toEqual(state);
        });
      });
    });

    describe('given inactive timer state', () => {
      const state = TimerState({ active: false });

      describe('when reducing new state from action with id given', () => {
        const payload = '1';
        const newState = reducer(state, completeTimer(payload));

        it('returns correct state', () => {
          expect(newState).toEqual({
            superTimer: {
              active: false,
              complete: false,
              currentCount: 90,
              duration: '00:02:00',
              durationInSeconds: 120,
              elapsedTime: 30,
              endTime: undefined,
            },
            timers: [
              {
                active: false,
                complete: true,
                duration: '00:01:00',
                durationInSeconds: 60,
                id: '1',
                timeToStart: '00:00:30',
                timeToStartInSeconds: 30,
              },
              {
                active: false,
                complete: false,
                duration: '00:02:00',
                durationInSeconds: 120,
                id: '2',
                timeToStart: '00:00:00',
                timeToStartInSeconds: 0,
              },
            ],
          });
        });
      });
    });

    describe('given active timer state', () => {
      const state = TimerState({ active: true });

      describe('when reducing new state from action with id given', () => {
        const payload = '1';
        const newState = reducer(state, completeTimer(payload));

        it('returns correct state', () => {
          expect(newState).toEqual({
            superTimer: {
              active: true,
              complete: false,
              currentCount: 90,
              duration: '00:02:00',
              durationInSeconds: 120,
              elapsedTime: 30,
              endTime: undefined,
            },
            timers: [
              {
                active: false,
                complete: true,
                duration: '00:01:00',
                durationInSeconds: 60,
                id: '1',
                timeToStart: '00:00:30',
                timeToStartInSeconds: 30,
              },
              {
                active: true,
                complete: false,
                duration: '00:02:00',
                durationInSeconds: 120,
                id: '2',
                timeToStart: '00:00:00',
                timeToStartInSeconds: 0,
              },
            ],
          });
        });
      });
    });
  });

  describe('startSuperTimer', () => {
    describe('given no timer state', () => {
      const state = initialState;

      describe('when reducing new state from action', () => {
        const newState = reducer(state, startSuperTimer());

        it('returns correct state', () => {
          expect(newState).toEqual(state);
        });
      });
    });

    describe('given inactive and not in progress timer state', () => {
      const state = TimerState({
        subTimer: true,
        active: false,
        inProgress: false,
      });

      describe('when reducing new state from action', () => {
        const newState = reducer(state, startSuperTimer());

        it('returns correct state', () => {
          expect(newState).toEqual({
            superTimer: {
              active: true,
              complete: false,
              currentCount: 120,
              duration: '00:02:00',
              durationInSeconds: 120,
              elapsedTime: 0,
              endTime: undefined,
            },
            timers: [
              {
                active: false,
                complete: false,
                duration: '00:01:00',
                durationInSeconds: 60,
                id: '1',
                timeToStart: '00:01:00',
                timeToStartInSeconds: 60,
              },
              {
                active: true,
                complete: false,
                duration: '00:02:00',
                durationInSeconds: 120,
                id: '2',
                timeToStart: '00:00:00',
                timeToStartInSeconds: 0,
              },
              {
                active: true,
                complete: false,
                duration: '00:01:00',
                durationInSeconds: 60,
                id: 'subTimer A',
                timeToStart: '00:00:00',
                timeToStartInSeconds: 0,
                offset: '00:01:00',
                offsetInSeconds: 60,
              },
            ],
          });
        });
      });
    });

    describe('given active and not in progress timer state', () => {
      const state = TimerState({ active: true, inProgress: false });

      describe('when reducing new state from action', () => {
        const newState = reducer(state, startSuperTimer());

        it('returns correct state', () => {
          expect(newState).toEqual(state);
        });
      });
    });

    describe('given active and  in progress timer state', () => {
      const state = TimerState({ active: true, inProgress: true });

      describe('when reducing new state from action', () => {
        const newState = reducer(state, startSuperTimer());

        it('returns correct state', () => {
          expect(newState).toEqual({
            superTimer: {
              active: true,
              complete: false,
              currentCount: 90,
              duration: '00:02:00',
              durationInSeconds: 120,
              elapsedTime: 30,
              endTime: undefined,
            },
            timers: [
              {
                active: false,
                complete: false,
                duration: '00:01:00',
                durationInSeconds: 60,
                id: '1',
                timeToStart: '00:00:30',
                timeToStartInSeconds: 30,
              },
              {
                active: true,
                complete: false,
                duration: '00:02:00',
                durationInSeconds: 120,
                id: '2',
                timeToStart: '00:00:00',
                timeToStartInSeconds: 0,
              },
            ],
          });
        });
      });
    });
  });
});
