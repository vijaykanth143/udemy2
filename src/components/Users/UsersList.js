import React, { useState, useEffect, useContext, Component } from "react";
import Card from "../UI/Card";
import classes from "./UsersList.module.css";

import ReactDOM from "react-dom";
import MaterialTable from "material-table";
import tableIcons from "../tableicons";
import AddUser from "./AddUser";
import moment from "moment";
class UserList extends Component {
  state = { details: [], data: [] };
  // componentDidMount() {
  //   console.log("dd", this.props.events);
  // }
  componentDidMount() {
    console.log("dd", this.props.events);
    this.setState({ data: this.props.events });
    const data = JSON.parse(localStorage.getItem("events"));
    data &&
      data.map((event) => {
        if (
          moment(new Date(event.startdate)).format("YYYY-MM-DD") >
          moment(new Date(event.enddate)).format("YYYY-MM-DD")
        ) {
          event.enddate = event.startdate;
          window.location.reload();
        } else if (
          moment(new Date(event.startdate)).format("YYYY-MM-DD") <=
            moment(new Date()).format("YYYY-MM-DD") &&
          moment(new Date(event.enddate)).format("YYYY-MM-DD") >=
            moment(new Date()).format("YYYY-MM-DD")
        ) {
          event.eventstatus = "Inprogress";
        } else if (
          moment(new Date(event.startdate)).format("YYYY-MM-DD") <
            moment(new Date()).format("YYYY-MM-DD") &&
          moment(new Date(event.enddate)).format("YYYY-MM-DD") <
            moment(new Date()).format("YYYY-MM-DD")
        ) {
          event.eventstatus = "Event completed";
        } else if (
          moment(new Date(event.startdate)).format("YYYY-MM-DD") >
            moment(new Date()).format("YYYY-MM-DD") &&
          moment(new Date(event.enddate)).format("YYYY-MM-DD") >
            moment(new Date()).format("YYYY-MM-DD")
        ) {
          event.eventstatus = "Upcoming event";
        }
      });
    localStorage.setItem("events", JSON.stringify(data));
  }
  // componentDidUpdate(prevProps, prevState) {
  //   console.log(
  //     "jkbfg",
  //     prevProps,
  //     "state",
  //     prevState,
  //     "curr",
  //     this.state.data
  //   );
  //   console.log(prevState.data !== this.state.data);
  //   console.log("p", prevState.details, "c", this.state.details);
  //   const data = JSON.parse(localStorage.getItem("events"));
  //   if (prevState.data !== this.state.data) {
  //     const data = JSON.parse(localStorage.getItem("events"));
  //     console.log("//", data);
  //   }
  // }

  render() {
    // console.log("stor", data);
    const data = JSON.parse(localStorage.getItem("events"));
    console.log("dddd", data);

    return (
      <>
        {" "}
        {/* <AddUser data={eventsdetails} /> */}
        <Card className={classes.users}>
          {" "}
          <MaterialTable
            title="Events Preview"
            icons={tableIcons}
            editable={{
              onRowDelete: (selectedrow) =>
                new Promise((resolve, reject) => {
                  const data = JSON.parse(localStorage.getItem("events"));
                  const index = selectedrow.tableData.id;

                  const updatedrows = [...data];

                  updatedrows.splice(index, 1);

                  // setRowsData([...rowsdata, ...updatedrows]);
                  // this.setState({ details: updatedrows });
                  localStorage.setItem("events", JSON.stringify(updatedrows));

                  window.location.reload();
                  resolve();
                }),
              onRowUpdate: (updatedrow, oldrow) =>
                new Promise((resolve, reject) => {
                  const data = JSON.parse(localStorage.getItem("events"));
                  const index = oldrow.tableData.id;
                  console.log("u", updatedrow);
                  console.log("o", oldrow);
                  console.log("i", index);
                  const updatedrows = [...data];

                  updatedrows[index] = updatedrow;
                  console.log("uu", updatedrows);
                  this.componentDidMount();
                  // setRowsData([...rowsdata, ...updatedrows]);
                  // this.setState({ details: updatedrows });
                  localStorage.setItem("events", JSON.stringify(updatedrows));
                  window.location.reload();
                  resolve();
                }),
            }}
            columns={[
              { title: "Event Name", field: "event" },
              { title: "Start Date", field: "startdate", type: "date" },
              { title: "End Date", field: "enddate", type: "date" },
              {
                title: "Start Time",
                field: "starttime",
                type: "time",
                dateSetting: {
                  format: "dd-MM-yyyy",
                },
              },
              {
                title: "End Time",
                field: "endtime",
                type: "time",
              },
              {
                title: "Status",
                field: "eventstatus",
              },
            ]}
            data={
              JSON.parse(localStorage.getItem("events"))
                ? JSON.parse(localStorage.getItem("events"))
                : []
            }
          />
        </Card>
      </>
    );
  }
}
// const UserList = (props) => {
//   const [rowsdata, setRowsData] = useState([]);
//   const [eventstatus, setstatus] = useState("");
//   const eventsdetails = JSON.parse(localStorage.getItem("events"));
//   console.log(props.users);

//   useEffect(() => {}, [rowsdata]);

//   useEffect(() => {
//     eventsdetails &&
//       eventsdetails.map((event) => {
//         if (
//           moment(new Date(event.startdate)).format("YYYY-MM-DD") >
//           moment(new Date(event.enddate)).format("YYYY-MM-DD")
//         ) {
//           event.enddate = event.startdate;
//         } else if (
//           moment(new Date(event.startdate)).format("YYYY-MM-DD") <=
//             moment(new Date()).format("YYYY-MM-DD") &&
//           moment(new Date(event.enddate)).format("YYYY-MM-DD") >=
//             moment(new Date()).format("YYYY-MM-DD")
//         ) {
//           event.eventstatus = "Inprogress";
//         } else if (
//           moment(new Date(event.startdate)).format("YYYY-MM-DD") <
//             moment(new Date()).format("YYYY-MM-DD") &&
//           moment(new Date(event.enddate)).format("YYYY-MM-DD") <
//             moment(new Date()).format("YYYY-MM-DD")
//         ) {
//           event.eventstatus = "Event completed";
//         } else if (
//           moment(new Date(event.startdate)).format("YYYY-MM-DD") >
//             moment(new Date()).format("YYYY-MM-DD") &&
//           moment(new Date(event.enddate)).format("YYYY-MM-DD") >
//             moment(new Date()).format("YYYY-MM-DD")
//         ) {
//           event.eventstatus = "U pcoming event";
//         } else {
//           setstatus("");
//         }
//       });
//     localStorage.setItem("events", JSON.stringify(eventsdetails));
//   }, [eventsdetails]);
//   console.log(eventsdetails);
//   // localStorage.setItem("events", JSON.stringify(eventsdetails));
//   return (
//     <>
//       {" "}
//       {/* <AddUser data={eventsdetails} /> */}
//       <Card className={classes.users}>
//         <MaterialTable
//           title="Multiple Actions Preview"
//           icons={tableIcons}
//           editable={{
//             onRowDelete: (selectedrow) =>
//               new Promise((resolve, reject) => {
//                 const index = selectedrow.tableData.id;

//                 const updatedrows = [...eventsdetails];
//                 updatedrows.splice(index, 1);
//                 setRowsData([...rowsdata, ...updatedrows]);

//                 localStorage.setItem("events", JSON.stringify(updatedrows));
//                 resolve();
//               }),
//             onRowUpdate: (updatedrow, oldrow) =>
//               new Promise((resolve, reject) => {
//                 const index = oldrow.tableData.id;

//                 const updatedrows = [...eventsdetails];

//                 updatedrows[index] = updatedrow;

//                 setRowsData([...rowsdata, ...updatedrows]);
//                 localStorage.setItem("events", JSON.stringify(updatedrows));
//                 resolve();
//               }),
//           }}
//           columns={[
//             { title: "Event Name", field: "event" },
//             { title: "Start Date", field: "startdate" },
//             { title: "End Date", field: "enddate" },
//             {
//               title: "Start Time",
//               field: "starttime",
//             },
//             {
//               title: "End Time",
//               field: "endtime",
//             },
//             {
//               title: "Status",
//               field: "eventstatus",
//             },
//           ]}
//           data={eventsdetails ? eventsdetails : []}
//         />
//       </Card>
//     </>
//   );
// };

export default UserList;
