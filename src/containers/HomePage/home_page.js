import React, { Component } from 'react'
import { connect } from 'react-redux'


import Top_20_Trips from './top_20_trips'
import SearchBar from './search_bar'

class Home_page extends Component {
    render () {
        return (
                <div>
                    <div>
                        <SearchBar/>
                    </div>
                    <div>
                        <Top_20_Trips/>
                    </div>

                </div>
            )
    }
}


export default connect(null)(Home_page)
