import {
    SET_TO_DATE
} from "../actions";

export default (state = null, {type, payload}) => {
    switch (type) {
        case SET_TO_DATE:
            return payload
        default:
            return state
    }

}
