import axios from 'axios'
import _ from 'lodash'
import moment from 'moment'

import {
    initPlan,
    addPlaceToPlan,
    changeDates,
    sortTripPlan,
    updatePlanByDay
} from "./api/planAPI";

export const FETCH_PLACES = 'fetch_places'
export const FETCH_PLACES_FAILURE = 'fetch_places_failure'
export const FETCH_PLACE_DETAILS = 'fetch_place_detail'
export const FETCH_PLACE_DETAILS_FAILURE = 'fetch_place_detail_failure'
export const FETCH_HOTELS = 'fetch_hotels'
export const SET_CITY = 'set_city'

export const SET_FROM_DATE = 'set_from_date'
export const SET_TO_DATE = 'set_to_date'
export const SELECT_DAY_TO_ADD_PLACE = 'select_day_to_add_place'

export const INITIAL_PLAN = 'initial_plan'
export const ADD_PLACE_TO_PLAN = 'add_place_to_plan'

export const EXCHANGE_DATES = 'exchange_dates'
export const UPDATE_ONE_DAY_PLAN ='update_one_day_plan'

export const YELP_AUTOCOMPLETE = 'yelp_autocomplete'
export const SEARCH_BY_INPUT_VALUE = 'search_by_input_value'
export const SEARCH_BY_INPUT_VALUE_ID = 'search_by_input_value_id'
export const CANCEL_INPUT = 'cancel_input'

const Bearer_Token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViMTgyYTQwMDc5NGFjMDAyNmE5NWEzMCIsImlhdCI6MTUyODQzNzQzNCwiZXhwIjoyMTgxNjIxNDM0fQ.HSReRB8JW9_tOWOWiS-VuE9ROL2-OK9aXPpGMysL9cE'
const Yelp_Bearer_Token = 'Bearer k9q0SjdY2lxkF9on0k8OlLZcUCKV3uzSUEyoNZgdSwqaozgHfclG2mY9KaAWioe4ynbwSta6kZu28593_0NiQ-euUsjPBd4PeXXTko4Ud4IqHl1Zu36ZwWps3EDAWnYx'

export const fetchHotels = () => async ( dispatch, getState ) => {
    const {
        city
    } = getState()

    const request = axios({
        method: 'POST',
        url: 'https://globaleur-backend.herokuapp.com/v1/hotel/hotel',
        data: JSON.stringify(({
            "string": `${city}`,
            "rooms": 1,
            "guests": 1,
            "check_in": "2018-08-28",
            "check_out": "2018-08-30"
        })),
        headers: {
            'Authorization': `${Bearer_Token}`,
            'Content-Type': 'application/json'
        },
        json: true
    }).catch(error => {
        console.log(error)
    })

    request.then(
        res => {
            dispatch({
                type:  FETCH_HOTELS,
                payload: res
            })
        }
    )
}

export const cancelInput = () => async( dispatch ) => {
    dispatch({
        type: CANCEL_INPUT
    })
}
export const searchByInputValue = ( value, id = '' ) => async (dispatch, getState) => {
    const {
        day,
        places
    } = getState()

    const lat = places.center.latitude
    const lng = places.center.longitude

    if ( id ) {
        const request = axios({
            method: 'POST',
            url: 'https://globaleur-backend.herokuapp.com/v1/yelp/placeinfo',
            data: JSON.stringify({
                day: day.dayOfWeekNum,
                id: id
            }),
            headers: {
                'Authorization': `${Bearer_Token}`,
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            json: true
        }).catch(error => {
            console.log(error)
        })

        request.then(
            res => {
                dispatch({
                    type:  SEARCH_BY_INPUT_VALUE_ID,
                    payload: res
                })
            }
        )
    } else {
        const request = axios({
            method: 'GET',
            url: `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${value}&latitude=${lat}&longitude=${lng}`,
            headers: {
                'Authorization': `${Yelp_Bearer_Token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Origin': 'http://localhost:3000',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Origin': 'http://localhost:3000',
            },
            json: true
        })
        .catch(error => {
            console.log(error)
        })

        request.then(
            res => {
                dispatch({
                    type:  SEARCH_BY_INPUT_VALUE,
                    payload: res
                })
            }
        )
    }
}

export const yelpAutocomplete = ( value ) => async (dispatch, getState) => {
    const {
        places
    } = getState()


    const lat = places.center.latitude
    const lng = places.center.longitude

    const request = axios({
        method: 'GET',
        url: `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/autocomplete?text=${value}&latitude=${lat}&longitude=${lng}`,
        headers: {
            'Authorization': `${Yelp_Bearer_Token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Origin': 'http://localhost:3000',
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Origin': 'http://localhost:3000',
        },
        json: true
    })
    .catch(error => {
        console.log(error)
    })

    request.then((res) => {
        if (_.has(res, 'data')){
            dispatch({
                type: YELP_AUTOCOMPLETE,
                payload: res.data
            })
        }

    })
}

export const updateOneDayPlan = ( newPlan, dayIndex ) => async (dispatch, getState) => {
    // const request = axios({
    //     method: 'POST',
    //     url: 'https://globaleur-backend.herokuapp.com/v1/schedule/new',
    //     data: JSON.stringify(
    //         updatePlanByDay( getState, newPlan, dayIndex )
    //     ),
    //     headers: {
    //         'Authorization': `${Bearer_Token}`,
    //         'Content-Type': 'application/json',
    //         'Access-Control-Allow-Origin': '*'
    //     },
    //     json: true
    // }).catch(error => {
    //     console.log(error)
    // })
    //
    // request.then(
    //     res => {
    //         if (_.has(res, 'data')){
    //             dispatch({
    //                 type:UPDATE_ONE_DAY_PLAN,
    //                 payload: res.data
    //             })
    //         }
    //     }
    // )

        dispatch({
            type:UPDATE_ONE_DAY_PLAN,
            payload: updatePlanByDay( getState, newPlan, dayIndex )
        })

}


export const exchangeDates = ( movedEveryDayPlan ) => async (dispatch, getState) => {
    dispatch({
        type: EXCHANGE_DATES,
        payload: changeDates( getState, movedEveryDayPlan )
    })
}

export const selectDayToAddPlace = ( index, dayOfWeekNum ) => async dispatch => {
    dispatch({
        type:SELECT_DAY_TO_ADD_PLACE,
        payload: {'index': index, 'dayOfWeekNum': dayOfWeekNum}
    })
}

export const initialPlan = ( ) => async ( dispatch, getState ) => {
    const request = axios({
        method: 'POST',
        url: 'https://globaleur-backend.herokuapp.com/v1/schedule/new',
        data: JSON.stringify(
            initPlan( getState )
        ),
        headers: {
            'Authorization': `${Bearer_Token}`,
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        json: true
    }).catch(error => {
        console.log(error)
    })

    request.then(
        res => {
            if (_.has(res, 'data')){
                dispatch({
                    type:INITIAL_PLAN,
                    payload: res.data
                })
            }
        }
    )

}

export const addPlace = ( id ) => async (dispatch, getState) => {
    const { day, fromDate } = getState()
    const dayOfWeekNum = _.isEmpty(day) ? moment(new Date(fromDate)).isoWeekday() : day.dayOfWeekNum
    const index = _.isEmpty(day) ? 0 : day.index

    const request = axios({
        method: 'POST',
        url: 'https://globaleur-backend.herokuapp.com/v1/yelp/placeinfo',
        data: JSON.stringify({
            day: dayOfWeekNum,
            id: id
        }),
        headers: {
            'Authorization': `${Bearer_Token}`,
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        json: true
    }).catch(error => {
        console.log(error)
    })

    request.then(
        (res) => {
            dispatch({
                type: FETCH_PLACE_DETAILS,
                payload: res
            })

            const temp = _.mapKeys( res.data, 'id')
            // temp[res.data.details.id].reviews = res.data.reviews

            const request2 = axios({
                method: 'POST',
                url: 'https://globaleur-backend.herokuapp.com/v1/schedule/new',
                data: JSON.stringify(
                    addPlaceToPlan( getState, _.omit(temp, ['undefined'] ))
                ),
                headers: {
                    'Authorization': `${Bearer_Token}`,
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                json: true
            }).catch(error => {
                console.log(error)
            })

            request2.then(
                res => {
                    if (_.has(res, 'data')){
                        dispatch({
                            type:ADD_PLACE_TO_PLAN,
                            payload: sortTripPlan(res.data)
                        })
                    }

                }

            )

        }
    )

}

export const setFromDate = ( fromDate ) => async dispatch => {
    dispatch({
        type:SET_FROM_DATE,
        payload: fromDate
    })
}

export const setToDate = ( toDate ) => async dispatch => {
    dispatch({
        type:SET_TO_DATE,
        payload: toDate
    })
}

export const setCity = ( location ) => async dispatch => {
    dispatch({
        type: SET_CITY,
        payload: location.replace(/\b\w/g, l => l.toUpperCase())
    })
}

export const fetchPlaces = ( term, location ) => async dispatch => {
        const request = axios({
            method: 'POST',
            url: 'https://globaleur-backend.herokuapp.com/v1/yelp/places',
            data: JSON.stringify({
                term : term,
                location: location
            }),
            headers: {
                'Authorization': `${Bearer_Token}`,
                'Content-Type': 'application/json'
            },
            json: true
        }).catch(error => {
            console.err(error)
        })

        request.then(
            res => {
                dispatch({
                    type: FETCH_PLACES,
                    payload: res
                })
            },
            err => dispatch({
                type: FETCH_PLACES_FAILURE,
                payload: err
            })
        )
}


export const fetchPlaceDetail = ( dayOfWeekNum, id ) => async dispatch => {
    const request = axios({
        method: 'POST',
        url: 'https://globaleur-backend.herokuapp.com/v1/yelp/placeinfo',
        data: JSON.stringify({
            day: dayOfWeekNum,
            id: id
        }),
        headers: {
            'Authorization': `${Bearer_Token}`,
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        json: true
    }).catch(error => {
        console.err(error)
    })

    request.then(
        res => {
            dispatch({
                type: FETCH_PLACE_DETAILS,
                payload: res
            })
        },
        err => {
            dispatch({
                type: FETCH_PLACE_DETAILS_FAILURE,
                payload: err
            })
        }
    )
}


// export const fetchPlaces = ( term, location, day = 0 ) => async dispatch => {
//     try {
//         const request = await axios({
//             method: 'POST',
//             url: 'https://globaleur-backend.herokuapp.com/v1/yelp/places',
//             data: JSON.stringify({
//                 term : term,
//                 location: location
//             }),
//             headers: {
//                 'Authorization': `${Bearer_Token}`,
//                 'Content-Type': 'application/json'
//             },
//             json: true
//         })
//
//         const places = _.assign({}, _.mapKeys(request.data.businesses, 'id'), request.data.region)
//
//         dispatch({
//             type: FETCH_PLACES,
//             payload: places
//         })
//
//         const placesDetails = await Promise.all(_.map( _.keys(places), function( id ) {
//             if (id != 'center') {
//                 return axios({
//                     method: 'POST',
//                     url: 'https://globaleur-backend.herokuapp.com/v1/yelp/placeinfo',
//                     data: JSON.stringify({
//                         day: day,
//                         id: id
//                     }),
//                     headers: {
//                         'Authorization': `${Bearer_Token}`,
//                         'Content-Type': 'application/json',
//                         'Access-Control-Allow-Origin': '*',
//                         'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS'
//                     },
//                     json: true
//                 })
//             }
//         })).then(res => {
//                 dispatch({
//                     type: FETCH_PLACE_DETAILS,
//                     payload: res
//                 })
//             },
//             err => {
//                 dispatch({
//                     type: FETCH_PLACE_DETAILS_FAILURE,
//                     payload: err
//                 })
//             })
//
//     } catch (e) {
//         console.log('EError: ' + e)
//     }
//
// }
