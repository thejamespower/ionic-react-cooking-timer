import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';
import TimerDeleteButton from './TimerDeleteButton';
import { deleteTimer } from '../../action-creators';

const mapStateToProps = null;

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      deleteTimer,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(TimerDeleteButton);
