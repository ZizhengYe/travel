import {
    YELP_AUTOCOMPLETE
} from '../actions'
import _ from 'lodash'

export default (state = {}, {type, payload}) => {
    switch( type ) {
        case YELP_AUTOCOMPLETE:
            return _.reduce(payload, (result, value, key) => {
                return _.concat(result, {'class': key}, value)
            }, [])
        default:
            return state
    }
}
