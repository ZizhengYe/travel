import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'


import { fetchPlaces, setCity } from "../../actions/index"
import '../../index.css'

import DayPicker from '../PlanPage/PlanList/day_picker'

class SearchBar extends Component {
    constructor (props) {
        super(props)
        this.state = {
            value: ''
        }
    }

    submitForm = (event) => {
        event.preventDefault()
        this.props.fetchPlaces('landmark', this.state.value)
        this.props.setCity(this.state.value)
        this.props.history.push('/plan')
    }

    changeInput = (event) => {
        this.setState({
            value: event.target.value
        })
    }


    render () {
        return (
            <div className="wrap">
                <div className="search">
                    <form onSubmit={this.submitForm}>
                        <input
                            onChange={this.changeInput}
                            type="text"
                            className="searchTerm"
                            placeholder="Where are you looking for?"
                        />
                        <DayPicker />
                        <button type="submit" className="searchButton">
                            <i className="fa fa-search"></i>
                        </button>
                    </form>
                </div>
            </div>
        )
    }
}



const mapDispatchToProps = {
    fetchPlaces,
    setCity
}


export default connect(null, mapDispatchToProps)(withRouter(SearchBar))
