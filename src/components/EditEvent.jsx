import React from "react"
import Events from "./Events"


function EditEvent({updateEvent, name, startTime, endTime, startDate, endDate, setName, setStartTime, setStartDate, setEndTime, setEndDate }) {
    return (
        <div>
            <form onSubmit={updateEvent}>
                <label>
                    Ny händelse:
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </label>
                <br />

                <label>
                    Starttid:
                    <input
                        type="time"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                    />
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                </label>
                <br />

                <label>
                    Sluttid:
                    <input
                        type="time"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                    />
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                </label>
                <br />

                <button type="submit">Spara</button>
            </form>

        </div>
    )
}

export default EditEvent