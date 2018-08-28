import React from 'react'
import _ from 'lodash'


const RenderNavBar = ({ city, fetchPlaces }) => {

    var terms = ['food', 'landmark', 'museum', 'shopping', 'nightlife', 'nature', 'outdoor', 'local', 'entertainment', 'beach']
    var termLists = _.map(terms, (term) => {
        return (
            <li><a onClick={() => fetchPlaces(term, city)} href='#'>{term}</a></li>
        )
    })
    return (
        <header>
            <div className="nav">
                <ul>
                    {termLists}
                </ul>
            </div>
        </header>
    )
}

export default RenderNavBar
