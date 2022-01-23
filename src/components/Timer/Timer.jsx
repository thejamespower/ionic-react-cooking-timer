import React, { Component, useMemo } from 'react';
import PropTypes from 'prop-types';
import Countdown from 'react-countdown-now';
import moment from 'moment';
import TimerDeleteButton from '../TimerDeleteButton';
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCol,
  IonGrid,
  IonItem,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonRow,
  IonText,
  useIonAlert,
} from '@ionic/react';
import convertDurationToSeconds from '../../lib/convertDurationToSeconds';

const Timer = (props) => {
  const {
    timer: { name, active, duration, timeToStart, id, complete },
    superTimerActive,
    type,
    currentCount,
    completeTimer,
  } = props;

  const [present] = useIonAlert();

  const countdown = useMemo(
    () => (
      <Countdown
        date={moment().add(moment.duration(duration)).toDate()}
        onComplete={async () => {
          completeTimer(id);
          await present({
            cssClass: 'my-css',
            header: 'Timer finished!',
            message: `${name} timer finished`,
            buttons: [
              { text: 'Ok', handler: (d) => console.log('ok pressed') },
            ],
            onDidDismiss: (e) => console.log('did dismiss'),
          });
        }}
      />
    ),
    [active, timeToStart],
  );

  return type === 'card' ? (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>Timer</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <IonItem>
          <IonLabel>Name</IonLabel>
          <IonText>{name}</IonText>
        </IonItem>
        {active && (
          <IonItem>
            <IonLabel>Duration</IonLabel>
          </IonItem>
        )}
        {!active && !complete && (
          <>
            <IonItem>
              <IonLabel>Time To start</IonLabel>
              <IonText>{timeToStart}</IonText>
            </IonItem>
            <IonItem>
              <IonLabel>Duration</IonLabel>
              <IonText>{duration}</IonText>
            </IonItem>
          </>
        )}
        {complete && <IonText>Done!</IonText>}

        <TimerDeleteButton
          superTimerActive={superTimerActive}
          active={active}
          id={id}
          complete={complete}
        />
      </IonCardContent>
    </IonCard>
  ) : (
    //  @TODO: only slide when sliding options available (validation)
    <IonItemSliding>
      {active}
      <div
        style={{
          position: 'absolute',
          bottom: '0',
          left: '0',
          width: `${
            // nuance with timer completing before currentCount gets updated, 0 is never reached
            currentCount === 1 && !active
              ? 0
              : (currentCount / convertDurationToSeconds(duration)) * 100
          }%`,
          height: '10%',
          backgroundColor: 'green',
          zIndex: '+2',
        }}
      />

      <IonItem>
        <IonText>{name}</IonText>
        {active && <div slot="end">{countdown}</div>}
        {!active && !complete && (
          <IonGrid slot="end">
            <IonRow>
              <IonCol>
                <IonText>{timeToStart}</IonText>
              </IonCol>
              <IonCol>
                <IonText>{duration}</IonText>
              </IonCol>
            </IonRow>
          </IonGrid>
        )}
        {complete && (
          <IonItem slot="end">
            <IonText>Done!</IonText>
          </IonItem>
        )}
      </IonItem>
      <IonItemOptions slide="right">
        {!active && (
          <TimerDeleteButton
            superTimerActive={superTimerActive}
            active={active}
            id={id}
            complete={complete}
          />
        )}
      </IonItemOptions>
    </IonItemSliding>
  );
};

export default Timer;
