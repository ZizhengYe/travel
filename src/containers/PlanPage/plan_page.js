import React, { Component } from 'react'
import { connect } from 'react-redux'

import { fetchPlaces, fetchPlaceDetail, initialPlan } from "../../actions/index"


import RenderNavBar from '../../components/PlanPage/render_nav_bar'
import RenderPlacesList from '../../components/PlanPage/PlacesList/render_places_list'

import Map from './Map/map'
import PlacesSearch from './Map/placesSearch'

import PlanLists from './PlanList/plan_lists'

import '../../index.css'


class Plan_page extends Component {
    constructor(props) {
        super(props)
    }

    componentWillMount () {
        this.props.initialPlan()
    }
    // shouldComponentUpdate ( nextProps ) {
    //     return this.props.places !== nextProps.places
    // }

    fetchDetailsList(places) {
        Object.keys(places).map( (key) => {
            this.props.fetchPlaceDetail('0', key )
        })

    }

    render () {
        let { places, city, fetchPlaces, fetchPlaceDetail, placeDetails } = this.props
        if ( places && places.center && city) {
            //this.fetchDetailsList( places )
            return (
                <div>
                    <div className = 'terms-nav'>
                        <RenderNavBar
                            city = {city}
                            fetchPlaces = {fetchPlaces}
                        />
                    </div>
                    <div className = 'dates-list'>
                        <PlanLists />
                    </div>
                    <div>
                        <PlacesSearch

                        />
                    </div>
                    <div className = 'map-wrapper'>
                        <Map
                            places = {places}
                            lat = {places.center.latitude}
                            lng = {places.center.longitude}
                        />
                    </div>
                    <div className = 'places-list'>
                        <div className = 'placeslist-wrapper'>
                            <RenderPlacesList
                                places = {places}
                                fetchPlaceDetail = { fetchPlaceDetail }
                            />
                        </div>
                    </div>
                </div>

            )
        } else {
            return (
                <div className = 'map-wrapper'>
                    Loading...
                </div>
            )
        }
    }
}
const mapStateToProps = ({ places, city, placeDetails }) => ({
    places,
    city,
    placeDetails

})
export default connect(mapStateToProps, { fetchPlaces, fetchPlaceDetail, initialPlan })(Plan_page)
