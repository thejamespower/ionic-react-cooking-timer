import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { IonButton, IonItem, IonLabel } from '@ionic/react';
import CustomTimeField from '../TimeField';

const initialState = '19:00:00';

const EndTimeSetter = ({ setEndTime: setEndTimeAction }) => {
  const [endTime, setEndTime] = useState(initialState);

  return (
    <IonItem>
      <IonLabel>End time</IonLabel>
      <CustomTimeField value={endTime} onChange={(x) => setEndTime(x)} />
      <IonButton
        color="primary"
        expand="block"
        onClick={() => {
          setEndTimeAction(endTime);
        }}
      >
        Set end time
      </IonButton>
    </IonItem>
  );
};

EndTimeSetter.propTypes = {
  setEndTime: PropTypes.func.isRequired,
};

export default EndTimeSetter;
