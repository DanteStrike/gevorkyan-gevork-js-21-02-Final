import {createListReducer} from '../../../store/hor';

describe(`createItemReducer should work correctly`, () => {
  const name = `test`;
  const list = createListReducer(name);
  const listActions = list.actions;
  const listReducer = list.reducer;

  describe(`actions test`, () => {
    it(`setup`, () => {
      expect(listActions.setup({total: 10, data: [`test`]})).toStrictEqual({
        type: `${name}/list/SETUP`,
        payload: {total: 10, data: [`test`]},
      });
    });

    it(`changePage`, () => {
      expect(listActions.changePage(1)).toStrictEqual({
        type: `${name}/list/CHANGE_PAGE`,
        payload: 1,
      });
    });

    it(`resetList`, () => {
      expect(listActions.resetList()).toStrictEqual({
        type: `${name}/list/RESET`,
      });
    });
  });

  describe(`reducer test`, () => {
    it(`initState`, () => {
      expect(listReducer(undefined, {type: `any`})).toStrictEqual({
        current: 1,
        total: 0,
        data: [],
      });
    });

    it(`actions`, () => {
      expect(listReducer(undefined, listActions.setup({total: 10, data: [`test`]}))).toStrictEqual({
        current: 1,
        total: 10,
        data: [`test`],
      });
      expect(listReducer(undefined, listActions.changePage(2))).toStrictEqual({
        current: 2,
        total: 0,
        data: [],
      });
      expect(listReducer(undefined, listActions.resetList())).toStrictEqual({
        current: 1,
        total: 0,
        data: [],
      });
    });
  });
});
