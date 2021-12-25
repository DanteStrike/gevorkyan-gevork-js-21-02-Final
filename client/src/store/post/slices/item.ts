import NameSpace from '../../name-space';
import {createItemReducer} from '../../hor';
import {IPostPreview} from '../../../types';
import {DataUtils} from '../../../utils';

const item = createItemReducer<IPostPreview>(`${[NameSpace.POST]}`, DataUtils.createDefaultPost());
const itemActions = item.actions;
const itemSelectors = item.selectors;
const itemReducer = item.reducer;

export {itemActions, itemSelectors, itemReducer};
