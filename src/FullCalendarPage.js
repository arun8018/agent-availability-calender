import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import AvailibilityPopup from "./Components/AvailibilityPopup";
import moment from 'moment' 

export default function FullCalendarPage() {
  const calendarRef = React.createRef();
  const [open, setOpen] = useState(false);
  const [calendarInfo, setCalendarInfo] = useState("");
  const handleDateClick = (info) => {
    setCalendarInfo(moment(info.date).format("LL"));
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
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
        // events={eventInfo}
        // select={handleDateSelect}
        // eventClick={handleEventClick}
        ref={calendarRef}
        //selectAllow={selectDisable}
      />
      {open && <AvailibilityPopup open={open} calendarInfo={calendarInfo} handleClose={handleClose} />}
    </>
  );
}
