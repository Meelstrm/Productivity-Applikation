import React from "react";
import EventItem from "./EventItem";
import AddEvent from "./AddEvent";
import EditEvent from "./EditEvent";

function Events({
    events,
    currentUser,
    addEvent,
    name, setName,
    startTime, setStartTime,
    endTime, setEndTime,
    startDate, setStartDate,
    endDate, setEndDate,
    isEditing, setIsEditing,
    editedEvent, setEditedEvent,
    filterMode, setFilterMode,
    deleteEvent, handleEditEvent, updateEvent, toggleFilter
}) {
   

    return (
        <div>
            <h2>Händelser</h2>
            {!isEditing ? (
                <AddEvent
                    addEvent={addEvent}
                    name={name} startTime={startTime} endTime={endTime}
                    startDate={startDate} endDate={endDate}
                    setName={setName} setStartTime={setStartTime}
                    setEndTime={setEndTime} setStartDate={setStartDate}
                    setEndDate={setEndDate}
                />
            ) : (
                <EditEvent
                    updateEvent={updateEvent}
                    name={name} startTime={startTime} endTime={endTime}
                    startDate={startDate} endDate={endDate}
                    setName={setName} setStartTime={setStartTime}
                    setEndTime={setEndTime} setStartDate={setStartDate}
                    setEndDate={setEndDate}
                />
            )}

            <div>
                <h3>Lista över händelser:</h3>
                <button onClick={toggleFilter}>
                    {filterMode === "all" ? "Kommande Händelser" : filterMode === "upcoming" ? "Tidigare Händelser" : "Visa alla"}
                </button>
                <ul>
                    {sortedFilteredEvents.map((event) => {
                        const eventTime = new Date(`${event.endDate}T${event.endTime}`).getTime();
                        return (
                            <div key={event.id}>
                                <EventItem
                                    deleteEvent={deleteEvent}
                                    handleEditEvent={handleEditEvent}
                                    event={event}
                                />
                                {eventTime < new Date().getTime() && <strong> Deadline har passerat!</strong>}
                            </div>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}

export default Events;
