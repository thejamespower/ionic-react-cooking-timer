import React from 'react';
import PropTypes from 'prop-types';
import { IonIcon, IonItemOption } from '@ionic/react';
import { trash } from 'ionicons/icons';
import { useDispatch } from 'react-redux';
import { deleteTimer } from '../../state/timers/timersSlice';

const TimerDeleteButton = ({ id }) => {
  const dispatch = useDispatch();

  return (
    <IonItemOption onClick={() => dispatch(deleteTimer(id))} color="danger">
      <IonIcon icon={trash} slot="icon-only" />
    </IonItemOption>
  );
};

TimerDeleteButton.propTypes = {
  id: PropTypes.string.isRequired,
};

export default TimerDeleteButton;
