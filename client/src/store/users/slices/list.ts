import NameSpace from '../../name-space';
import {IUserPreview} from '../../../types';
import {createListReducer} from '../../hor';
import {DataUtils} from '../../../utils';

const list = createListReducer<IUserPreview>(`${[NameSpace.USERS]}`, DataUtils.createDefaultUsers(6));
const listActions = list.actions;
const listSelectors = list.selectors;
const listReducer = list.reducer;

export {listActions, listSelectors, listReducer};
