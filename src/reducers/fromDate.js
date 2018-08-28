import {
    SET_FROM_DATE,
} from "../actions";

export default (state = null, {type, payload}) => {
    switch (type) {
        case SET_FROM_DATE:
            return payload

        default:
            return state
    }

}
