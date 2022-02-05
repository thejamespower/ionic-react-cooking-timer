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
import {
  finishTimer,
  superTimerSelector,
} from '../../state/timers/timersSlice';
import { Duration } from '../TimeField/TimeField';
import { useAppDispatch, useAppSelector } from '../../hooks';

const Timer = (props: {
  timer: {
    name: string;
    active: boolean;
    duration: Duration;
    timeToStart: Duration;
    id: string;
    finished: boolean;
    parentId: string;
  };
}) => {
  const {
    timer: { name, active, duration, timeToStart, id, finished, parentId },
  } = props;

  const dispatch = useAppDispatch();
  const { active: superTimerActive, elapsedTime } =
    useAppSelector(superTimerSelector);

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
    [dispatch, duration, id, name, parentId, present],
  );

  const TimeToStart = () =>
    !active ? (
      <IonCol>
        <IonGrid>
          <IonRow className="ion-justify-content-end">
            <IonText>Start</IonText>
          </IonRow>
          <IonRow className="ion-justify-content-end">{timeToStart}</IonRow>
        </IonGrid>
      </IonCol>
    ) : null;

  const LeftDuration = () =>
    active ? (
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
    ) : null;

  const Duration = () =>
    !active ? (
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
    ) : null;

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
        <IonItemOptions>
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

Timer.propTypes = {
  timer: PropTypes.shape({
    name: PropTypes.string.isRequired,
    active: PropTypes.bool.isRequired,
    duration: PropTypes.string.isRequired,
    timeToStart: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    finished: PropTypes.bool.isRequired,
    parentId: PropTypes.string,
  }).isRequired,
};

export default Timer;
