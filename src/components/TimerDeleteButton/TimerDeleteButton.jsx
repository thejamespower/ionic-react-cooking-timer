import React from 'react';
import PropTypes from 'prop-types';
import { IonItemOption } from '@ionic/react';

const TimerDeleteButton = ({
  active,
  complete,
  superTimerActive,
  deleteTimer,
  id,
}) =>
  active || complete || superTimerActive ? null : (
    <IonItemOption onClick={() => deleteTimer(id)} color="danger">
      Delete
    </IonItemOption>
  );

TimerDeleteButton.propTypes = {
  active: PropTypes.bool.isRequired,
  complete: PropTypes.bool.isRequired,
  superTimerActive: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  deleteTimer: PropTypes.func.isRequired,
};

export default TimerDeleteButton;
