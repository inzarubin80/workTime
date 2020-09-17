import { SET_CURRENTDATE, EDIT_EVENT, ADD_EVENT} from '../types'
import { EVENTS_DATA } from '../../data/dummy-data'

const initialState = {
    EVENTS: EVENTS_DATA,
    currentDate: new Date(),
    currentId: 2,
};

export default (state = initialState, action) => {

    switch (action.type) {

        case SET_CURRENTDATE: {
            return Object.assign({}, state, {
                currentDate: action.payload
            })
        }
        case EDIT_EVENT: {

            return Object.assign({}, state, {
                EVENTS: state.EVENTS.map(event => {
                    if (event.id !== action.payload.id) {
                        return event
                    }

                    return Object.assign({}, event, {
                        date: action.payload.date,
                        title: action.payload.title,
                        duration: action.payload.duration,
                        summary: action.payload.summary
                    })
                })
            })
        }

        case ADD_EVENT: {
            return Object.assign({}, state, {
                EVENTS: state.EVENTS.concat({
                    id: (state.currentId + 1).toString(),
                    date: action.payload.date,
                    title: action.payload.title,
                    duration: action.payload.duration,
                    summary: action.payload.summary
                })
            },

                {
                    currentId: state.currentId + 1
                }

            )
        }

        default:

            return state
    }
}
