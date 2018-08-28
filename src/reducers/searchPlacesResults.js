import {
    SEARCH_BY_INPUT_VALUE_ID,
    SEARCH_BY_INPUT_VALUE,
    CANCEL_INPUT
} from '../actions'
import _ from 'lodash'

export default (state = [], {type, payload}) => {
    switch (type) {
        case SEARCH_BY_INPUT_VALUE:
            return _.map(payload.data.businesses, (place) => ({
                lat:place.coordinates.latitude,
                lng:place.coordinates.longitude,
                place:place
            }))
        case SEARCH_BY_INPUT_VALUE_ID:
            return [{
                        lat: payload.data.details.coordinates.latitude,
                        lng: payload.data.details.coordinates.longitude,
                        place: payload.data.details
                   }]
        case CANCEL_INPUT:
            return []
        default:
            return state
    }

}
