import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withGoogleMap, GoogleMap, Polyline } from 'react-google-maps'

import _ from 'lodash'
import { compose, withProps, lifecycle } from 'recompose'
import {SearchBox} from 'react-google-maps/lib/components/places/SearchBox'

import MapMarkerTip from '../../../components/PlanPage/Map/map_marker_tip'

class Map extends Component {
    constructor ( props ) {
        super ( props )
        this.state = {
            pathCoordinates : []
        }
    }

    componentWillReceiveProps( newProps ) {
        if ( newProps.plan != this.props.plan || newProps.day != this.props.day)
        {
            this.setState({
                pathCoordinates: _.map(_.slice(newProps.plan.trip[newProps.day.index || 0].plan, 1, _.size(newProps.plan.trip[newProps.day.index || 0].plan) - 1),
                                    ( travelDay, i ) => {
                                        return ({
                                            lat: travelDay.coordinates.latitude,
                                            lng: travelDay.coordinates.longitude,
                                            place: travelDay
                                        })
                                    }
                                )
            })

        }
    }


    render() {
        const NewGoogleMap = compose(
            withProps({
                googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyAaf3v-amqvAHxIz310HPejrovcsq8SRpw&libraries=places",
                containerElement: <div style={{height: `100%`, width: '100%'}}/>,
                mapElement: <div style={{height: `100%`}}/>,
                markers: _.map(this.props.places, (place, key) => {
                    if (place && key && key !== 'center') {
                        return ({
                            lat: place.coordinates.latitude,
                            lng: place.coordinates.longitude,
                            place: place
                        })
                    }
                })
            }),

            lifecycle({
                componentWillMount() {
                    this.setState({
                        bounds: null,
                        markers: this.props.markers
                    })

                }
            }),

            withGoogleMap
            )( props  =>
                <GoogleMap
                    center = {{
                                lat:(this.state.pathCoordinates[0]&&this.state.pathCoordinates[0].lat)||this.props.lat,
                                lng:(this.state.pathCoordinates[0]&&this.state.pathCoordinates[0].lng)||this.props.lng
                            }}
                    defaultZoom = { 13 }
                >
                    {
                        _.isEmpty(this.props.searchPlacesResults)?
                        _.map(props.markers, ( marker, key ) => {
                            if (marker){
                                const { place } = marker
                                const position = _.omit(marker, 'place')
                                return (
                                    <MapMarkerTip
                                        position={position}
                                        place = {place}
                                    />
                                )
                            }

                        })
                        :
                        _.map(this.props.searchPlacesResults, (result) => {
                            const { place } = result
                            const position = _.omit(result, 'place')
                            return (
                                <MapMarkerTip
                                    position={position}
                                    place = {place}
                                />
                            )

                        })
                    }
                    {
                        _.map(this.state.pathCoordinates,
                            (coordinate, index) => {
                                const {place} = coordinate
                                const position = _.omit(coordinate, 'place')
                                return (
                                    <MapMarkerTip
                                        position={position}
                                        place={place}
                                    />
                                )
                            })
                    }
                    {
                        <Polyline
                            path = { _.map(this.state.pathCoordinates,
                                        ( coordinate, index) => {
                                            return ({
                                                lat: coordinate.lat,
                                                lng: coordinate.lng
                                            })
                                        }
                                    )
                            }
                            options = {{
                                strokeColor: '#FF0000',
                                strokeOpacity: 1.0,
                                strokeWeight: 2
                            }}
                        />
                    }
                </GoogleMap>
            )


        return(
            <div>
                <NewGoogleMap/>
            </div>
        )
    }
}


const mapStateToProps = ({ day, plan, searchPlacesResults }) => ({
    plan,
    day,
    searchPlacesResults
})


export default connect( mapStateToProps )(Map)
