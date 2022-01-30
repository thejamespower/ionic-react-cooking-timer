import React from 'react';
import PropTypes from 'prop-types';
import TimeField from 'react-simple-timefield';

export type Duration = string;

export default function CustomTimeField(props: {
  onChange: (time: Duration) => void;
  value: Duration;
}) {
  const { onChange, value } = props;
  new Date(Date.parse(`01 Jan 1970 ${value} GMT`)).toISOString();

  return (
    <>
      <TimeField
        showSeconds
        value={value}
        onChange={(event, time) => onChange(time)}
      />
      {/*<IonDatetime*/}
      {/*  presentation="time"*/}
      {/*  value={renderValue}*/}
      {/*  onIonChange={({ detail: { value: newValue } }) => {*/}
      {/*    return onChange(convertDateToDuration(newValue));*/}
      {/*  }}*/}
      {/*  showDefaultButtons*/}
      {/*/>*/}
    </>
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
