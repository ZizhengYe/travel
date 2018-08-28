import {
    FETCH_PLACE_DETAILS,
} from "../actions"
import _ from 'lodash'


export default (state = {}, {type, payload}) => {
    switch (type) {
        case FETCH_PLACE_DETAILS:
            const temp = _.mapKeys( payload.data, 'id')
            temp[payload.data.details.id].reviews = payload.data.reviews
            return { ...state, ..._.omit(temp, ['undefined']) }
        default:
            return state
    }
}
