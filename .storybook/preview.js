import { setCompodocJson } from '@storybook/addon-docs/angular';
import docJson from '../documentation.json';
import { withTests } from '@storybook/addon-jest';
import results from '../.jest-test-results.json';

setCompodocJson(docJson);

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  docs: { inlineStories: true },
};

export const decorators = [
  withTests({
    results,
    filesExt: '((\\.specs?)|(\\.tests?))?(\\.ts)?$',
  }),
];
