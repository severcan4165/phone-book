import axios from "axios";
const baseUrl = "http://localhost:3002/persons"

const getContacts = async () => {
   const {data} =  await axios.get(baseUrl)
   return data
}

const addNewContact = async(newContact) => {
    const {data} =  await axios.post(baseUrl,newContact)
    return data
}

const deleteContact = async (id) => {
    const {data} = await axios.delete(`${baseUrl}/${id}`)
    return data
}
const updateContact = async (id, updatedContact) => {
    const {data} = await axios.put(`${baseUrl}/${id}`,updatedContact )
    return data
}
export default {
    getContacts,
    addNewContact,
    deleteContact,
    updateContact
}