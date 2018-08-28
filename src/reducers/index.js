import { combineReducers } from 'redux'

import places from './places'
import city from './city'
import placeDetails from './placeDetails'
import fromDate from './fromDate'
import toDate from './toDate'
import day from './day'
import plan from './plan'
import yelpACInfo from './yelpACInfo'
import searchPlacesResults from './searchPlacesResults'


const Reducer = combineReducers({
    places,
    placeDetails,
    city,
    fromDate,
    toDate,
    day,
    plan,
    yelpACInfo,
    searchPlacesResults
})

export default Reducer
