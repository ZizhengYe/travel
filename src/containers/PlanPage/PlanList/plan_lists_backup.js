import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { setFromDate, setToDate, selectDayToAddPlace, reOrderTravelPlaces } from "../../../actions/index"
import DayPicker from './day_picker'
import moment from 'moment'



const reorder =  (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)

    return result
}


class PlanLists extends Component {
    constructor(props) {
        super(props)
        this.onDragEnd = this.onDragEnd.bind(this)
    }

    selectDay( e, index, dayOfWeekNum ) {
        if ( e.target.checked ){
            // window.scrollTo(0, 0)
            this.props.selectDayToAddPlace( index, dayOfWeekNum )
        }
    }

    onDragEnd = result => {
        if (!result.destination) {
            return
        }

        const items = reorder(
            this.props.travelDates[this.props.day.index || 0],
            result.source.index,
            result.destination.index
        )

        this.props.reOrderTravelPlaces( this.props.day.index || 0, items )
    }

    renderPlanList() {
        const { fromDate, toDate, travelDates } = this.props
        const container = []

        for (let i = 0; i < moment(toDate).diff(fromDate, 'days') + 1; i++) {
            let temp = moment(new Date(fromDate)).add(i, 'days')

            const singleDayPlan = (
                <div>
                    <DragDropContext onDragEnd = { this.onDragEnd }>
                        <input id={i} name='radio' defaultChecked={ i === 0 } type='radio' onChange={( e ) => this.selectDay(e, i, temp.isoWeekday())}/>
                        <label htmlFor={i}>
                            <span>{temp.format('dddd, MMMM Do YYYY')}</span>
                            <div className='lil_arrow'/>
                            <div className='bar'/>
                            <div className='swanky_wrapper__content'>
                                <Droppable droppableId="places">
                                    { provided => (
                                        <ul
                                            ref = {provided.innerRef}
                                        >
                                            { _.map(travelDates[i], ( place, index ) => {
                                                return (
                                                    <Draggable
                                                        index={index}
                                                        draggableId={index}
                                                    >
                                                        { provided => (
                                                            <div>
                                                                <li
                                                                    {...provided.draggableProps}
                                                                    {...provided.dragHandleProps}
                                                                    ref = {provided.innerRef}
                                                                >
                                                                    {place.name}
                                                                </li>
                                                                { provided.placeholder }
                                                            </div>
                                                        )}

                                                    </Draggable>
                                                )
                                            })}
                                        </ul>
                                    )
                                    }
                                </Droppable>
                            </div>
                        </label>
                    </DragDropContext>
                </div>
            )

            container.push(singleDayPlan)
        }

        return container

    }



    render () {
        return (

            <form className='swanky_wrapper'>
                <DayPicker/>
                { this.renderPlanList() }
            </form>

        )
    }
}
const mapStateToProps = ({ fromDate, toDate, travelDates, day }) => ({
    fromDate,
    toDate,
    travelDates,
    day
})


const mapDispatchToProps = {
    setFromDate,
    setToDate,
    selectDayToAddPlace,
    reOrderTravelPlaces

}

export default connect(mapStateToProps, mapDispatchToProps)(PlanLists)
