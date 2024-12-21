import React from "react";


function EventItem({ event, deleteEvent, handleEditEvent, }) {
       
        return (
        <div>
        <div className="eventList">
       
            <strong>{event.name}</strong>
            <br />            
            <br />
            From: {event.startDate} kl. {event.startTime}
            <br />
            <br />
            Tom: {event.endDate} kl. {event.endTime}
       
        <br/>
        </div>


        <button className= "deleteEventBtn"onClick = {()=> deleteEvent (event)}>Ta bort</button>
        &nbsp;&nbsp;&nbsp;
        <button className= "editEventBtn"onClick = {() => handleEditEvent (event)}>Ändra händelse</button>
       
    </div>
    );
}


export default EventItem;
