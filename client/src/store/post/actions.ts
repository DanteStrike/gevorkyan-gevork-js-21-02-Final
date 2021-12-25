import {itemActions} from './slices/item';
import {fetchActions} from './slices/fetch';
import {listActions} from './slices/list';

const actions = {
  fetchActions,
  ...itemActions,
  ...listActions,
};

export default actions;
