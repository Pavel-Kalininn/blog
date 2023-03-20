import { Tag as TagAntd } from 'antd';
import PropTypes from 'prop-types';

export default function Tag({ label }) {
  return <TagAntd>{label}</TagAntd>;
}

Tag.propTypes = {
  label: PropTypes.string.isRequired,
};
