import React from 'react';
import PropTypes from 'prop-types';
import { IonIcon, IonItemOption } from '@ionic/react';
import { checkmark } from 'ionicons/icons';

const TimerCompleteButton = ({
  active,
  complete,
  superTimerActive,
  deleteTimer: completeTimer,
  id,
}) =>
  active || complete || superTimerActive ? null : (
    <IonItemOption onClick={() => completeTimer(id)} color="success">
      <IonIcon icon={checkmark} />
      Complete
    </IonItemOption>
  );

TimerCompleteButton.propTypes = {
  active: PropTypes.bool.isRequired,
  complete: PropTypes.bool.isRequired,
  superTimerActive: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  deleteTimer: PropTypes.func.isRequired,
};

export default TimerCompleteButton;
