import {INSET_FAVORITE,REMOVE_FAVORITE, SET_CURRENTDATE} from './types'
import {EVENTS_DATA} from '../data/dummy-data'

const initialState = {
    EVENTS: EVENTS_DATA,
    currentDate:'2017-09-07'
};

export default (state = initialState, action) => {

    console.log('appReducer длина EVENTS ' + state.EVENTS.length);
    
    switch (action.type) {
        
        case SET_CURRENTDATE:
            return { ...state, currentDate: action.payload}
    
        
        default:
            console.log('appReducer длина EVENTS end ' + state.EVENTS.length);
            return state
    }
}
