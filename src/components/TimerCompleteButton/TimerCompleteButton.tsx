import React from 'react';
import PropTypes from 'prop-types';
import { IonIcon, IonItemOption } from '@ionic/react';
import { checkmark } from 'ionicons/icons';
import { useAppDispatch } from '../../hooks';
import { deleteTimer } from '../../state/timers/timersSlice';

const TimerCompleteButton = ({ id }: { id: string }) => {
  const dispatch = useAppDispatch();

  return (
    <IonItemOption onClick={() => dispatch(deleteTimer(id))} color="success">
      <IonIcon icon={checkmark} slot="icon-only" />
    </IonItemOption>
  );
};

TimerCompleteButton.propTypes = {
  id: PropTypes.string.isRequired,
};

export default TimerCompleteButton;
