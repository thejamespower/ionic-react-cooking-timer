import { connect } from 'react-redux';

import TimerList from './TimerList';

const mapStateToProps = state => ({
  timers: state.timers.timers,
});

const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(TimerList);
