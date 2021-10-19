import PropTypes from "prop-types";
import CharacterSeparatedPill from "./CharacterSeparatedPill";

const propTypes = {
  // this callback receives the index of the pill to be removed
  onRemoveClick: PropTypes.func.isRequired,

  pillTexts: PropTypes.arrayOf(PropTypes.string).isRequired,
};
const defaultProps = {};

export default function CharacterSeparatedPillsList({ onRemoveClick, pillTexts }) {
  return (
    <ul className="flex w-full px-2 py-2 border border-gray-300 rounded">
      {
        pillTexts.map((pillText, pillIdx) => (
          <CharacterSeparatedPill
            key={`${pillText}-${pillIdx}`}
            onRemoveClick={() => onRemoveClick(pillIdx)}
            pillText={pillText}
          />
        ))
      }
    </ul>
  );
};

CharacterSeparatedPillsList.propTypes = propTypes;
CharacterSeparatedPillsList.defaultProps = defaultProps;
