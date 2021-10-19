import React from 'react';
import CharacterSeparatedPillsList from '../components/CharacterSeparatedPills/CharacterSeparatedPillsList';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Pills/PillsList',
  component: CharacterSeparatedPillsList,
};


export const Primary = (args) => <CharacterSeparatedPillsList />;
