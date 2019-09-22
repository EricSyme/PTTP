import {createStore, combineReducers} from 'redux';
import { Recordings } from './recordings';
import { Comments } from './comments';
import { Promotions } from './promotions';
import { Leaders } from './leaders';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            recordings: Recordings,
            comments: Comments,
            promotions: Promotions,
            leaders: Leaders
        })
    );

    return store;
}