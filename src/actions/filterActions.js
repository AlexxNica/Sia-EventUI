import * as eventActions from './eventActions'
import deepEquals from 'deep-equal'

export const CHANGE_EVENT_FILTER = 'CHANGE_EVENT_FILTER'

export const addFilter = (history) => (filter, eventType) => (dispatch) => {
    let newFilter = {}
    let oldFilter = filter
    if (!eventType && eventType.id) {
        return
    }

    if (oldFilter && oldFilter.eventTypes && oldFilter.eventTypes.map(eventType => eventType.id).includes(eventType.id)) {
        newFilter = {
            ...oldFilter
        }
    }
    else {
        newFilter = {
            ...oldFilter,
            eventTypes: oldFilter.eventTypes ? oldFilter.eventTypes.concat({
                id: eventType.id,
                name: eventType.name
            }) : [{ id: eventType.id, name: eventType.name }]
        }
    }

    dispatch(applyFilter(history)(oldFilter, newFilter))
}

export const removeFilter = (history) => (oldFilter, eventTypeToDelete) => (dispatch) => {

    if (!oldFilter.eventTypes.map(eventType => eventType.id).includes(eventTypeToDelete.id)) {
        return
    }

    const newFilter = {
        ...oldFilter,
        eventTypes: oldFilter.eventTypes.filter(eventType => eventTypeToDelete.id !== eventType.id)
    }

    dispatch(applyFilter(history)(oldFilter, newFilter))
}

export const applyFilter = (history) => (oldFilter, newFilter) => (dispatch) => {
    if (!newFilter.incidentId) {
        throw 'Need to filter on incidentId!'
    }
    if (!deepEquals(oldFilter, newFilter)) {
        dispatch(changeEventFilter(history)(newFilter))
        dispatch(eventActions.fetchEvents(newFilter))
    }
}

export const changeEventFilter = (history) => (filter) => {
    getUrlFromFilters(history, filter)
    return {
        type: CHANGE_EVENT_FILTER,
        filter
    }
}

export const getUrlFromFilters = (history, filters) => {
    if (filters && filters.eventTypes) {
        history.push(generateUrl(history, filters))
    }
}

export const generateUrl = (history, filters) => {
    return /tickets/ + filters.ticketId + serializeEventTypesForUrl(filters.eventTypes)
}

const serializeEventTypesForUrl = (eventTypes) => {
    if (!eventTypes || eventTypes.length === 0) {
        return ''
    }
    return '/?' + eventTypes.map(eventType => `eventTypes=${eventType.id}`).join('&')
}
