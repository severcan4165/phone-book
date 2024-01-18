import React from 'react'

const FilterContacts = ({handleFilter}) => {
  return (
    <div>
         <div className="flex my-2">
        <label className="py-2 w-1/5 font-bold " htmlFor="filterPhone">
          {" "}
          Filter:
        </label>
        <input
          id="filterPhone"
          className="border-2 border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500"
          type="text"
          onChange={handleFilter}
        />
      </div>
    </div>
  )
}

export default FilterContacts