import React, { useState } from 'react';
import {
  IonButton,
  IonIcon,
  IonItem,
  IonLabel,
  useIonPopover,
} from '@ionic/react';

import { setEndTime as setEndTimeAction } from '../../state/timers/timersSlice';
import CustomTimeField from '../TimeField';
import { useAppDispatch } from '../../hooks';
import { time } from 'ionicons/icons';
import { Duration } from '../TimeField/TimeField';

const initialState: Duration | null = null;

const PopOver: React.FC<{
  onHide: () => void;
  endTime: Duration;
  setEndTime: (x: Duration) => void;
}> = ({ onHide, endTime, setEndTime }) => {
  const dispatch = useAppDispatch();

  return (
    <>
      <CustomTimeField
        value={endTime ? endTime : '00:00:00'}
        onChange={(x) => setEndTime(x)}
      />
      <IonButton
        id="button"
        color="primary"
        expand="block"
        onClick={() => {
          dispatch(setEndTimeAction(endTime));
          onHide();
        }}
      >
        Save
      </IonButton>
    </>
  );
};

const EndTimeSetter = () => {
  const [endTime, setEndTime] = useState(initialState);
  const [present, dismiss] = useIonPopover(PopOver, {
    onHide: () => dismiss(),
    endTime: endTime,
    setEndTime: setEndTime,
  });

  return (
    <IonItem>
      <IonLabel>End time</IonLabel>
      <IonButton
        fill="clear"
        onClick={(e) =>
          present({
            event: e.nativeEvent,
          })
        }
      >
        {endTime ? endTime : 'Not set'}
        <IonIcon icon={time} />
      </IonButton>
    </IonItem>
  );
};

export default EndTimeSetter;
