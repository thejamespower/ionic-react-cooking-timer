import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CustomTimeField from '../TimeField';
import convertSecondsToDuration from '../../lib/convertSecondsToDuration';
import convertDurationToSeconds from '../../lib/convertDurationToSeconds';
import { v4 as uuid } from 'uuid';
import {
  IonButton,
  IonModal,
  IonCard,
  IonCardContent,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonButtons,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonList,
  IonText,
  IonListHeader,
  IonPopover,
  IonFooter,
} from '@ionic/react';
import { add, checkmark, close, time } from 'ionicons/icons';

const zeroDuration = '00:00:00';

const USE_DEV_STATE = true;

const initialState = USE_DEV_STATE
  ? {
      duration: '00:02:00',
      subTimers: [
        {
          name: 'Flip',
          id: 'flip',
          parentId: 'chips',
          duration: '00:01:00',
        },
      ],
      name: 'Chips 🍟',
      id: 'chips',
    }
  : {
      duration: zeroDuration,
      subTimers: [],
      name: '',
    };

class TimerCreator extends Component {
  static propTypes = {
    createTimer: PropTypes.func.isRequired,
    createSubTimer: PropTypes.func.isRequired,
    close: PropTypes.func,
    isOpen: PropTypes.bool,
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
    console.log(subTimer, duration);
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

    subTimers.map((subTimer) => {
      const offsetInSeconds =
        convertDurationToSeconds(duration) -
        convertDurationToSeconds(subTimer.duration);
      const offset = convertSecondsToDuration(offsetInSeconds);

      return createSubTimer({
        duration: subTimer.duration,
        id: uuid(),
        parentId,
        name: `${subTimer.name} ${name}`,
        offset,
      });
    });

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
    const { close: onClose, isOpen } = this.props;

    return (
      <IonModal isOpen={isOpen}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Create a timer</IonTitle>
            <IonButtons slot="end">
              <IonButton
                onClick={() => {
                  onClose();
                }}
              >
                <IonIcon icon={close} />
                Close
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>

        <IonContent fullscreen>
          <IonList>
            <IonItem>
              <IonLabel>Name</IonLabel>
              <IonInput
                placeholder={'chips, chicken'}
                value={name}
                onIonChange={this.handleChange('name')}
                inputMode="text"
                required
              />
            </IonItem>

            <IonItem>
              <IonLabel>Duration</IonLabel>
              <IonButton fill="clear" id="open-time-input">
                {duration}
                <IonIcon icon={time} />
              </IonButton>
              {/*<IonPopover trigger="open-time-input" showBackdrop={false}>*/}
              <CustomTimeField
                value={duration}
                onChange={this.changeDuration}
              />
              {/*</IonPopover>*/}
            </IonItem>

            <IonList>
              <IonListHeader>
                <IonText>Sub timers</IonText>
                <IonButton
                  color="secondary"
                  onClick={() => {
                    this.createSubTimer();
                  }}
                >
                  <IonIcon icon={add} />
                  Add sub timer
                </IonButton>
              </IonListHeader>
              {!!subTimers.length && (
                <>
                  {subTimers.map((subTimer) => (
                    <IonCard key={subTimer.id}>
                      <IonToolbar>
                        <IonTitle>Sub timer</IonTitle>
                        <IonButtons slot="end">
                          <IonButton
                            onClick={() => {
                              this.removeSubTimer(subTimer.id);
                            }}
                          >
                            <IonIcon icon={close} />
                            Delete
                          </IonButton>
                        </IonButtons>
                      </IonToolbar>
                      <IonCardContent>
                        <IonItem>
                          <IonLabel>Action</IonLabel>
                          <IonInput
                            placeholder={'flip, check, stir'}
                            value={subTimer.name}
                            onIonChange={(event) =>
                              this.changeSubTimerName(
                                subTimer,
                                event.target.value,
                              )
                            }
                          />
                        </IonItem>

                        <IonItem>
                          <IonLabel>Duration</IonLabel>
                          <IonButton
                            fill="clear"
                            id={`open-time-input-${subTimer.id}`}
                          >
                            {subTimer.duration}
                            <IonIcon icon={time} />
                          </IonButton>
                          <IonPopover
                            trigger={`open-time-input-${subTimer.id}`}
                            showBackdrop={false}
                          >
                            <CustomTimeField
                              value={subTimer.duration}
                              onChange={(value) =>
                                this.changeSubTimerDuration(subTimer, value)
                              }
                            />
                          </IonPopover>
                        </IonItem>
                      </IonCardContent>
                    </IonCard>
                  ))}
                </>
              )}
            </IonList>
          </IonList>
        </IonContent>
        <IonFooter>
          <IonToolbar>
            <IonButtons slot="end">
              <IonButton
                disabled={
                  // @TODO: validate subTimers
                  convertDurationToSeconds(duration) === 0 || name?.length === 0
                }
                color="primary"
                onClick={() => {
                  this.addTimerToSuperTimer();
                  // @TODO: close on submit
                  onClose();
                }}
              >
                <IonIcon icon={checkmark} />
                Create timer
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonFooter>
      </IonModal>
    );
  }
}

export default TimerCreator;
