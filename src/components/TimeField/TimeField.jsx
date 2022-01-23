import React from 'react';
import PropTypes from 'prop-types';
import { IonDatetime } from '@ionic/react';

export const convertDateToDuration = (value) => {
  return value.substr(11, 8);
};

export default function CustomTimeField(props) {
  const { onChange, value } = props;
  const renderValue = new Date(
    Date.parse(`01 Jan 1970 ${value} GMT`),
  ).toISOString();

  // console.log(value, renderValue);

  return (
    <IonDatetime
      presentation="time"
      value={renderValue}
      onIonChange={({ detail: { value: newValue } }) => {
        return onChange(convertDateToDuration(newValue));
      }}
      showDefaultButtons
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
