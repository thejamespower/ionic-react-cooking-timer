import React from 'react';
import PropTypes from 'prop-types';
import { IonIcon, IonItemOption } from '@ionic/react';
import { trash } from 'ionicons/icons';
import { useDispatch } from 'react-redux';
import { deleteTimer } from '../../state/timers/timersSlice';

const TimerDeleteButton = ({ active, complete, superTimerActive, id }) => {
  const dispatch = useDispatch();
  return active || complete || superTimerActive ? null : (
    <IonItemOption onClick={() => dispatch(deleteTimer(id))} color="danger">
      <IonIcon icon={trash} slot="icon-only" />
    </IonItemOption>
  );
};

TimerDeleteButton.propTypes = {
  active: PropTypes.bool.isRequired,
  complete: PropTypes.bool.isRequired,
  superTimerActive: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
};

export default TimerDeleteButton;
