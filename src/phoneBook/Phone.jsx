import React, { useEffect, useState } from "react";
import NewContact from "./NewContact";
import FilterContacts from "./FilterContacts";
import phoneServices from "../services/Phones";
import Notification from "./Notification";

const Phone = () => {
    const [phoneNumbers, setPhoneNumbers] = useState([]);
    const [newPhone, setNewPhone] = useState({ name: "", number: ""});
    const [filterQuery, setFilterQuery] = useState("");
    const [filteredPhoneList, setFilteredPhoneList] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null)

    
    useEffect(()=>{
      phoneServices.getContacts().then(data=>setPhoneNumbers(data))
    }, [])

   

    const handleSubmit = (e) => {
        e.preventDefault()
        
       let isRecorded = phoneNumbers.some(phone => phone.name === newPhone.name)
       if(isRecorded){
        let resp = confirm("numara var değiştireyim mi?")
        if(resp){
            let newEnteredNumber = newPhone.number

            let toBeUpdated = phoneNumbers.find(phone => phone.name === newPhone.name)

            let newNumber = {...toBeUpdated, number:newEnteredNumber}
            //* bir alt satırda updatecontact ile server üzerinde güncellemeyi yaptık, daha sonra
            //* dönen promise yapısını yönettik, gelen veri aslında gönderdiğimiz obje ile aynı,
            //* bu güncellediğimiz veriyi setphoneNumbers içinde ilgili id ile eşleştirerek bizim 
            //* localdeki telefon numaraları listesini de güncelledik.
            phoneServices.updateContact(newNumber.id,newNumber)
            .then(res => {
                setPhoneNumbers(phoneNumbers.map(phone => phone.id === newNumber.id ? (res):(phone)))
            })
            setErrorMessage(`${newPhone.name}'s number changed successfully`)
            setNewPhone({ name: "", number: ""})
            setTimeout(() => {
                setErrorMessage(null)
              }, 3000)
        }
       }
       else{
        phoneServices.addNewContact(newPhone).then(response =>{
           
            setPhoneNumbers(phoneNumbers.concat(response))
            setErrorMessage(`${newPhone.name} added successfully`)
            setNewPhone({ name: "", number: ""})
            setTimeout(() => {
                setErrorMessage(null)
              }, 3000)
        })
       }
      
  
      
    };

    const handleDelete = (id) => {
        let res = confirm("sileyim mi?")
        if(res){
            phoneServices.deleteContact(id).then(response => {
                // console.log(phoneNumbers.filter(phone => phone.id != response.id))
                setPhoneNumbers(phoneNumbers.filter(phone => phone.id != response.id))
            }) .catch(error => {
                let asdas = phoneNumbers.find(phone => phone.id === id)
                alert(
                  `the note '${asdas.name}' was already deleted from server`
                )
                setPhoneNumbers(phoneNumbers.filter(n => n.id !== id))
              })
        }
       
    }
    const handleFilter = (e) => {
        //    setFilterQuery(e.target.value)
        let filteredList = phoneNumbers.filter((item) =>
            item.name.includes(e.target.value)
        );
        setFilteredPhoneList(filteredList);
    };



    return (
        <div className="m-2 p-5 rounded-md bg-orange-400  w-[350px]">
            <h1 className="text-blue-700 font-bold text-[24px]">Phonebook</h1>
            <Notification message={errorMessage} />
            <FilterContacts handleFilter={handleFilter} />
            <NewContact
                newPhone={newPhone}
                setNewPhone={setNewPhone}
                handleSubmit={handleSubmit}
            />

            <h2 className="font-bold text-blue-700 text-[22px]">Phone Numbers</h2>
           
            {filteredPhoneList?.map((item) => {
                return (
                    <p key={item.id}>
                        {item.name}: {item.number}
                    </p>
                );
            })}

            <div>
                {phoneNumbers?.map((item) => {
                    return (
                        <div key={item.id} className="flex my-1 justify-between items-center">
                             <p >
                            {item.name}: {item.number}
                        </p>
                        <div>
                            <button  className="bg-red-500 hover:bg-red-700  text-white font-bold py-1 px-2 rounded" onClick={()=>handleDelete(item.id)}>Delete</button>
                           
                        </div>
                        </div>
                       
                    );
                })}
            </div>
        </div>
    );
};

export default Phone;


    // let filteredArray = phoneNumbers?.filter(item => {
    //     return(
    //         item.name.includes(filterQuery)
    //     )
    // })
