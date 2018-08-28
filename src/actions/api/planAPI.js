import _ from 'lodash'
import moment from 'moment'

export const initPlan = ( getState ) => {
    const {
        fromDate,
        toDate
    } = getState()

    return ({
        'trip': _.map(_.range(moment(toDate).diff(fromDate, 'days') + 1), (index) => {
            return (
                {
                    'date': moment(new Date(fromDate)).add(index, 'day').format('MMMM/Do/YYYY'),
                    'day_order': index + 1,
                    "error": {
                        "code": 101,
                        "msg": "Travel plan can't be generated in this timeline",
                        "idx": [1, 2]
                    },
                    "warn": {
                        "code": 202,
                        "msg": "You can only spend little time at blah blah blah",
                        "idx": [1,2,3]
                    },
                    "user_input":{
                        "day":moment(new Date(fromDate)).add(index, 'day').isoWeekday(),
                        "timeline":{
                            "start":"0900",
                            "end":"2400"
                        },
                        "is_push": true
                    },
                    "plan": [],
                    "hotel":[
                        {
                            "name":"Add a Hotel",
                            "coordinates": {
                                "latitude": 37.80587,
                                "longitude": -122.42058
                            },
                            "location": {
                                "display_address": [
                                    "482 Hayes St",
                                    "San Francisco, CA 94102"
                                ]
                            }
                        }
                    ]

                }
            )
        })
    })
}

export const sortTripPlan = (plan) => ({
    ...plan,
    trip: _.sortBy(plan.trip, ( o ) => o.day_order)
})

export const changeDates = ( getState, movedEveryDayPlan ) => {
    const {
        plan
    } = getState()

    return {
        ...plan,
        trip: movedEveryDayPlan
    }

}

export const updatePlanByDay = ( getState, newPlan, dayIndex ) => {
    const {
        plan
    } = getState()

    return {
        ...plan,
        trip: _.map(plan.trip, (obj, i) => {
            if ( dayIndex === i) {
                return {
                    ...obj,
                    ...{
                        plan: _.map(_.slice(newPlan, 0, _.size(newPlan) ), ( place ) => ({
                            ...place,
                            ...{
                                    "intended_visit": {
                                        "start": "default",
                                            "end": "default"
                                    },
                                    "generated_visit": {
                                        "start": "default",
                                            "end": "default"
                                    },
                                    "moving_tiime": "0008",
                                        "current_stay": "0151",
                                        "max_stay": "0200"
                                }
                        }))
                    }
                }
            } else {
                return {
                    ...obj,
                    ...{
                        plan: _.concat([], _.slice(obj.plan, 0, _.size(obj.plan) ))
                    }
                }
            }
        })
    }

}

export const addPlaceToPlan = ( getState, newPlace ) => {
    const {
        plan,
        fromDate,
        day
    } = getState()

    const index = _.isEmpty(day) ? 0 : day.index

    return ({
        ...plan,
        trip:_.map(plan.trip, (obj, i) => {
            if ( index === i) {
                const place = _.values(newPlace)[0]
                return {
                    ...obj,
                    ...{
                        plan: _.concat(_.slice(obj.plan, 1, _.size(obj.plan) - 1), {
                            ...place,
                            ...{
                                "intended_visit": {
                                    "start": "default",
                                    "end": "default"
                                },
                                "generated_visit": {
                                    "start": "default",
                                    "end": "default"
                                },
                                "moving_tiime": "0008",
                                "current_stay": "0151",
                                "max_stay": "0200"
                            }
                        }),
                    }
                }
            } else {
                return {
                    ...obj,
                    ...{
                        plan: _.concat([], _.slice(obj.plan, 1, _.size(obj.plan) - 1))
                    }
                }
            }
        })

    })
}



// Code used for version that hotel info is considered in plan
//
// return ({
//     ...plan,
//     trip: [
//         ..._.slice(plan.trip, 0, index),
//         {
//             ...plan.trip[index],
//             ...{
//                 plan: _.concat(_.slice(plan.trip[index].plan, 1, _.size(plan.trip[index].plan) - 1), {
//                     ..._.values(newPlace)[0],
//                     ...{
//                         "intended_visit": {
//                             "start": "default",
//                             "end": "default"
//                         },
//                         "generated_visit": {
//                             "start": "default",
//                             "end": "default"
//                         },
//                         "moving_tiime": "0008",
//                         "current_stay": "0151",
//                         "max_stay": "0200"
//                     }
//                 }),
//                 },
//             ...{
//                 warn: {
//
//                 }
//             }
//         },
//         ..._.slice(plan.trip, index + 1)
//         ]
//
//
//         // plan:
//         //     _.concat(_.slice(oneDay.plan, 1, _.size(oneDay.plan) - 1), {
//         //         ..._.values(newPlace)[0],
//         //         ...{
//         //             "intended_visit": {
//         //                 "start": "default",
//         //                 "end": "default"
//         //             },
//         //             "generated_visit": {
//         //                 "start": "default",
//         //                 "end": "default"
//         //             },
//         //             "moving_tiime": "0008",
//         //             "current_stay": "0151",
//         //             "max_stay": "0200"
//         //             }
//         //     })
//
// })







// export const fetchPlanAPI = ( travelDates, fromDate ) => {
//     return({
//         "trip": _.map(travelDates, (travelDay, key) => {
//                     return (
//                         {
//                             "date": moment(new Date(fromDate)).add(parseInt(key, 10), 'day').format('dddd/MMMM/YYYY'),
//                             "day_order": parseInt(key, 10) + 1,
//                             "error": {
//                                 "code": 101,
//                                 "msg": "Travel plan can't be generated in this timeline",
//                                 "idx": [1, 2]
//                             },
//                             "warn": {
//                                 "code": 202,
//                                 "msg": "You can only spend little time at blah blah blah",
//                                 "idx": [1,2,3]
//                             },
//                             "user_input":{
//                                 "day":moment(new Date(fromDate)).add(parseInt(key, 10), 'day').isoWeekday(),
//                                 "timeline":{
//                                     "start":"1000",
//                                     "end":"2400"
//                                 },
//                                 "is_push": true
//
//                             },
//                             "plan": _.map(travelDay, ( place ) => {
//                                 return ({
//                                     ..._.omit(place, ['reviews']),
//                                     ...{
//                                         "intended_visit": {
//                                             "start": "default",
//                                             "end": "default"
//                                         },
//                                         "generated_visit": {
//                                             "start": "default",
//                                             "end": "default"
//                                         },
//                                         "moving_tiime": "0008",
//                                         "current_stay": "0151",
//                                         "max_stay": "0200"
//                                     }
//                                 })
//                             }),
//                             "hotel":[
//                                 {
//                                     "name":"New York",
//                                     "coordinates": {
//                                         "latitude": 37.80587,
//                                         "longitude": -122.42058
//                                     },
//                                     "location": {
//                                         "display_address": [
//                                             "482 Hayes St",
//                                             "San Francisco, CA 94102"
//                                         ]
//                                     }
//                                 }
//                             ]
//                         }
//                     )
//                 })
//         })
// }
