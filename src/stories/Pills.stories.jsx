import React from 'react';
import CharacterSeparatedPills from '../components/CharacterSeparatedPills/CharacterSeparatedPills';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Pills/Pills',
  component: CharacterSeparatedPills,
};

export const Primary = (args) => <CharacterSeparatedPills />
