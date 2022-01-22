import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Countdown from 'react-countdown-now';
import moment from 'moment';
import { IonButton, IonCard, IonCardContent, IonText } from '@ionic/react';

class SuperTimer extends Component {
  static propTypes = {
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

  constructor(props) {
    super(props);

    this.handleSubmitClick = this.handleSubmitClick.bind(this);
    this.handleTick = this.handleTick.bind(this);
    this.handleComplete = this.handleComplete.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    const {
      superTimer: { duration, active, endTime, startTime },
    } = this.props;
    return (
      nextProps.superTimer.duration !== duration ||
      nextProps.superTimer.active !== active ||
      nextProps.superTimer.endTime !== endTime ||
      nextProps.superTimer.startTime !== startTime
    );
  }

  handleSubmitClick() {
    const {
      startSuperTimer,
      superTimer: { duration },
    } = this.props;
    if (duration === '00:00:00') return;
    startSuperTimer();
  }

  handleTick({ total }) {
    const { tickSuperTimer } = this.props;
    tickSuperTimer(total / 1000);
  }

  handleComplete() {
    const { completeSuperTimer } = this.props;
    completeSuperTimer();
  }

  render() {
    const { superTimer } = this.props;
    const { duration, active, complete, endTime, startTime } = superTimer;
    return (
      <IonCard>
        <IonCardContent>
          <IonText color="textSecondary" gutterBottom>
            Total: {duration}
          </IonText>
          <IonText color="textSecondary" gutterBottom>
            Start time: {startTime || 'Not set'}
          </IonText>
          <IonText color="textSecondary" gutterBottom>
            End time: {endTime || 'Not set'}
          </IonText>
          {active && (
            <Countdown
              date={moment().add(moment.duration(duration)).toDate()}
              dayInHours
              onTick={this.handleTick}
              onComplete={this.handleComplete}
            />
          )}
          {complete && <p>All done!</p>}
        </IonCardContent>

        {(!active || !complete) && (
          <IonButton
            disabled={duration === '00:00:00'}
            type="submit"
            variant="contained"
            color="primary"
            onClick={() => {
              this.handleSubmitClick();
            }}
          >
            Start
          </IonButton>
        )}
      </IonCard>
    );
  }
}

export default SuperTimer;
