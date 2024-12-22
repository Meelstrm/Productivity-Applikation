import React, { useState, useEffect } from "react";
import EventItem from "./EventItem";
import AddEvent from "./AddEvent";
import EditEvent from "./EditEvent";


function Events({ events, setEvents, currentUser }) {
    const [name, setName] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [editedEvent, setEditedEvent] = useState(null);
    const [filterMode, setFilterMode] = useState("all");

    function addEvent(e) {
        e.preventDefault();

        const id = new Date().getTime();
        const userId = currentUser ? currentUser.userId : null;

        if (name && startTime && endTime && startDate && endDate) {
            const newEvent = { id, name, startTime, endTime, startDate, endDate, userId };

            setEvents((prevEvents) => {
                const updatedEvents = [...prevEvents, newEvent];
                localStorage.setItem("events", JSON.stringify(updatedEvents));
                return updatedEvents;
            });

            setName("");
            setStartTime("");
            setEndTime("");
            setStartDate("");
            setEndDate("");
        } else {
            alert("Fyll i alla fält!");
        }
    }

    function deleteEvent(eventToDelete) {
        setEvents((prevEvents) => {
            const updatedEvents = prevEvents.filter((event) => event.id !== eventToDelete.id);
            localStorage.setItem("events", JSON.stringify(updatedEvents));
            return updatedEvents;
        });
    }

    function handleEditEvent(eventItem) {
        setIsEditing(true);
        setEditedEvent(eventItem);
        setName(eventItem.name);
        setStartTime(eventItem.startTime);
        setStartDate(eventItem.startDate);
        setEndTime(eventItem.endTime);
        setEndDate(eventItem.endDate);
    }

    function updateEvent(e) {
        e.preventDefault();

        setEvents((prevEvents) => {
            const updatedEvents = prevEvents.map((event) =>
                event.id === editedEvent.id
                    ? { ...event, name, startTime, startDate, endTime, endDate }
                    : event
            );

            localStorage.setItem("events", JSON.stringify(updatedEvents));
            return updatedEvents;
        });

        setIsEditing(false);
        setEditedEvent(null);
        setName("");
        setStartTime("");
        setStartDate("");
        setEndTime("");
        setEndDate("");
    }

    function toggleFilter() {
        if (filterMode === "all") {
            setFilterMode("upcoming");
        } else if (filterMode === "upcoming") {
            setFilterMode("past");
        } else {
            setFilterMode("all");
        }
    }

    const filteredEvents = events.filter((event) => event.userId === (currentUser?.userId || null));

    return (
        <div>
            <h2>Händelser</h2>

            {!isEditing && (
                <AddEvent
                    addEvent={addEvent}
                    name={name}
                    startTime={startTime}
                    startDate={startDate}
                    endTime={endTime}
                    endDate={endDate}
                    setName={setName}
                    setStartTime={setStartTime}
                    setStartDate={setStartDate}
                    setEndTime={setEndTime}
                    setEndDate={setEndDate}
                />
            )}

            {isEditing && (
                <EditEvent
                    updateEvent={updateEvent}
                    name={name}
                    startTime={startTime}
                    startDate={startDate}
                    endTime={endTime}
                    endDate={endDate}
                    setName={setName}
                    setStartTime={setStartTime}
                    setStartDate={setStartDate}
                    setEndTime={setEndTime}
                    setEndDate={setEndDate}
                />
            )}

            <div>
                <h3>Lista över händelser:</h3>
                <button onClick={toggleFilter}>
                    {filterMode === "all"
                        ? "Kommande Händelser"
                        : filterMode === "upcoming"
                        ? "Tidigare Händelser"
                        : "Visa alla"}
                </button>
                <ul>
                    {filteredEvents
                        .slice()
                        .sort((a, b) => {
                            const dateTimeA = new Date(`${a.endDate}T${a.endTime}`).getTime();
                            const dateTimeB = new Date(`${b.endDate}T${b.endTime}`).getTime();
                            return dateTimeA - dateTimeB;
                        })
                        .filter((event) => {
                            const eventTime = new Date(`${event.endDate}T${event.endTime}`).getTime();
                            if (filterMode === "upcoming") {
                                return eventTime >= new Date().getTime();
                            } else if (filterMode === "past") {
                                return eventTime < new Date().getTime();
                            }
                            return true;
                        })
                        .map((event) => {
                            const eventTime = new Date(`${event.endDate}T${event.endTime}`).getTime();

                            if (eventTime < new Date().getTime()) {
                                return (
                                    <div key={event.id}>
                                        <EventItem
                                            deleteEvent={deleteEvent}
                                            handleEditEvent={handleEditEvent}
                                            event={event}
                                        />
                                        <strong> Deadline har passerat!</strong>
                                    </div>
                                );
                            }

                            return (
                                <div key={event.id}>
                                    <EventItem
                                        deleteEvent={deleteEvent}
                                        handleEditEvent={handleEditEvent}
                                        event={event}
                                    />
                                </div>
                            );
                        })}
                </ul>
            </div>
        </div>
    );
}

export default Events;