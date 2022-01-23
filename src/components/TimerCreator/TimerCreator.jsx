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
  IonCardHeader,
  IonCardTitle,
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
  IonGrid,
  IonCol,
  IonRow,
  IonPopover,
  IonDatetime,
} from '@ionic/react';
import { close, time } from 'ionicons/icons';

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
    const { close, isOpen } = this.props;

    return (
      <IonModal isOpen={isOpen}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Create a timer</IonTitle>
            <IonButtons slot="end">
              <IonButton
                onClick={() => {
                  close();
                }}
              >
                <IonIcon icon={close} />
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>

        <IonContent fullscreen>
          <IonList>
            <IonItem>
              <IonLabel>Name</IonLabel>
              <IonInput
                color="primary"
                slot="end"
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
              <IonPopover trigger="open-time-input" showBackdrop={false}>
                <CustomTimeField
                  value={duration}
                  onChange={this.changeDuration}
                />
              </IonPopover>
            </IonItem>

            {!!subTimers.length && (
              <>
                <IonList>
                  <IonListHeader>Sub timers</IonListHeader>
                  {subTimers.map((subTimer) => (
                    <IonCard key={subTimer.id}>
                      <IonToolbar>
                        <IonButtons slot="end">
                          <IonButton
                            onClick={() => {
                              this.removeSubTimer(subTimer.id);
                            }}
                          >
                            <IonIcon icon={close} />
                          </IonButton>
                        </IonButtons>
                      </IonToolbar>

                      <IonItem>
                        <IonLabel>Name</IonLabel>
                        <IonInput
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
                    </IonCard>
                  ))}
                </IonList>
              </>
            )}
          </IonList>
          <IonGrid>
            <IonRow>
              <IonCol>
                <IonButton
                  color="secondary"
                  expand="block"
                  onClick={() => {
                    this.createSubTimer();
                  }}
                >
                  Do something else to it?
                </IonButton>
              </IonCol>
              <IonCol>
                <IonButton
                  // @TODO: validate button before submit
                  // @TODO: disable button if invalid
                  color="primary"
                  expand="block"
                  onClick={() => {
                    this.addTimerToSuperTimer();
                    close();
                  }}
                >
                  Create timer
                </IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonModal>
    );
  }
}

export default TimerCreator;
