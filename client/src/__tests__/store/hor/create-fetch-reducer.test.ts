import {createFetchReducer} from '../../../store/hor';

describe(`createFetchReducer should work correctly`, () => {
  const name = `test`;
  const fetch = createFetchReducer(name);
  const fetchActions = fetch.actions;
  const fetchSelectors = fetch.selectors;
  const fetchReducer = fetch.reducer;

  describe(`actions test`, () => {
    it(`requestStart`, () => {
      expect(fetchActions.requestStart()).toStrictEqual({
        type: `${name}/fetch/REQUEST_STARTED`,
        payload: null,
      });

      const controller = new AbortController();
      expect(fetchActions.requestStart(controller)).toStrictEqual({
        type: `${name}/fetch/REQUEST_STARTED`,
        payload: controller,
      });
    });

    it(`requestFinished`, () => {
      expect(fetchActions.requestFinished()).toStrictEqual({
        type: `${name}/fetch/REQUEST_FINISHED`,
      });
    });

    it(`requestFailed`, () => {
      expect(fetchActions.requestFailed(`err`)).toStrictEqual({
        type: `${name}/fetch/REQUEST_FAILED`,
        payload: `err`,
      });
    });

    it(`requestReset`, () => {
      expect(fetchActions.requestReset()).toStrictEqual({
        type: `${name}/fetch/REQUEST_RESET`,
      });
    });

    it(`requestAbort`, () => {
      expect(fetchActions.requestAbort()).toStrictEqual({
        type: `${name}/fetch/REQUEST_ABORT`,
      });
    });
  });

  describe(`reducer test`, () => {
    it(`initState`, () => {
      expect(fetchReducer(undefined, {type: `any`})).toStrictEqual({
        status: `idle`,
        error: null,
        controller: null,
      });
    });

    it(`actions`, () => {
      expect(fetchReducer(undefined, fetchActions.requestStart())).toStrictEqual({
        status: `loading`,
        error: null,
        controller: null,
      });
      expect(fetchReducer(undefined, fetchActions.requestFinished())).toStrictEqual({
        status: `success`,
        error: null,
        controller: null,
      });
      expect(fetchReducer(undefined, fetchActions.requestFailed(`err`))).toStrictEqual({
        status: `error`,
        error: `err`,
        controller: null,
      });
      expect(fetchReducer(undefined, fetchActions.requestReset())).toStrictEqual({
        status: `idle`,
        error: null,
        controller: null,
      });

      const controller = new AbortController();
      expect(fetchReducer(undefined, fetchActions.requestStart(controller))).toStrictEqual({
        status: `loading`,
        error: null,
        controller,
      });
      expect(fetchReducer(undefined, fetchActions.requestAbort())).toStrictEqual({
        status: `aborted`,
        error: null,
        controller: null,
      });
    });
  });

  describe(`selectors test`, () => {
    it(`default`, () => {
      const store = {
        status: `idle`,
        error: null,
        controller: null,
      } as any;

      expect(fetchSelectors.getStatus(store)).toBe(`idle`);
      expect(fetchSelectors.getIsLoading(store)).toBe(false);
      expect(fetchSelectors.getIsError(store)).toBe(false);
      expect(fetchSelectors.getError(store)).toBe(null);
    });
  });
});
