import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import { fetchPlaces, fetchPlaceDetail } from "../../../actions/index"


class PopupPage extends Component {
    constructor(props) {
        super( props )
        this.state = {
            ids: _.filter(_.keys(this.props.places), n => {
                return n !== 'center'
            }),
            index: 0
        }
    }

    componentWillMount () {
        this.setState({
            index: _.indexOf(this.state.ids, this.props.id)
        })
    }

    changePlaceDetailsForwards() {
        let { index, ids } = this.state
        let { placeDetails, fetchPlaceDetail } = this.props

        let i = index;
        if (i == ids.length - 1) {
            i = 0;
        } else {
            i = i + 1;
        }
        this.setState({index: i});
        if ( !_.has(placeDetails, ids[i])){
            fetchPlaceDetail('0', ids[i])
        }
    }

    changePlaceDetailsBackwards() {
        let { index, ids } = this.state
        let { placeDetails, fetchPlaceDetail } = this.props

        let i = index;
        if (i == 0) {
            i = ids.length - 1;
        } else {
            i = i - 1;
        }
        this.setState({index: i});
        if ( !_.has(placeDetails, ids[i])){
            fetchPlaceDetail('0', ids[i])
        }
    }


    render () {
        const { index, ids } = this.state
        const id = ids[index]
        return (
            <div>
                {this.props.placeDetails[id] &&
                <div>
                    <h3>{this.props.placeDetails[id].name}</h3>
                    <div className='image-container'>
                        <img src={this.props.placeDetails[id].image_url} style={{height:'300px', width:'300px'}}/>
                        <div className='change-placedetails-angle'>
                            <div className='left-angle angle'>
                                <i onClick={() => this.changePlaceDetailsBackwards()} className='fas fa-angle-left fa-3x' />
                            </div>
                            <div className='right-angle angle'>
                                <i onClick={() => this.changePlaceDetailsForwards()} className='fas fa-angle-right fa-3x' />
                            </div>
                        </div>
                    </div>
                    <ul>
                        {_.values(this.props.placeDetails[id].reviews).map(review =>
                            <li>{review.text}</li>
                        )}
                    </ul>
                </div>
                }

                {!this.props.placeDetails[id] &&
                <div>
                    Loading...
                </div>
                }
            </div>
        )
    }
}

const mapStateToProps = ({ places, city, placeDetails }) => ({
    places,
    city,
    placeDetails

})
export default connect(mapStateToProps, { fetchPlaces, fetchPlaceDetail })(PopupPage)


