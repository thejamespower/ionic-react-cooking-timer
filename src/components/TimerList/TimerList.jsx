import React from 'react';
import PropTypes from 'prop-types';
import { IonList } from '@ionic/react';
import { useSelector } from 'react-redux';

import Timer from '../Timer';
import { selectTimers } from '../../state/timers/timersSlice';

const TimerList = () => {
  const [...timers] = useSelector(selectTimers);

  return timers.length ? (
    <IonList>
      {timers
        .sort((a, b) => a.timeToStartInSeconds - b.timeToStartInSeconds)
        .map((timer) => (
          <Timer key={timer.id} timer={timer} />
        ))}
    </IonList>
  ) : null;
};

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
