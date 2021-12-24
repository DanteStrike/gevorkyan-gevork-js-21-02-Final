import {DomUtils} from '../../utils';

describe(`DomUtils should work correctly`, () => {
  it(`createDefaultUsers test`, () => {
    expect(document.body.className).toBe(``);
    DomUtils.addBodyClass(`test`);
    expect(document.body.className).toBe(`test`);
    DomUtils.removeBodyClass(`test`);
    expect(document.body.className).toBe(``);
  });
});
