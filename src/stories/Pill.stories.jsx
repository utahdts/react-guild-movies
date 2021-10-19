import React from 'react';
import CharacterSeparatedPill from '../components/CharacterSeparatedPills/CharacterSeparatedPill';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Pills/Pill',
  component: CharacterSeparatedPill,
};

export const Primary = (args) => <CharacterSeparatedPill pillText={args.pillText} onRemoveClick={() => { }} />;
