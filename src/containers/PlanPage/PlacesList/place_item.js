import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import moment from 'moment'
import Popup from 'reactjs-popup'

import PopupPage from './popup_page'

import {
    addPlace,
    fetchPlaceDetail
} from "../../../actions/index";

class PlaceItem extends Component {
    constructor( props ) {
        super( props )
        this.state = {
            open: false
        }
    }

    openDetail(id) {
        this.setState({
            open: true
        })
        const { placeDetails, fromDate, fetchPlaceDetail, day } = this.props
        if ( !_.has(placeDetails, id )){
            const dayOfWeekNum = _.isEmpty(day) ? moment(new Date(fromDate)).isoWeekday() : day.dayOfWeekNum
            fetchPlaceDetail(dayOfWeekNum, id)
        }
    }

    closeDetail() {
        this.setState({
            open: false
        })
    }

    addItemToPlan( id ) {
        const { addPlace } = this.props
        addPlace(id)
    }

    render () {
        var { name, image_url, id } = this.props.place
        return (
                <div>
                    <img src={image_url} style={{height:'100px', width:'100px'}} onClick={() => this.openDetail(id)}/>
                    <div className='add-to-plan-wrapper'>
                        <i onClick={()=> this.addItemToPlan( id ) } className="add-to-plan far fa-calendar-plus fa-2x"/>
                    </div>
                    <h4>{ name }</h4>
                    <Popup
                        open = { this.state.open }
                        closeOnDocumentClick
                        onClose = { () => this.closeDetail() }
                    >
                        <div className="modal">
                            <a className="close" onClick={ () => this.closeDetail() }>
                                &times;
                            </a>
                            <PopupPage
                                id = { id }
                            />
                        </div>
                    </Popup>
                </div>
        )

    }
}

const mapStateToProps = ({ placeDetails, day, city, fromDate }) => ({
    placeDetails,
    day,
    city,
    fromDate
})

const mapDispatchToProps = {
    addPlace,
    fetchPlaceDetail
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaceItem)
