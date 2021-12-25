import {fetchActions} from './slices/fetch';
import {listActions} from './slices/list';

const actions = {
  ...listActions,
  ...fetchActions,
};

export default actions;
