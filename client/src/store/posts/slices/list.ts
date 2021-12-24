import NameSpace from '../../name-space';
import {IPostPreview} from '../../../types';
import {createListReducer} from '../../hor';
import {DataUtils} from '../../../utils';

const list = createListReducer<IPostPreview>(`${[NameSpace.POSTS]}`, DataUtils.createDefaultPosts(6));
const listActions = list.actions;
const listSelectors = list.selectors;
const listReducer = list.reducer;

export {listActions, listSelectors, listReducer};
