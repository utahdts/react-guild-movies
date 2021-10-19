import PropTypes from "prop-types";
import { useEffect, useState } from 'react';
import CharacterSeparatedPill from './CharacterSeparatedPill';

const propTypes = {
  pillTexts: PropTypes.arrayOf(PropTypes.string),
  separator: PropTypes.string,
  onAddPill: PropTypes.func.isRequired,
  onRemovePill: PropTypes.func.isRequired,
};
const defaultProps = {
  pillTexts: [],
  separator: ',',
};


export default function CharacterSeparatedPills({ pillTexts, separator, onAddPill, onRemovePill }) {
  const [newPillValue, setNewPillValue] = useState('');
  const createNewPillKey = ['Enter', 'Tab', separator];

  return (
    <div>
      <ul className="flex flex-wrap w-full gap-2 px-2 py-2 border border-gray-300 rounded">
        {
          (pillTexts || []).map((pillText, pillIdx) => (
            <CharacterSeparatedPill
              key={`${pillText}-${pillIdx}`}
              onRemoveClick={() => onRemovePill(pillIdx)}
              pillText={pillText}
            />
          ))
        }
        <li>
          <input
            className="flex-grow w-full px-3 py-1"
            type="text"
            value={newPillValue}
            onChange={e => setNewPillValue(e.target.value)}
            onKeyDown={e => {
              if (!createNewPillKey.includes(e.key)) {
                return;
              }

              e.preventDefault();
              e.stopPropagation();
              onAddPill(e.target.value);
              setNewPillValue('');
            }}
            autoFocus={true}
          />
        </li>
      </ul>

    </div>
  );
};

CharacterSeparatedPills.propTypes = propTypes;
CharacterSeparatedPills.defaultProps = defaultProps;
