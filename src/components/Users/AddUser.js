import React, { useState, useEffect, useContext, Component } from "react";
import Card from "../UI/Card";
import classes from "./AddUser.module.css";
import Button from "../UI/Button";
import Errormodel from "../UI/ErrorModal";
import ReactDOM from "react-dom";
import { v4 } from "uuid";
import Wrapper from "../Helper/Wrapper";
import { format } from "date-fns";

import MaterialTable from "material-table";

import moment from "moment";
class AddUser extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  // enteredEventName: "",
  // enteredstartDate: "",
  // enteredEndDate: "",
  // enteredstarttime: "",
  // enteredendtime: "",
  // enteredstatus: "",
  // error: {},
  //   };
  // }
  state = {
    enteredEventName: "",
    enteredstartDate: "",
    enteredEndDate: "",
    enteredstarttime: "",
    enteredendtime: "",
    enteredstatus: "",
    error: {},
    eventheld: [],
  };

  eventChangeHandler = (event) => {
    this.setState({ enteredEventName: event.target.value }, () => {
      console.log(this.state.enteredEventName);
    });
  };
  startdateChangeHandler = (event) => {
    this.setState({ enteredstartDate: event.target.value });
  };
  enddateChangeHandler = (event) => {
    this.setState({ enteredEndDate: event.target.value });
  };
  starttimeChangeHandler = (event) => {
    this.setState({ enteredstarttime: event.target.value });
  };
  endtimeChangeHandler = (event) => {
    this.setState({ enteredendtime: event.target.value });
  };
  componentDidMount() {
    const { enteredstartDate, enteredEndDate } = this.state;
    if (
      moment(new Date(enteredstartDate)).format("YYYY-MM-DD") <=
        moment(new Date()).format("YYYY-MM-DD") &&
      moment(new Date(enteredEndDate)).format("YYYY-MM-DD") >=
        moment(new Date()).format("YYYY-MM-DD")
    ) {
      this.setState({ enteredstatus: "InProgress" });
    } else if (new Date(enteredstartDate) > new Date(enteredEndDate)) {
      this.setState({ enteredEndDate: enteredstartDate });
    } else if (
      moment(new Date(enteredstartDate)).format("YYYY-MM-DD") <
        moment(new Date()).format("YYYY-MM-DD") &&
      moment(new Date(enteredEndDate)).format("YYYY-MM-DD") <
        moment(new Date()).format("YYYY-MM-DD")
    ) {
      this.setState({ enteredstatus: "Event Completed" });
    } else if (
      moment(new Date(enteredstartDate)).format("YYYY-MM-DD") >
        moment(new Date()).format("YYYY-MM-DD") &&
      moment(new Date(enteredEndDate)).format("YYYY-MM-DD") >
        moment(new Date()).format("YYYY-MM-DD")
    ) {
      this.setState({ enteredstatus: "Upcoming Event" });
    }
  }

  addUserHandler = (event) => {
    event.preventDefault();

    if (
      this.state.enteredEventName.trim().length === 0 ||
      this.state.enteredendtime.length === 0 ||
      this.state.enteredstarttime.length === 0 ||
      this.state.enteredstartDate.length === 0 ||
      this.state.enteredEndDate.length === 0
    ) {
      this.setState({
        error: {
          title: "Invalid input",
          message: "Please enter  Valid inputs (non-empty values)",
        },
      });
      return;
    }
    console.log("event", this.state.enteredEventName);

    const eventinput = {
      id: v4(),
      event: this.state.enteredEventName,
      startdate: this.state.enteredstartDate,
      enddate: this.state.enteredEndDate,
      starttime: this.state.enteredstarttime,
      endtime: this.state.enteredendtime,
      eventstatus: this.state.enteredstatus,
    };
    console.log("input", eventinput);
    const details = JSON.parse(localStorage.getItem("events") || "[]");
    details.push(eventinput);

    console.log("details", details);
    // this.setState({ eventheld: [...this.state.eventheld, eventinput] });
    // console.log(this.state.eventheld);
    localStorage.setItem("events", JSON.stringify(details));
    // this.componentDidMount();
    // setevent([...eventheld, eventinput]);

    this.setState({ enteredEventName: "" });
    this.setState({ enteredstartDate: "" });
    this.setState({ enteredEndDate: "" });
    this.setState({ enteredstarttime: "" });
    this.setState({ enteredendtime: "" });
    window.location.reload();
  };
  Errorhandler = () => {
    this.setState({ error: null });
  };
  render() {
    const { error } = this.state;
    console.log(error);
    return (
      <Wrapper>
        {error && (
          <Errormodel
            key="1"
            title={error.title}
            message={error.message}
            onOk={this.Errorhandler}
          />
        )}
        <Card key="2" className={classes.input}>
          <form onSubmit={this.addUserHandler}>
            <label htmlFor="eventname">Event Name</label>
            <input
              id="eventname"
              type="text"
              name="enteredEventName"
              className="form-control"
              value={this.state.enteredEventName}
              onChange={this.eventChangeHandler}
            />
            <label htmlFor="startDate">Start Date</label>
            <input
              id="startDate"
              type="date"
              className="form-control"
              name="enteredstartDate"
              value={this.state.enteredstartDate}
              onChange={this.startdateChangeHandler}
            />
            <label htmlFor="endDate">End Date</label>
            <input
              id="endDate"
              type="date"
              name="enteredEndDate"
              className="form-control"
              min={this.state.enteredstartDate}
              value={this.state.enteredEndDate}
              onChange={this.enddateChangeHandler}
            />

            <label htmlFor="starttime">start time</label>
            <input
              id="starttime"
              type="time"
              className="form-control"
              name="enteredstarttime"
              value={this.state.enteredstarttime}
              onChange={this.starttimeChangeHandler}
            />
            <label htmlFor="end time">end time</label>
            <input
              id="end time"
              type="time"
              name="enteredendtime"
              className="form-control"
              value={this.state.enteredendtime}
              onChange={this.endtimeChangeHandler}
            />
            <Button type="submit">Add Event</Button>
          </form>
        </Card>
      </Wrapper>
    );
  }
}

export default AddUser;
