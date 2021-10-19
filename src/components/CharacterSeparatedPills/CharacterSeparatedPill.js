import PropTypes from "prop-types";

const propTypes = {
  onRemoveClick: PropTypes.func.isRequired,
  pillText: PropTypes.string.isRequired,
};
const defaultProps = {};

export default function CharacterSeparatedPill({ onRemoveClick, pillText }) {
  return (
    <li className="px-2 py-1 bg-blue-200 border border-blue-600 rounded">
      {pillText}
      <button
        className="ml-2"
        onClick={e => {
          e.preventDefault();
          e.stopPropagation();
          onRemoveClick();
        }}
      >
        x
      </button>
    </li>
  );
};

CharacterSeparatedPill.propTypes = propTypes;
CharacterSeparatedPill.defaultProps = defaultProps;
