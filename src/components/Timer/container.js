import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';
import Timer from './Timer';
import { completeTimer } from '../../action-creators';

const mapStateToProps = (state) => ({
  superTimerActive: state.timers.superTimer.active,
  currentCount: state.timers.superTimer.currentCount,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      completeTimer,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
