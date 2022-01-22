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
  IonItem,
  IonLabel,
  IonText,
} from '@ionic/react';

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
    completeTimer: PropTypes.func.isRequired,
    superTimerActive: PropTypes.bool.isRequired,
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
    } = this.props;

    const { duration } = this.state;

    return (
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
    );
  }
}

export default Timer;
