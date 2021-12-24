import NameSpace from '../../name-space';
import {createItemReducer} from '../../hor';
import {IUser} from '../../../types';
import {DataUtils} from '../../../utils';

const item = createItemReducer<IUser>(`${[NameSpace.PROFILE]}`, DataUtils.createDefaultFullUser());
const itemActions = item.actions;
const itemSelectors = item.selectors;
const itemReducer = item.reducer;

export {itemActions, itemSelectors, itemReducer};
