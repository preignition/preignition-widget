import { html, fixture, expect } from '@open-wc/testing';

import '../src/extension/pwi-textfield.js';

describe('Test pwi-textfield', () => {

  it('passes accessibility test', async () => {
    const el = await fixture(html ` <pwi-textfield label="my label" helper="helper"></pwi-textfield `);
    await expect(el).to.be.accessible();
  });
});
