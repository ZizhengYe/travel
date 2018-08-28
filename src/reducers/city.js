import {
    SET_CITY
} from "../actions";

export default (state = {}, {type, payload}) => {
    switch (type) {
        case SET_CITY:
            return payload
        default:
            return state
    }

}
