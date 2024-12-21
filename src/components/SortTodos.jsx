import React, { useState } from "react";


function SortTodos({sortTodos}) {


  const [sortField, setSortField] = useState("deadline")


  const [sortOrder, setSortOrder] = useState("asc")






  const handleSortFieldChange = (e) => {
    setSortField(e.target.value)
    sortTodos(e.target.value, sortOrder)
  };




  const handleSortOrderChange = (e) => {
    setSortOrder(e.target.value)
    sortTodos(sortField, e.target.value);
  };


  return (
    <>
    <div className="sortTodos">
      <select value={sortField} onChange={handleSortFieldChange}>
        <option value="deadline">Deadline</option>
        <option value="timeEstimate">Time Estimate</option>
        <option value="status">Status</option>
      </select>




      <select value={sortOrder} onChange={handleSortOrderChange}>
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
    </div>
    </>
  );
}


export default SortTodos;
