import React, { Component } from 'react'
import { connect } from 'react-redux'

import moment from 'moment'
import Helmet from 'react-helmet'
import DayPickerInput from 'react-day-picker/DayPickerInput'
import 'react-day-picker/lib/style.css'
import { formatDate, parseDate } from 'react-day-picker/moment'

import { setFromDate, setToDate } from "../../../actions/index";

class DayPicker extends Component {
    constructor(props) {
        super(props)
        this.handleFromChange = this.handleFromChange.bind(this)
        this.handleToChange = this.handleToChange.bind(this)
    }
    showFromMonth() {
        const { fromDate, toDate } = this.props;
        if (!fromDate) {
            return
        }
        if (moment(toDate).diff(moment(fromDate), 'months') < 2) {
            this.to.getDayPicker().showMonth(fromDate)
        }
    }

    handleFromChange(fromDate) {
        // Change the from date and focus the "to" input field
        this.props.setFromDate( fromDate )

        // console.log(Object.prototype.toString.call(from)) //Check object type

    }
    handleToChange(toDate) {
        this.props.setToDate( toDate )
        this.showFromMonth()
    }
    render() {
        const { fromDate, toDate } = this.props;
        const modifiers = { start: fromDate, end: toDate };
        return (
            <div className="InputFromTo">
                <DayPickerInput
                    value={fromDate}
                    placeholder="From"
                    format="LL"
                    formatDate={formatDate}
                    parseDate={parseDate}
                    dayPickerProps={{
                        selectedDays: [fromDate, { fromDate, toDate }],
                        disabledDays: { after: toDate },
                        toMonth: toDate,
                        modifiers,
                        numberOfMonths: 2,
                        onDayClick: () => this.to.getInput().focus(),
                    }}
                    onDayChange={this.handleFromChange}
                />
                <span className="InputFromTo-to">
                  <DayPickerInput
                      ref={el => (this.to = el)}
                      value={toDate}
                      placeholder="To"
                      format="LL"
                      formatDate={formatDate}
                      parseDate={parseDate}
                      dayPickerProps={{
                          selectedDays: [fromDate, { fromDate, toDate }],
                          disabledDays: { before: fromDate },
                          modifiers,
                          month: fromDate,
                          fromMonth: fromDate,
                          numberOfMonths: 2,
                      }}
                      onDayChange={this.handleToChange}
                  />
                </span>
                <Helmet>
                    <style>{`
                        .InputFromTo .DayPicker-Day--selected:not(.DayPicker-Day--start):not(.DayPicker-Day--end):not(.DayPicker-Day--outside) {
                        background-color: #f0f8ff !important;
                        color: #4a90e2;
                        }
                        .InputFromTo .DayPicker-Day {
                        border-radius: 0 !important;
                        }
                        .InputFromTo .DayPicker-Day--start {
                        border-top-left-radius: 50% !important;
                        border-bottom-left-radius: 50% !important;
                        }
                        .InputFromTo .DayPicker-Day--end {
                        border-top-right-radius: 50% !important;
                        border-bottom-right-radius: 50% !important;
                        }
                        .InputFromTo .DayPickerInput-Overlay {
                        width: 600px;
                        }
                        .InputFromTo-to .DayPickerInput-Overlay {
                        margin-left: -198px;
                        }
                    `}</style>
                </Helmet>
            </div>
        )
    }
}

const mapStateToProps = ({ fromDate, toDate }) => ({
    fromDate,
    toDate
})

const mapDispatchToProps = {
    setFromDate,
    setToDate
}

export default connect(mapStateToProps, mapDispatchToProps)(DayPicker)
