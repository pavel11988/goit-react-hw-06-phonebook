import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import actions from '../../redux/actions';

import { Label, Search } from './Filter.styled';

const Filter = ({ value, onChange }) => (
  <Label>
    Filter by name:
    <Search type="text" value={value} onChange={onChange} />
  </Label>
);

Filter.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
};

const mapStateToProps = state => ({
  value: state.filter,
});

const mapDispatchToProps = dispatch => ({
  onChange: event => dispatch(actions.changeFilter(event.target.value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
