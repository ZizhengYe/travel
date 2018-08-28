import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import Autocomplete from 'react-autocomplete'

import {
    yelpAutocomplete,
    searchByInputValue,
    cancelInput
} from '../../../actions/index'


class PlacesSearch extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: '',
            items: [],
            loading: false
        }
        this.pressKey = this.pressKey.bind(this)
    }

    componentWillReceiveProps( newProps ) {
        if ( newProps.yelpACInfo != this.props.yelpACInfo ) {
            this.setState({
                items: newProps.yelpACInfo,
                loading: false
            })
        }

    }

    pressKey(e) {
        if (e.keyCode === 13 && this.state.value){
            this.props.searchByInputValue(this.state.value)
        }
    }


    requestTimer = null
    render() {
        return (
            <div>
                <Autocomplete
                    wrapperStyle={{ position: 'relative', display: 'inline-block' }}
                    value={this.state.value}
                    items={this.state.items}
                    getItemValue={(item)=> item.class || item.title || item.name || item.text}
                    onSelect={(value, item) => {
                        this.setState({ value, items: [item]})
                        this.props.searchByInputValue(value, item.id)
                    }}
                    inputProps = {{onKeyUp: this.pressKey}}
                    onChange={(event, value) => {
                        this.setState({ value, loading: true, items: [] })
                        // clearTimeout(this.requestTimer)
                        this.requestTimer = this.props.yelpAutocomplete(value)
                        if (value === ''){
                            this.props.cancelInput()
                        }
                        }
                    }
                    renderItem={(item, isHighlighted) => (
                        item.class ?
                            <div
                                className='item item-class'
                                key={ item.class }
                            >{ item.class }</div>
                        : item.alias ?
                            <div
                                className={`item ${isHighlighted ? 'item-highlighted': ''}`}
                                key={ item.alias }
                            >{ item.title }</div>
                        : item.id ?
                            <div
                                className={`item ${isHighlighted ? 'item-highlighted': ''}`}
                                key={ item.id }
                            >{ item.name }</div>
                        : <div
                            className={`item ${isHighlighted ? 'item-highlighted': ''}`}
                            key={ item.text }
                          >{ item.text }</div>

                    )}
                    renderMenu={(items, value) => {
                        return (
                            <div className='menu'>
                                {
                                    value === '' ? (
                                        <div className='item'>Enter the places</div>
                                    ):this.state.loading ? (
                                        <div className='item'>Loading...</div>
                                    ):items.length === 3 ? (
                                        <div className='item'>No matches for { value }</div>
                                    ): items
                                }
                            </div>
                        )
                    }}
                    isItemSelectable={(item) => !item.class}

                />
            </div>
        )
    }
}

const mapStateToProps = ({ yelpACInfo }) => ({
    yelpACInfo
})

const mapDispatchToProps = {
    yelpAutocomplete,
    searchByInputValue,
    cancelInput
}

export default connect(mapStateToProps, mapDispatchToProps)(PlacesSearch)

