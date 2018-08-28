import React, { Component } from 'react'
import { connect } from 'react-redux'
import { SortableContainer, SortableElement, SortableHandle, arrayMove } from 'react-sortable-hoc'
import _ from 'lodash'

import { setFromDate, setToDate, selectDayToAddPlace, updateOneDayPlan, exchangeDates } from "../../../../actions/index"
import PlacesOneDay from '../Places/places_one_day'


import moment from 'moment'


const SortableDate = SortableElement(({ sortIndex, selectDay, plan, temp }) => (
    <div>
        <input id={sortIndex} name='radio' defaultChecked={sortIndex === 0} type='radio'
               onChange={(e) => selectDay(e, sortIndex, temp.isoWeekday())}/>
        <label htmlFor={sortIndex}>
            <span>{temp.format('dddd, MMMM Do YYYY')}</span>
            <div className='lil_arrow'/>
            <div className='bar'/>
            <div className='swanky_wrapper__content'>
                <PlacesOneDay
                    everydayPlaces = {plan.trip[sortIndex].plan}
                    day = {sortIndex}
                />
            </div>
        </label>
    </div>
    )
)


const SortableDateList = SortableContainer(({ fromDate, toDate, plan, selectDay }) => (
    <div>
        {
            _.map(plan.trip, (date, index) => (
                <SortableDate
                    sortIndex={index}
                    selectDay={selectDay}
                    temp={moment(new Date(fromDate)).add(index, 'days')}
                    plan={plan}
                    index={index}
                    key={`date-${date.date}`}
                />
                )
            )
        }
    </div>
    )
)

class TravelDates extends Component {
    constructor(props) {
        super(props)
    }


    selectDay( e, index, dayOfWeekNum ) {
        if ( e.target.checked ){
            window.scrollTo(0, 0)
            this.props.selectDayToAddPlace( index, dayOfWeekNum )
        }
    }

    onSortEnd({oldIndex, newIndex}) {
        const dates = this.props.plan.trip
        const movedEveryDayPlan = arrayMove(dates, oldIndex, newIndex)
        this.props.exchangeDates( movedEveryDayPlan )
        if (oldIndex === this.props.day.index) {
            this.props.selectDayToAddPlace(newIndex, moment(new Date(this.props.fromDate)).add(newIndex, 'days').isoWeekday())
        }


    }



    render () {
        const { fromDate, toDate, plan } = this.props
        return (
            <SortableDateList
                fromDate={fromDate}
                toDate={toDate}
                plan={plan}
                onSortEnd={this.onSortEnd.bind(this)}
                selectDay = {this.selectDay.bind(this)}
                pressDelay = {150}
            />
        )
    }
}
const mapStateToProps = ({ fromDate, toDate, plan, day }) => ({
    fromDate,
    toDate,
    plan,
    day
})


const mapDispatchToProps = {
    setFromDate,
    setToDate,
    selectDayToAddPlace,
    updateOneDayPlan,
    exchangeDates

}

export default connect(mapStateToProps, mapDispatchToProps)(TravelDates)
