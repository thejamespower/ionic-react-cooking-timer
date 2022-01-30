import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
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
import { useDispatch, useSelector } from 'react-redux';
import {
  superTimerSelector,
  startSuperTimer,
  tickSuperTimer,
  finishSuperTimer,
} from '../../state/timers/timersSlice';

const SuperTimer = (props) => {
  const superTimer = useSelector(superTimerSelector);
  const dispatch = useDispatch();

  const { duration, active, finished, endTime, startTime, elapsedTime } =
    superTimer;

  const handleSubmitClick = () => {
    if (duration === '00:00:00') return;
    dispatch(startSuperTimer());
  };

  const handleTick = ({ total }) => {
    dispatch(tickSuperTimer(total / 1000));
  };

  const handleComplete = () => {
    dispatch(tickSuperTimer(0));
    dispatch(finishSuperTimer());
  };

  const countdown = useMemo(
    () => (
      <Countdown
        date={moment().add(moment.duration(duration)).toDate()}
        dayInHours
        onTick={handleTick}
        onComplete={handleComplete}
      />
    ),
    [duration, active, endTime, startTime],
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

SuperTimer.propTypes = {};

export default SuperTimer;
