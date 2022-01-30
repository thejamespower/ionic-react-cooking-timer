import React from 'react';
import PropTypes from 'prop-types';
import { IonIcon, IonItemOption } from '@ionic/react';
import { checkmark } from 'ionicons/icons';
import { deleteTimer } from '../../state/timers/timersSlice';
import { useDispatch } from 'react-redux';

const TimerCompleteButton = ({ hide = false, id }) => {
  const dispatch = useDispatch();

  return hide ? null : (
    <IonItemOption onClick={() => dispatch(deleteTimer(id))} color="success">
      <IonIcon icon={checkmark} slot="icon-only" />
    </IonItemOption>
  );
};

TimerCompleteButton.propTypes = {
  hide: PropTypes.bool,
  id: PropTypes.string.isRequired,
};

export default TimerCompleteButton;
