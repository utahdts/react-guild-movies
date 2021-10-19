import { useState } from 'react';

const propTypes = {
  pills: PropTypes.shape({

  }),
  separator: PropTypes.string,

  onAddPill: PropTypes.func,
};
const defaultProps = {};

export default CharacterSeparatedPills = ({ items, onAddPill, separate = ',' }) => {
  const [value, setValue] = useState('');

  const watch = (value) => {
    if (value.slice(-1) === separate) {
      onAddPill(value.slice(0, -1));
      setValue('');
    }
  };

  return (
    <ul className="flex w-full px-2 py-2 border border-gray-300 rounded">
      {
        items.map(item => {
          <li className="px-2 py-1 mx-1 bg-blue-200 border border-blue-600 rounded">{item}</li>
        })
      }
      <li className="flex-grow">
        <input type="text" className="w-full px-2 py-1" value={value} onChange={(event) => {
          setValue(event.target.value);
          watch(event.target.value)
        }} />
      </li>
    </ul>
  );
};

CharacterSeparatedPills.propTypes = propTypes;
CharacterSeparatedPills.defaultProps = defaultProps;
