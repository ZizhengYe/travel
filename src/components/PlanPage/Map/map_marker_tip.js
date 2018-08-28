import React, {Component} from "react"
import { Marker, InfoWindow } from 'react-google-maps'

import _ from 'lodash'

export default class MapMarkerTip extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isOpen: false
        }
    }

    render() {
        let {name, image_url, id} = this.props.place

        return (
            <div>
                <Marker
                    key = { id }
                    position = {this.props.position}
                    // onMouseOver = { () => this.setState( state => ({ isOpen: !state.isOpen }))}
                    // onMouseOut = { () => this.setState( state => ({ isOpen: !state.isOpen }))}
                    onClick = { () => this.setState( state => ({ isOpen: !state.isOpen }))}

                >
                    { this.state.isOpen && (
                        <InfoWindow
                            onCloseClick = { () => this.setState( state => ({ isOpen: !state.isOpen }))}
                        >
                            <div>
                                <h3> { name } </h3>
                                <img src = { image_url } style = {{height:'100px', width:'100px'}} />
                            </div>
                        </InfoWindow>
                    )}
                </Marker>
            </div>
    )
    }
}
