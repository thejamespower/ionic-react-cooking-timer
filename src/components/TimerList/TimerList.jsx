import React from 'react';
import PropTypes from 'prop-types';

import Timer from '../Timer';
import { IonList } from '@ionic/react';

function TimerList(props) {
  const { timers } = props;
  return (
    <IonList>
      {timers.map((timer) => (
        <Timer key={timer.id} timer={timer} />
      ))}
    </IonList>
  );
}

TimerList.propTypes = {
  timers: PropTypes.arrayOf(
    PropTypes.shape({
      duration: PropTypes.string.isRequired,
      durationInSeconds: PropTypes.number.isRequired,
      active: PropTypes.bool.isRequired,
    }),
  ).isRequired,
};

export default TimerList;
