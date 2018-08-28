import React, { Component } from 'react'
import _ from 'lodash'


import PlaceItem from '../../../containers/PlanPage/PlacesList/place_item'


export default class RenderPlacesList extends Component {
    constructor( props ) {
        super(props)
    }

    render() {
        return (
            _.map(this.props.places, (place, key) => {
                if (key !== 'center') {

                    return (
                        <PlaceItem
                            place={place}
                            // fetchPlaceDetail = { this.props.fetchPlaceDetail }
                        />
                    )

                }
            })
        )
    }
}

