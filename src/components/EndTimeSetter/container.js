import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import EndTimeSetter from './EndTimeSetter';
import { setEndTime } from '../../action-creators';

const mapStateToProps = null;

const mapDispatchToProps = dispatch =>
  bindActionCreators({ setEndTime }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(EndTimeSetter);
