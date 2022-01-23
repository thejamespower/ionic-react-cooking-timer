import React, { Component, useMemo } from 'react';
import PropTypes from 'prop-types';
import Countdown from 'react-countdown-now';
import moment from 'moment';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonFooter,
  IonIcon,
  IonItem,
  IonLabel,
  IonProgressBar,
  IonText,
  IonToolbar,
} from '@ionic/react';
import { play } from 'ionicons/icons';

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

  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>SuperTimer</IonCardTitle>
      </IonCardHeader>

      <IonCardContent>
        <IonItem>
          <IonLabel>Total</IonLabel>
          <IonText>{duration}</IonText>
        </IonItem>

        <IonItem>
          <IonLabel>Start time</IonLabel>
          <IonText>{startTime || 'Not set'}</IonText>
        </IonItem>

        <IonItem>
          <IonLabel>End time</IonLabel>
          <IonText>{endTime || 'Not set'}</IonText>
        </IonItem>

        {active && <IonItem>{countdown}</IonItem>}

        {complete && (
          <IonItem>
            <IonText>All done!</IonText>
          </IonItem>
        )}

        {!active && !complete && (
          <IonFooter>
            <IonToolbar>
              <IonButton
                slot="end"
                disabled={duration === '00:00:00'}
                color="success"
                onClick={() => {
                  handleSubmitClick();
                }}
              >
                <IonIcon icon={play} />
                Start
              </IonButton>
            </IonToolbar>
          </IonFooter>
        )}

        {/*<IonProgressBar*/}
        {/*  value={*/}
        {/*    complete*/}
        {/*      ? 0*/}
        {/*      : active*/}
        {/*      ? (convertDurationToSeconds(duration) - elapsedTime) /*/}
        {/*        convertDurationToSeconds(duration)*/}
        {/*      : 1*/}
        {/*  }*/}
        {/*/>*/}
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
