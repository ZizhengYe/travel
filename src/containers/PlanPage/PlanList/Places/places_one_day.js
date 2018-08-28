import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc'

import { updateOneDayPlan, fetchHotels } from "../../../../actions/index"

const Place = SortableElement( ({ place, fetchHotels }) => {
    return (
            place.name === 'Add a Hotel' ?
            <li onClick={fetchHotels}>{place.name}</li>:
            <li>{place.name}</li>
    )
}

)

const SortablePlacesList = SortableContainer(({ everydayPlaces, fetchHotels }) => (
    <ul>
        {
            _.map(everydayPlaces, (place, index) => (

                <Place
                    place = { place }
                    sortIndex = { index }
                    index = { index }
                    fetchHotels = { fetchHotels }
                />
            ))
        }
    </ul>
    ))

class PlacesOneDay extends Component {
    constructor(){
        super()
    }

    onDaySortEnd(dayIndex, {oldIndex, newIndex}) {
        const plan = this.props.plan.trip[dayIndex].plan

        const movePlace = arrayMove(plan, oldIndex, newIndex )

        this.props.updateOneDayPlan(movePlace, dayIndex)
    }

    render () {
        const { everydayPlaces, day, fetchHotels } = this.props
        return <SortablePlacesList
                    everydayPlaces={everydayPlaces}
                    day={day}
                    fetchHotels={fetchHotels}
                    onSortEnd={this.onDaySortEnd.bind(this, day)}
                    pressDelay = {150}
                />
    }
}

const mapStateToProps = ({ fromDate, toDate, plan }) => ({
    fromDate,
    toDate,
    plan
})


const mapDispatchToProps = {
    updateOneDayPlan,
    fetchHotels
}

export default connect(mapStateToProps, mapDispatchToProps)(PlacesOneDay)
