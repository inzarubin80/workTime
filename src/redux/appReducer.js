import { SET_CURRENTDATE, EDIT_EVENT, ADD_EVENT, SET_LOGIN_STATE } from './types'
import { EVENTS_DATA } from '../data/dummy-data'

const initialState = {
    EVENTS: EVENTS_DATA,
    currentDate: '2017-09-07',
    currentId: 2,
    isLoggedIn: false,
    username: '',
    password: ''

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

        case SET_LOGIN_STATE:
            return {
                ...state,
                ...action.payload, // this is what we expect to get back from API call and login page input
                isLoggedIn: true, // we set this as true on login
            };

        default:

            return state
    }
}
