import React from 'react';
import PropTypes from 'prop-types';
import { IonIcon, IonItemOption } from '@ionic/react';
import { trash } from 'ionicons/icons';
import { useAppDispatch } from '../../hooks';
import { deleteTimer } from '../../state/timers/timersSlice';

const TimerDeleteButton = ({ id }: { id: string }) => {
  const dispatch = useAppDispatch();

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
