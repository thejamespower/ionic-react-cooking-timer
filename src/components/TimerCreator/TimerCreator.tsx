import React, { SyntheticEvent, useState } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuid } from 'uuid';
import {
  IonButton,
  IonModal,
  IonCard,
  IonCardContent,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonButtons,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonList,
  IonText,
  IonListHeader,
  IonPopover,
  IonFooter,
} from '@ionic/react';
import { add, checkmark, close as closeIcon, time } from 'ionicons/icons';
import { useAppDispatch } from '../../hooks';
import CustomTimeField from '../TimeField';
import convertSecondsToDuration from '../../lib/convertSecondsToDuration';
import convertDurationToSeconds from '../../lib/convertDurationToSeconds';
import {
  createTimer as createTimerAction,
  createSubTimer as createSubTimerAction,
  SubTimer,
  Timer,
} from '../../state/timers/timersSlice';
import { Duration } from '../TimeField/TimeField';

interface TimerCreatorTimer
  extends Omit<Timer, 'durationInSeconds' | 'active' | 'finished'> {
  subTimers: Omit<
    SubTimer,
    | 'durationInSeconds'
    | 'active'
    | 'finished'
    | 'offset'
    | 'offsetInSeconds'
    | 'parentId'
  >[];
}

const zeroDuration = '00:00:00';
const USE_DEV_STATE = true;
const initialState = USE_DEV_STATE
  ? {
      duration: '00:02:00',
      subTimers: [
        {
          name: 'Flip',
          id: 'flip',
          parentId: 'chips',
          duration: '00:01:00',
        },
      ],
      name: 'Chips 🍟',
      id: 'chips',
    }
  : {
      duration: zeroDuration,
      subTimers: [],
      name: '',
      id: '',
    };

const TimerCreator = ({
  close,
  isOpen,
}: {
  close: () => void;
  isOpen: boolean;
}) => {
  const dispatch = useAppDispatch();

  const [{ duration, name, subTimers }, setTimer] = useState(
    initialState as TimerCreatorTimer,
  );

  const changeDuration = (duration: Duration) => {
    setTimer((timer) => ({ ...timer, duration }));
  };

  const changeSubTimerDuration = (
    subTimer: Partial<SubTimer>,
    duration: Duration,
  ) => {
    setTimer((timer) => ({
      ...timer,
      subTimers: subTimers.map((timer) =>
        timer.id === subTimer.id
          ? {
              ...timer,
              duration,
            }
          : timer,
      ),
    }));
  };

  const changeSubTimerName = (subTimer: Partial<SubTimer>, name: string) => {
    setTimer((timer) => ({
      ...timer,
      subTimers: subTimers.map((timer) =>
        timer.id === subTimer.id
          ? {
              ...timer,
              name,
            }
          : timer,
      ),
    }));
  };

  const addTimerToSuperTimer = () => {
    if (duration === zeroDuration) return;

    const parentId = uuid();

    dispatch(
      createTimerAction({
        duration,
        id: parentId,
        name,
      }),
    );

    subTimers.map((subTimer) => {
      const offsetInSeconds =
        convertDurationToSeconds(duration) -
        convertDurationToSeconds(subTimer.duration);
      const offset = convertSecondsToDuration(offsetInSeconds);

      return dispatch(
        createSubTimerAction({
          duration: subTimer.duration,
          id: uuid(),
          parentId,
          name: `${subTimer.name} ${name}`,
          offset,
        }),
      );
    });

    setTimer(initialState);
  };

  const createSubTimer = () => {
    setTimer((timer) => ({
      ...timer,
      subTimers: [
        ...subTimers,
        {
          offset: zeroDuration,
          duration: zeroDuration,
          id: uuid(),
          name: '',
        },
      ],
    }));
  };

  const removeSubTimer = (id: string) => {
    setTimer((timer) => ({
      ...timer,
      subTimers: subTimers.filter((timers) => timers.id !== id),
    }));
  };

  const handleChange = (name: string) => {
    return (event: CustomEvent) => {
      setTimer((timer) => ({
        ...timer,
        [name]: (event.target as HTMLInputElement).value,
      }));
    };
  };

  return (
    <IonModal isOpen={isOpen}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Create a timer</IonTitle>
          <IonButtons slot="end">
            <IonButton
              onClick={() => {
                close();
              }}
            >
              <IonIcon icon={closeIcon} />
              Close
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonList>
          <IonItem>
            <IonLabel>Name</IonLabel>
            <IonInput
              placeholder={'chips, chicken'}
              value={name}
              onIonChange={handleChange('name')}
              inputMode="text"
              required
            />
          </IonItem>

          <IonItem>
            <IonLabel>Duration</IonLabel>
            <IonButton fill="clear" id="open-time-input">
              {duration}
              <IonIcon icon={time} />
            </IonButton>
            {/*<IonPopover trigger="open-time-input" showBackdrop={false}>*/}
            <CustomTimeField value={duration} onChange={changeDuration} />
            {/*</IonPopover>*/}
          </IonItem>

          <IonList>
            <IonListHeader>
              <IonText>Sub timers</IonText>
              <IonButton
                color="secondary"
                onClick={() => {
                  createSubTimer();
                }}
              >
                <IonIcon icon={add} />
                Add sub timer
              </IonButton>
            </IonListHeader>
            {!!subTimers.length && (
              <>
                {subTimers.map((subTimer) => (
                  <IonCard key={subTimer.id}>
                    <IonToolbar>
                      <IonTitle>Sub timer</IonTitle>
                      <IonButtons slot="end">
                        <IonButton
                          onClick={() =>
                            subTimer.id && removeSubTimer(subTimer.id)
                          }
                        >
                          <IonIcon icon={closeIcon} />
                          Delete
                        </IonButton>
                      </IonButtons>
                    </IonToolbar>
                    <IonCardContent>
                      <IonItem>
                        <IonLabel>Action</IonLabel>
                        <IonInput
                          placeholder={'flip, check, stir'}
                          value={subTimer.name}
                          onIonChange={(event) =>
                            changeSubTimerName(
                              subTimer,
                              (event.target as HTMLInputElement).value,
                            )
                          }
                        />
                      </IonItem>

                      <IonItem>
                        <IonLabel>Duration</IonLabel>
                        <IonButton
                          fill="clear"
                          id={`open-time-input-${subTimer.id}`}
                        >
                          {subTimer.duration}
                          <IonIcon icon={time} />
                        </IonButton>
                        <IonPopover
                          trigger={`open-time-input-${subTimer.id}`}
                          showBackdrop={false}
                        >
                          <CustomTimeField
                            value={subTimer.duration}
                            onChange={(value) =>
                              changeSubTimerDuration(subTimer, value)
                            }
                          />
                        </IonPopover>
                      </IonItem>
                    </IonCardContent>
                  </IonCard>
                ))}
              </>
            )}
          </IonList>
        </IonList>
      </IonContent>
      <IonFooter>
        <IonToolbar>
          <IonButtons slot="end">
            <IonButton
              disabled={
                // @TODO: validate subTimers
                convertDurationToSeconds(duration) === 0 || name?.length === 0
              }
              color="primary"
              onClick={() => {
                // @TODO: validate
                addTimerToSuperTimer();
                // @TODO: close on submit
                close();
              }}
            >
              <IonIcon icon={checkmark} />
              Create timer
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonFooter>
    </IonModal>
  );
};

TimerCreator.propTypes = {
  close: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default TimerCreator;
