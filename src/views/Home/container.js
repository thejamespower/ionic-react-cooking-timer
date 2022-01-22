import { connect } from 'react-redux';
import Home from './Home';

const mapStateToProps = state => ({
  timers: state.timers.timers,
});

const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(Home);
