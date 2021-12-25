import {createItemReducer} from '../../../store/hor';

describe(`createItemReducer should work correctly`, () => {
  const name = `test`;
  const item = createItemReducer(name, `initText`);
  const itemActions = item.actions;
  const itemReducer = item.reducer;

  describe(`actions test`, () => {
    it(`set`, () => {
      expect(itemActions.set(`newText`)).toStrictEqual({
        type: `${name}/item/SET`,
        payload: `newText`,
      });
    });

    it(`reset`, () => {
      expect(itemActions.reset()).toStrictEqual({
        type: `${name}/item/RESET`,
      });
    });
  });

  describe(`reducer test`, () => {
    it(`initState`, () => {
      expect(itemReducer(undefined, {type: `any`})).toBe(`initText`);
    });

    it(`actions`, () => {
      expect(itemReducer(`anyText`, itemActions.set(`newText`))).toBe(`newText`);
      expect(itemReducer(`anyText`, itemActions.reset())).toBe(`initText`);
    });
  });
});
