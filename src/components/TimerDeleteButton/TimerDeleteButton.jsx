import React from 'react';
import PropTypes from 'prop-types';
import { IonButton } from '@ionic/react';

const TimerDeleteButton = ({
  active,
  complete,
  superTimerActive,
  deleteTimer,
  id,
}) =>
  active || complete || superTimerActive ? null : (
    <div>
      <IonButton onClick={() => deleteTimer(id)}>Delete</IonButton>
    </div>
  );

TimerDeleteButton.propTypes = {
  active: PropTypes.bool.isRequired,
  complete: PropTypes.bool.isRequired,
  superTimerActive: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  deleteTimer: PropTypes.func.isRequired,
};

export default TimerDeleteButton;
