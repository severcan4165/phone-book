import React from 'react'

const NewContact = ({newPhone, setNewPhone, handleSubmit}) => {
  return (
    <div>
    <form onSubmit={handleSubmit}>
      <h2 className="font-bold text-blue-700 text-[22px]">New Phone Add</h2>
      <div>
        <div className="flex my-2">
          <label className="py-2 w-1/5 font-bold" htmlFor="userName">
            {" "}
            Name:
          </label>
          <input
            className="border-2 border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500"
            id="userName"
            type="text"
            onChange={(e) =>
              setNewPhone({ ...newPhone, name: e.target.value })
            }
            value={newPhone.name}
          />
        </div>
        <div className="flex">
          <label className="py-2 w-1/5  font-bold" htmlFor="userNumber">
            {" "}
            Phone:
          </label>

          <input
            className="border-2 border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500"
            id="userNumber"
            type="number"
            onChange={(e) =>
              setNewPhone({ ...newPhone, number: e.target.value })
            }
            value={newPhone.number}
          />
        </div>
      </div>
      <div className="flex justify-center my-2">
        <button
          className="bg-blue-500 hover:bg-blue-700 w-1/4 text-white font-bold py-2 px-4 rounded"
          type="submit"
        >
          Add
        </button>
      </div>
    </form>
  </div>
  )
}

export default NewContact