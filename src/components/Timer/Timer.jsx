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
  IonProgressBar,
  IonRow,
  IonText,
  useIonAlert,
} from '@ionic/react';
import convertDurationToSeconds from '../../lib/convertDurationToSeconds';

const Timer = (props) => {
  const {
    timer: {
      name,
      active,
      duration,
      timeToStart,
      id,
      complete,
      parentId,
      offsetInSeconds,
    },
    totalDurationInSeconds,
    superTimerActive,
    type,
    currentCount,
    elapsedTime,
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
            header: parentId ? 'Action required!' : 'Timer finished!',
            message: `${name} timer finished`,
            buttons: [
              { text: 'Ok', handler: (d) => console.log('ok pressed') },
            ],
            onDidDismiss: (e) => console.log('did dismiss'),
          });
        }}
      />
    ),
    [active],
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
      <IonItem>
        <IonText>
          {parentId ? '✅' : '⏱'} {name}
        </IonText>
        {active && !complete && (
          <IonGrid slot="end">
            <IonRow>
              <IonCol>
                <IonText>Left: {countdown}</IonText>
              </IonCol>
              <IonCol>
                <IonText>Start: {timeToStart}</IonText>
              </IonCol>
              <IonCol>
                <IonText>Duration: {duration}</IonText>
              </IonCol>
            </IonRow>
          </IonGrid>
        )}
        {!active && !complete && (
          <IonGrid slot="end">
            <IonRow>
              <IonCol>
                <IonText>Left: {duration}</IonText>
              </IonCol>
              <IonCol>
                <IonText>Start: {timeToStart}</IonText>
              </IonCol>
              <IonCol>
                <IonText>Duration: {duration}</IonText>
              </IonCol>
            </IonRow>
          </IonGrid>
        )}
        {complete && (
          <IonGrid slot="end">
            <IonRow>
              <IonCol>
                <IonText>✅ Done!</IonText>
              </IonCol>
              <IonCol>
                <IonText>Start: {timeToStart}</IonText>
              </IonCol>
              <IonCol>
                <IonText>Duration: {duration}</IonText>
              </IonCol>
            </IonRow>
          </IonGrid>
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
      {console.log(
        complete
          ? 0
          : active
          ? (convertDurationToSeconds(duration) - elapsedTime) /
            convertDurationToSeconds(duration)
          : 1,
      )}
      <IonProgressBar
        value={
          complete
            ? 0
            : active
            ? (convertDurationToSeconds(duration) - elapsedTime) /
              convertDurationToSeconds(duration)
            : 1
        }
      />
    </IonItemSliding>
  );
};

export default Timer;
