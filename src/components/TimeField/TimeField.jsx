import React from 'react';
import TimeField from 'react-simple-timefield';
import PropTypes from 'prop-types';
import { IonInput } from '@ionic/react';

export const Input = ({ onChange }) => {
  return <IonInput inputMode="numeric" onIonChange={onChange} />;
};

export default function CustomTimeField(props) {
  const { onChange, value } = props;

  return (
    <TimeField
      showSeconds
      value={value}
      onChange={(event, time) => onChange(time)}
    />
  );
}

CustomTimeField.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string,
};

CustomTimeField.defaultProps = {
  onChange: null,
  value: null,
};
