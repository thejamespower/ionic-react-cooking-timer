import React from 'react';
import PropTypes from 'prop-types';
import { IonIcon, IonItemOption } from '@ionic/react';
import { checkmark } from 'ionicons/icons';
import { useDispatch } from 'react-redux';
import { deleteTimer } from '../../state/timers/timersSlice';

const TimerCompleteButton = ({ id }) => {
  const dispatch = useDispatch();

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
