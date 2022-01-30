import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import Countdown from 'react-countdown-now';
import moment from 'moment';
import TimerDeleteButton from '../TimerDeleteButton';
import {
  IonCol,
  IonGrid,
  IonItem,
  IonItemOptions,
  IonItemSliding,
  IonProgressBar,
  IonRow,
  IonText,
  useIonAlert,
} from '@ionic/react';
import convertDurationToSeconds from '../../lib/convertDurationToSeconds';
import TimerCompleteButton from '../TimerCompleteButton';
import { useDispatch, useSelector } from 'react-redux';
import {
  finishTimer,
  superTimerSelector,
} from '../../state/timers/timersSlice';

const Timer = (props) => {
  const {
    timer: { name, active, duration, timeToStart, id, finished, parentId },
  } = props;

  const dispatch = useDispatch();
  const { active: superTimerActive, elapsedTime } =
    useSelector(superTimerSelector);

  const value = finished
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
          dispatch(finishTimer(id));
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
          {active && !finished && (
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
          {!active && !finished && (
            <IonGrid slot="end">
              <IonRow>
                <LeftDuration />
                <TimeToStart />
                <Duration />
              </IonRow>
            </IonGrid>
          )}
          {finished && (
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
          {parentId && finished && active && <TimerCompleteButton id={id} />}
          {!active && !finished && !superTimerActive && (
            <TimerDeleteButton id={id} />
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
