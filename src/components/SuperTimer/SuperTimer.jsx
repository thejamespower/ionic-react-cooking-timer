import React, { Component, useMemo } from 'react';
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
import { pause, play, timer } from 'ionicons/icons';
import convertDurationToSeconds from '../../lib/convertDurationToSeconds';
import EndTimeSetter from '../EndTimeSetter';

const SuperTimer = (props) => {
  const { superTimer, startSuperTimer, tickSuperTimer, completeSuperTimer } =
    props;
  const { duration, active, complete, endTime, startTime, elapsedTime } =
    superTimer;

  const handleSubmitClick = () => {
    if (duration === '00:00:00') return;
    startSuperTimer();
  };

  const handleTick = ({ total }) => {
    tickSuperTimer(total / 1000);
  };

  const handleComplete = () => {
    tickSuperTimer(0);
    completeSuperTimer();
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

  const value = complete
    ? 0
    : active
    ? (convertDurationToSeconds(duration) - elapsedTime) /
      convertDurationToSeconds(duration)
    : 1;

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

        {complete && (
          <IonItem>
            <IonText>All done!</IonText>
          </IonItem>
        )}

        <IonFooter>
          <IonToolbar>
            <IonRow className="ion-justify-content-center">
              <IonButtons>
                <IonButton
                  disabled={!active || duration === '00:00:00'}
                  color="warning"
                  onClick={() => {}}
                >
                  <IonIcon icon={pause} slot="icon-only">
                    Pause
                  </IonIcon>
                </IonButton>
                {active && <IonItem>{countdown}</IonItem>}
                {!active && <IonText>{duration}</IonText>}
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

SuperTimer.propTypes = {
  superTimer: PropTypes.shape({
    duration: PropTypes.string.isRequired,
    durationInSeconds: PropTypes.number.isRequired,
    active: PropTypes.bool.isRequired,
    complete: PropTypes.bool.isRequired,
    currentCount: PropTypes.number,
    endTime: PropTypes.string,
    startTime: PropTypes.string,
  }).isRequired,
  startSuperTimer: PropTypes.func.isRequired,
  tickSuperTimer: PropTypes.func.isRequired,
  completeSuperTimer: PropTypes.func.isRequired,
};

export default SuperTimer;
