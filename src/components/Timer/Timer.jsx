import React, { Component, useMemo } from 'react';
import PropTypes from 'prop-types';
import Countdown from 'react-countdown-now';
import moment from 'moment';
import TimerDeleteButton from '../TimerDeleteButton';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCol,
  IonGrid,
  IonIcon,
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
import { checkmark } from 'ionicons/icons';
import TimerCompleteButton from '../TimerCompleteButton';

function IronRow(props) {
  return null;
}

IronRow.propTypes = { children: PropTypes.node };
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

  const value = complete
    ? 0
    : active
    ? (convertDurationToSeconds(duration) - elapsedTime) /
      convertDurationToSeconds(duration)
    : 1;

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

  const TimeToStart = () => (
    <IonCol>
      <IonGrid>
        <IonRow className="ion-justify-content-end">
          <IonText>Start</IonText>
        </IonRow>
        <IonRow className="ion-justify-content-end">{timeToStart}</IonRow>
      </IonGrid>
    </IonCol>
  );

  const LeftDuration = () => (
    <IonCol>
      <IonGrid>
        <IonRow className="ion-justify-content-end">
          <IonText>Left</IonText>
        </IonRow>
        <IonRow className="ion-justify-content-end">
          <IonText>{duration}</IonText>
        </IonRow>
      </IonGrid>
    </IonCol>
  );

  const Duration = () => (
    <IonCol>
      <IonGrid>
        <IonRow className="ion-justify-content-end">
          <IonText>Duration</IonText>
        </IonRow>
        <IonRow className="ion-justify-content-end">
          <IonText>{duration}</IonText>
        </IonRow>
      </IonGrid>
    </IonCol>
  );

  return (
    //  @TODO: only slide when sliding options available (validation)
    <>
      <IonItemSliding>
        <IonItem>
          <IonText>
            {parentId ? '⏱✅' : '⏱'} {name}
          </IonText>
          {active && !complete && (
            <IonGrid slot="end">
              <IonRow>
                <IonCol>
                  <IonGrid>
                    <IonRow className="ion-justify-content-end">
                      <IonText>Left</IonText>
                    </IonRow>
                    <IonRow className="ion-justify-content-end">
                      {countdown}
                    </IonRow>
                  </IonGrid>
                </IonCol>
                <TimeToStart />
                <Duration />
              </IonRow>
            </IonGrid>
          )}
          {!active && !complete && (
            <IonGrid slot="end">
              <IonRow>
                <LeftDuration />
                <TimeToStart />
                <Duration />
              </IonRow>
            </IonGrid>
          )}
          {complete && (
            <IonGrid slot="end">
              <IonRow>
                <IonCol>
                  <IonText>✅ Done!</IonText>
                </IonCol>
                <TimeToStart />
                <Duration />
              </IonRow>
            </IonGrid>
          )}
        </IonItem>
        <IonItemOptions slide="right">
          {parentId && (
            <TimerCompleteButton
              superTimerActive={superTimerActive}
              active={active}
              id={id}
              complete={complete}
            />
          )}
          {!active && (
            // @TODO: delete sub timer if delete parent
            <TimerDeleteButton
              superTimerActive={superTimerActive}
              active={active}
              id={id}
              complete={complete}
            />
          )}
        </IonItemOptions>
      </IonItemSliding>
      <IonProgressBar
        color={value > 0.3 ? 'success' : value > 0.1 ? 'warning' : 'danger'}
        value={value}
      />
    </>
  );
};

export default Timer;