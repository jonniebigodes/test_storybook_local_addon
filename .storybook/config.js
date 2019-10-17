import { configure } from '@storybook/react';
import requireContext from 'require-context.macro'; // simple component updated

// automatically import all files ending in *.stories.js
//configure(require.context('../src/stories', true, /\.stories\.js$/), module);

// simple component
import '../src/index.css';

//const req = require.context('../src', true, /\.stories.js$/);
const req = requireContext('../src/components', true, /\.stories\.js$/); // updated simple component
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);