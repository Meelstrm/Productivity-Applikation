

function FilterTodos({title, filters, selectedFilters, handleFilterClick}) {
    return(
        <>
        <div className="todoFilterBtns">
            {filters.map((filter, index) => (
                <button key={index} onClick={() => handleFilterClick(filter)} className={`filterTodoBtn  ${selectedFilters.includes(filter)
                    ? "active" : ""}`}>{filter}</button>
            ))}
        </div>
        </>
    )
}


export default FilterTodos
