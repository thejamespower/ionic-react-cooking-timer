import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonItem,
  IonLabel,
} from '@ionic/react';
import CustomTimeField from '../TimeField';

const initialState = {
  endTime: '19:00:00',
};

class EndTimeSetter extends Component {
  static propTypes = {
    setEndTime: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = initialState;

    this.changeEndTime = this.changeEndTime.bind(this);
    this.addEndTime = this.addEndTime.bind(this);
  }

  changeEndTime(endTime) {
    this.setState({ endTime });
  }

  addEndTime() {
    const { setEndTime } = this.props;
    const { endTime } = this.state;
    setEndTime(endTime);
  }

  render() {
    const { endTime } = this.state;

    return (
      <IonItem>
        <IonLabel>End time</IonLabel>
        <CustomTimeField value={endTime} onChange={this.changeEndTime} />
        <IonButton
          color="primary"
          expand="block"
          onClick={() => {
            this.addEndTime(endTime);
          }}
        >
          Set end time
        </IonButton>
      </IonItem>
    );
  }
}

export default EndTimeSetter;
