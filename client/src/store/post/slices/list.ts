import NameSpace from '../../name-space';
import {IComment} from '../../../types';
import {createListReducer} from '../../hor';
import {DataUtils} from '../../../utils';

const list = createListReducer<IComment>(`${[NameSpace.POST]}`, DataUtils.createDefaultComments(2));
const listActions = list.actions;
const listSelectors = list.selectors;
const listReducer = list.reducer;

export {listActions, listSelectors, listReducer};
