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

  return type === 'card' ? (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>Timer</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <IonItem>
          <IonGrid>
            <IronRow>
              <IonLabel>Name</IonLabel>
            </IronRow>
            <IronRow>
              <IonText>{name}</IonText>
            </IronRow>
          </IonGrid>
        </IonItem>
        {active && (
          <IonItem>
            <IonLabel>Duration</IonLabel>
          </IonItem>
        )}
        {!active && !complete && (
          <>
            <IonItem>
              <IonGrid>
                <IronRow>
                  <IonLabel>Time To start</IonLabel>
                </IronRow>
                <IronRow>
                  <IonText>{timeToStart}</IonText>
                </IronRow>
              </IonGrid>
            </IonItem>
            <IonItem>
              <IonGrid>
                <IronRow>
                  <IonLabel>Duration</IonLabel>
                </IronRow>
                <IronRow>
                  <IonText>{duration}</IonText>
                </IronRow>
              </IonGrid>
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
                <IonGrid>
                  <IonRow>
                    <IonText>Left:</IonText>
                  </IonRow>
                  <IonRow>{countdown}</IonRow>
                </IonGrid>
              </IonCol>
              <IonCol>
                <IonGrid>
                  <IonRow>
                    <IonText>Start</IonText>
                  </IonRow>
                  <IonRow>{timeToStart}</IonRow>
                </IonGrid>
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
                <IonGrid>
                  <IonRow>
                    <IonText>Start</IonText>
                  </IonRow>
                  <IonRow>{timeToStart}</IonRow>
                </IonGrid>
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
                <IonGrid>
                  <IonRow>
                    <IonText>Start</IonText>
                  </IonRow>
                  <IonRow>{timeToStart}</IonRow>
                </IonGrid>
              </IonCol>
              <IonCol>
                <IonText>Duration: {duration}</IonText>
              </IonCol>
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
      <IonProgressBar
        color={value > 0.3 ? 'success' : value > 0.1 ? 'warning' : 'danger'}
        value={value}
      />
    </IonItemSliding>
  );
};

export default Timer;
