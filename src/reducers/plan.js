import {
    INITIAL_PLAN,
    ADD_PLACE_TO_PLAN,
    EXCHANGE_DATES,
    UPDATE_ONE_DAY_PLAN
} from "../actions"

export default (state = {}, {type, payload}) => {
    switch (type) {
        case INITIAL_PLAN:
            return payload
        case ADD_PLACE_TO_PLAN:
            return payload
        case EXCHANGE_DATES:
            return payload
        case UPDATE_ONE_DAY_PLAN:
            return payload
        default:
            return state
    }

}
