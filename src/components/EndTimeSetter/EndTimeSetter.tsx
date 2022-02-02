import React, { useState } from 'react';
import { IonButton, IonItem, IonLabel } from '@ionic/react';

import { setEndTime as setEndTimeAction } from '../../state/timers/timersSlice';
import CustomTimeField from '../TimeField';
import { useAppDispatch } from '../../hooks';

const initialState = '19:00:00';

const EndTimeSetter = () => {
  const [endTime, setEndTime] = useState(initialState);

  const dispatch = useAppDispatch();

  return (
    <IonItem>
      <IonLabel>End time</IonLabel>
      <CustomTimeField value={endTime} onChange={(x) => setEndTime(x)} />
      <IonButton
        color="primary"
        expand="block"
        onClick={() => {
          dispatch(setEndTimeAction(endTime));
        }}
      >
        Set end time
      </IonButton>
    </IonItem>
  );
};

export default EndTimeSetter;