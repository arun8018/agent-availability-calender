import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import AvailibilityPopup from "./Components/AvailibilityPopup";
import moment from "moment";
import axios from "./api/axios";
const ID = window.location.search.substr(
  window.location.search.indexOf("=") + 1
);

export default function FullCalendarPage() {
  const calendarRef = React.createRef();
  const [open, setOpen] = useState(false);
  const [isLoading,setLoading]=useState(false)
  const [calendarInfo, setCalendarInfo] = useState("");
  const [eventInfo, setEventInfo] = useState([]);
  const [availabilityHours_for_day, setAvailabilityHours_for_day] = useState(
    []
  );

  const handleDateClick = (info) => {
    let date = moment(info.date).format("YYYY-MM-DD");
    setCalendarInfo(info.date);
    setOpen(true);
    setLoading(true)
    axios
      .get(`/agent-availability/?date=${date}&agent_id=33`)
      .then((response) => {
        setAvailabilityHours_for_day(response.data);
        setLoading(false)
      });
  };

  const handleClose = () => {
    setOpen(false);
    setAvailabilityHours_for_day([]);
    initialAvailibilityLoad();
  };

  const initialAvailibilityLoad = async () => {
    await axios.get(`/agent-availability/?agent_id=33`).then((response) => {
      let arr = [];
      for (let i = 0; i < response.data.length; i++) {
        let data = {
          id: response.data[i].id,
          agent: response.data[i].agent,
          title: "Not Available",
          start: response.data[i].availableFrom.substring(0, 19), //2020-11-26T09:00:00
          end: response.data[i].availableTo.substring(0, 19),
        };
        arr.push(data);
      }
      setEventInfo(arr);
    });
  };

  useEffect(() => {
    initialAvailibilityLoad();
  }, []);

  const handleAddButton = (data) => {
    const postData = {
      date: moment(calendarInfo).format("YYYY-MM-DD"),
      availability_time: [data],
      agent_id: "33",
    };

    axios.post("/agent-availability/", postData).then((response) => {
      if (response.data.length > 0) {
        setAvailabilityHours_for_day([
          ...availabilityHours_for_day,
          response.data[0],
        ]);
      }
    });
  };

  const handleDeleteButton = (id) => {
    axios.delete(`/agent-availability/${id}`).then((response) => {
      var lists = availabilityHours_for_day.filter((item) => {
        return item.id !== id;
      });
      setAvailabilityHours_for_day(lists);
    });
  };

  const handleSaveClick = (id, data) => {
    axios.put(`/agent-availability/${id}`, data).then((response) => response);
  };

  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
        headerToolbar={{
          left: "prevYear,prev,next,nextYear today",
          center: "title",
          right: "",
        }}
        initialView="dayGridMonth"
        editable={false}
        selectable={true}
        selectMirror={true}
        allDaySlot={false}
        dateClick={handleDateClick}
        events={eventInfo}
        ref={calendarRef}
      />
      {open && (
        <AvailibilityPopup
          open={open}
          calendarInfo={calendarInfo}
          handleClose={handleClose}
          handleAddButton={handleAddButton}
          handleDeleteButton={handleDeleteButton}
          handleSaveClick={handleSaveClick}
          availabilityHours={availabilityHours_for_day}
          isLoading={isLoading}
        />
      )}
    </>
  );
}
