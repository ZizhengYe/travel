import React, { Component } from 'react'
import { connect } from 'react-redux'
import DayPicker from './day_picker'
import TravelDates from './Dates/travelDates'


import { exchangeDates } from '../../../actions/index'


class PlanLists extends Component {

    render () {
        return (
            <form className='swanky_wrapper'>
                <DayPicker/>
                <TravelDates/>
            </form>
        )
    }
}

const mapStateToProps = ({ plan }) => ({
    plan
})

const mapDispatchToProps = {
    exchangeDates
}

export default connect(mapStateToProps, mapDispatchToProps)(PlanLists)
