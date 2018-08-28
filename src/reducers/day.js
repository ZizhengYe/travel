import {
    SELECT_DAY_TO_ADD_PLACE
} from "../actions";

export default (state = {}, {type, payload}) => {
    switch (type) {
        case SELECT_DAY_TO_ADD_PLACE:
            return payload
        default:
            return state
    }

}
