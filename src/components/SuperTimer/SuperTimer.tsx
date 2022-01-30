import React, { useCallback, useMemo } from 'react';
import Countdown from 'react-countdown-now';
import moment from 'moment';
import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonFooter,
  IonIcon,
  IonItem,
  IonLabel,
  IonProgressBar,
  IonRow,
  IonText,
  IonToolbar,
} from '@ionic/react';
import { pause, play } from 'ionicons/icons';
import convertDurationToSeconds from '../../lib/convertDurationToSeconds';
import EndTimeSetter from '../EndTimeSetter';
import {
  superTimerSelector,
  startSuperTimer,
  tickSuperTimer,
  finishSuperTimer,
} from '../../state/timers/timersSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';

const SuperTimer = () => {
  const superTimer = useAppSelector(superTimerSelector);
  const dispatch = useAppDispatch();

  const { duration, active, finished, startTime, elapsedTime } = superTimer;

  const handleSubmitClick = () => {
    if (duration === '00:00:00') return;
    dispatch(startSuperTimer());
  };

  const handleTick = useCallback(
    ({ total }) => {
      dispatch(tickSuperTimer(total / 1000));
    },
    [dispatch],
  );

  const handleComplete = useCallback(() => {
    dispatch(tickSuperTimer(0));
    dispatch(finishSuperTimer());
  }, [dispatch]);

  const countdown = useMemo(
    () => (
      <Countdown
        date={moment().add(moment.duration(duration)).toDate()}
        daysInHours
        onTick={handleTick}
        onComplete={handleComplete}
      />
    ),
    [duration, handleTick, handleComplete],
  );

  const value = finished
    ? 0
    : active
    ? (convertDurationToSeconds(duration) - elapsedTime) /
      convertDurationToSeconds(duration)
    : 1;

  const startButton = (
    <IonButton
      disabled={active || duration === '00:00:00'}
      color="success"
      type="submit"
      onClick={() => {
        handleSubmitClick();
      }}
    >
      <IonIcon icon={play} slot="icon-only">
        Start
      </IonIcon>
    </IonButton>
  );

  const pauseButton = (
    <IonButton
      disabled={!active || duration === '00:00:00'}
      color="warning"
      onClick={() => {}}
    >
      <IonIcon icon={pause} slot="icon-only">
        Pause
      </IonIcon>
    </IonButton>
  );

  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle className="ion-text-center">Controls</IonCardTitle>
      </IonCardHeader>

      <IonCardContent>
        <IonItem>
          <IonLabel>Start time</IonLabel>
          <IonText>{startTime || 'Not set'}</IonText>
        </IonItem>

        <EndTimeSetter />

        {finished && (
          <IonItem>
            <IonText>All done!</IonText>
          </IonItem>
        )}

        <IonFooter>
          <IonToolbar>
            <IonRow className="ion-justify-content-center">
              <IonButtons>
                {pauseButton}
                {active && <IonItem>{countdown}</IonItem>}
                {!active && <IonText>{duration}</IonText>}
                {startButton}
              </IonButtons>
            </IonRow>
          </IonToolbar>
        </IonFooter>

        <IonProgressBar
          color={value > 0.3 ? 'success' : value > 0.1 ? 'warning' : 'danger'}
          value={value}
        />
      </IonCardContent>
    </IonCard>
  );
};

export default SuperTimer;
