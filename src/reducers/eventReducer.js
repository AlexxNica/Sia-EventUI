import paginated from 'paginated-redux'
import * as eventActions from '../actions/eventActions'
import { mergeWithOverwrite } from './reducerHelpers'
import { combineReducers } from 'redux'

const defaultEventCollection = []

const makeSearchable = (event) => ({
    ...event,
    filterableIncidentId: event.incidentId.toString()
})

const addEventsToState = (state, events) => mergeWithOverwrite(state, events.map(event => makeSearchable(event)))

export const list = (state = defaultEventCollection, action) => {
    switch(action.type){
        case eventActions.RECEIVE_EVENT:
        case eventActions.POST_EVENT_SUCCEED:
            return addEventsToState(state, [action.event])
        case eventActions.RECEIVE_EVENTS:
            return addEventsToState(state, action.events)
        case eventActions.CHANGE_EVENT_FILTER:
            return defaultEventCollection
        default:
            return state
    }
}

export const events = paginated(list, eventActions.pagination.types)

export default combineReducers({
    pages,
    filter
}) 