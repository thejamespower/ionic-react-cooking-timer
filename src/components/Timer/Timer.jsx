import React, { Component } from 'react';
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
} from '@ionic/react';
import convertDurationToSeconds from '../../lib/convertDurationToSeconds';

// @TODO: convert to functional component
class Timer extends Component {
  static propTypes = {
    timer: PropTypes.shape({
      id: PropTypes.string.isRequired,
      duration: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      active: PropTypes.bool.isRequired,
      timeToStart: PropTypes.string.isRequired,
      timeToStartInSeconds: PropTypes.number.isRequired,
      complete: PropTypes.bool.isRequired,
    }).isRequired,
    currentCount: PropTypes.number,
    completeTimer: PropTypes.func.isRequired,
    superTimerActive: PropTypes.bool.isRequired,
    type: PropTypes.oneOf(['card', 'list-slider']),
  };

  constructor(props) {
    super(props);

    const {
      timer: { duration },
    } = this.props;

    this.state = {
      duration,
    };

    this.handleComplete = this.handleComplete.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    const {
      timer: { timeToStart: oldTimeToStart, active: oldActive },
    } = this.props;
    const {
      timer: { timeToStart: newTimeToStart, active: newActive },
    } = nextProps;
    return newActive !== oldActive || newTimeToStart !== oldTimeToStart;
  }

  handleComplete() {
    const {
      completeTimer,
      timer: { id },
    } = this.props;
    completeTimer(id);
  }

  render() {
    const {
      timer: { name, active, timeToStart, id, complete },
      superTimerActive,
      type,
      currentCount,
    } = this.props;

    const { duration } = this.state;

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
              <Countdown
                date={moment().add(moment.duration(duration)).toDate()}
                onComplete={this.handleComplete}
              />
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
        <div
          style={{
            position: 'absolute',
            bottom: '0',
            left: '0',
            width: `${
              (currentCount / convertDurationToSeconds(duration)) * 100
            }%`,
            height: '10%',
            backgroundColor: 'green',
            zIndex: '+2',
          }}
        />

        <IonItem>
          <IonText>{name}</IonText>
          {active && (
            <div slot="end">
              <Countdown
                date={moment().add(moment.duration(duration)).toDate()}
                onComplete={this.handleComplete}
              />
            </div>
          )}
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
          {complete && <IonText>Done!</IonText>}
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
  }
}

export default Timer;
