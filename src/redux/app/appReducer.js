import { SET_CURRENTDATE, EDIT_EVENT, ADD_EVENT, FETCH_EVENTS_SUCCESS, SET_CURRENTMONTH } from '../types'
import Partner from '../../model/partner'
import Project from '../../model/project'
import moment from 'moment';



const initialState = {

    events: [],
    currentDate: moment().format('YYYY-MM-DD'),
    currentMonth: new Date(),
    currentId: 0,
    selectPartner: new Partner(),
    selectProject: new Project()
};

export default (state = initialState, action) => {

    switch (action.type) {

        case SET_CURRENTDATE: {
            return Object.assign({}, state, {
                currentDate: action.payload
            })
        }

        case SET_CURRENTMONTH: {
            return Object.assign({}, state, {
                currentMonth: action.payload
            })
        }

        case EDIT_EVENT: {

            return Object.assign({}, state, {
                events: state.events.map(event => {
                    if (event.id !== action.payload.id) {
                        return event
                    }

                    return Object.assign({}, event, {
                        date: action.payload.date,
                        title: action.payload.title,
                        duration: action.payload.duration,
                        summary: action.payload.summary,
                        partner: action.payload.partner,
                        project: action.payload.project
                        
                    })
                })
            })
        }

        case ADD_EVENT: {

            return {...state, events:[...state.events, action.payload]}

        }

        case FETCH_EVENTS_SUCCESS:

            return { ...state, events:action.payload}

            
        default:

            return state
    }
}
