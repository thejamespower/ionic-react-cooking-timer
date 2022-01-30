import React from 'react';
import PropTypes from 'prop-types';
import { IonIcon, IonItemOption } from '@ionic/react';
import { checkmark } from 'ionicons/icons';
import { deleteTimer } from '../../state/timers/timersSlice';
import { useDispatch } from 'react-redux';

const TimerCompleteButton = ({ active, superTimerActive, id }) => {
  const dispatch = useDispatch();

  return !active || !superTimerActive ? null : (
    <IonItemOption onClick={() => dispatch(deleteTimer(id))} color="success">
      <IonIcon icon={checkmark} slot="icon-only" />
    </IonItemOption>
  );
};

TimerCompleteButton.propTypes = {
  active: PropTypes.bool.isRequired,
  complete: PropTypes.bool.isRequired,
  superTimerActive: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
};

export default TimerCompleteButton;
