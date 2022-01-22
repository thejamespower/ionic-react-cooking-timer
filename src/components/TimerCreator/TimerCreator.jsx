import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CustomTimeField from '../TimeField';
import convertSecondsToDuration from '../../lib/convertSecondsToDuration';
import convertDurationToSeconds from '../../lib/convertDurationToSeconds';
import { v4 as uuid } from 'uuid';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonInput,
  IonItem,
  IonLabel,
} from '@ionic/react';

const zeroDuration = '00:00:00';

const initialState = {
  duration: zeroDuration,
  subTimers: [],
  name: '',
};

class TimerCreator extends Component {
  static propTypes = {
    createTimer: PropTypes.func.isRequired,
    createSubTimer: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = initialState;

    this.changeDuration = this.changeDuration.bind(this);
    this.addTimerToSuperTimer = this.addTimerToSuperTimer.bind(this);
    this.createSubTimer = this.createSubTimer.bind(this);
    this.changeSubTimerDuration = this.changeSubTimerDuration.bind(this);
    this.changeSubTimerName = this.changeSubTimerName.bind(this);
  }

  changeDuration(duration) {
    this.setState({ duration });
  }

  changeSubTimerDuration(subTimer, duration) {
    const { subTimers } = this.state;
    this.setState({
      subTimers: subTimers.map((timer) =>
        timer.id === subTimer.id
          ? {
              ...timer,
              duration,
            }
          : timer,
      ),
    });
  }

  changeSubTimerName(subTimer, name) {
    const { subTimers } = this.state;
    this.setState({
      subTimers: subTimers.map((timer) =>
        timer.id === subTimer.id
          ? {
              ...timer,
              name,
            }
          : timer,
      ),
    });
  }

  addTimerToSuperTimer() {
    const { createTimer, createSubTimer } = this.props;
    const { duration, subTimers, name } = this.state;

    if (duration === zeroDuration) return;

    const parentId = uuid();

    createTimer({
      duration,
      id: parentId,
      name,
    });

    subTimers.map((subTimer) =>
      createSubTimer({
        duration: subTimer.duration,
        id: uuid(),
        parentId,
        name: `${subTimer.name} ${name}`,
        offset: convertSecondsToDuration(
          convertDurationToSeconds(duration) -
            convertDurationToSeconds(subTimer.duration),
        ),
      }),
    );

    this.setState(initialState);
  }

  createSubTimer() {
    const { subTimers } = this.state;

    this.setState({
      subTimers: [
        ...subTimers,
        {
          offset: zeroDuration,
          duration: zeroDuration,
          id: uuid(),
          name: '',
        },
      ],
    });
  }

  removeSubTimer(id) {
    const { subTimers } = this.state;

    this.setState({
      subTimers: subTimers.filter((timers) => timers.id !== id),
    });
  }

  handleChange(name) {
    return (event) => {
      this.setState({
        [name]: event.target.value,
      });
    };
  }

  render() {
    const { duration, subTimers, name } = this.state;

    return (
      <IonCard>
        <IonCardHeader>
          <IonCardTitle>TimerCreator</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          <IonItem>
            <IonLabel>Name</IonLabel>
            <IonInput value={name} onIonChange={this.handleChange('name')} />
          </IonItem>

          <IonItem>
            <IonLabel>Duration</IonLabel>
            <CustomTimeField value={duration} onChange={this.changeDuration} />
          </IonItem>

          {subTimers.map((subTimer) => (
            <div key={subTimer.id}>
              <IonButton
                onClick={() => {
                  this.removeSubTimer(subTimer.id);
                }}
              >
                X
              </IonButton>

              <IonItem>
                <IonLabel>Name</IonLabel>
                <IonInput
                  value={subTimer.name}
                  onIonChange={(event) =>
                    this.changeSubTimerName(subTimer, event.target.value)
                  }
                />
              </IonItem>

              <IonItem>
                <IonLabel>Duration</IonLabel>
                <CustomTimeField
                  value={subTimer.duration}
                  onChange={(value) =>
                    this.changeSubTimerDuration(subTimer, value)
                  }
                />
              </IonItem>
            </div>
          ))}
          <IonButton
            color="secondary"
            expand="block"
            onClick={() => {
              this.createSubTimer();
            }}
          >
            Do something else to it?
          </IonButton>

          <IonButton
            color="primary"
            expand="block"
            onClick={() => {
              this.addTimerToSuperTimer();
            }}
          >
            Create timer
          </IonButton>
        </IonCardContent>
      </IonCard>
    );
  }
}

export default TimerCreator;
