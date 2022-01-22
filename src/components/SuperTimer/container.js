import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';
import SuperTimer from './SuperTimer';
import {
  startSuperTimer,
  tickSuperTimer,
  completeSuperTimer,
} from '../../action-creators';

const mapStateToProps = state => ({
  superTimer: state.timers.superTimer,
  endTime: state.timers.endTime,
  startTime: state.timers.startTime,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      startSuperTimer,
      tickSuperTimer,
      completeSuperTimer,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(SuperTimer);
