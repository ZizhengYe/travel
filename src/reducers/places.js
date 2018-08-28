import {
    FETCH_PLACES
} from "../actions"
import _ from 'lodash'

export default (state = {}, {type, payload}) => {
    switch (type) {
        case FETCH_PLACES:
            // return payload
            return _.assign({}, _.mapKeys(payload.data.businesses, 'id'), payload.data.region)

        default:
            return state
    }

}
