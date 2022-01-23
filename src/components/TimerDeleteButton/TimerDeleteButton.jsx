import React from 'react';
import PropTypes from 'prop-types';
import { IonIcon, IonItemOption } from '@ionic/react';
import { trash } from 'ionicons/icons';

const TimerDeleteButton = ({
  active,
  complete,
  superTimerActive,
  deleteTimer,
  id,
}) =>
  active || complete || superTimerActive ? null : (
    <IonItemOption onClick={() => deleteTimer(id)} color="danger">
      <IonIcon icon={trash} slot="icon-only" />
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
