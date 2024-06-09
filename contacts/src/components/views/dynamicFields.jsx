import React,{useState} from "react"
import { CiCirclePlus } from "react-icons/ci";
import Popup from './popup';
import '../../assets/css/dynamic.css'
const DynamicField = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [contacts, setContacts] = useState([]);
    const [deletedContacts, setDeletedContacts] = useState([]);
    const [currentContact, setCurrentContact] = useState({ name: '', phone: '', type: 'personal', gender: 'male' });
    const [isEditing, setIsEditing] = useState(false);
    const [editIndex, setEditIndex] = useState(null);

    const togglePopup = () => {
        setShowPopup(!showPopup);
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCurrentContact({ ...currentContact, [name]: value });
      };

      const handleAddContact = () => {
        if (isEditing) {
          const updatedContacts = [...contacts];
          updatedContacts[editIndex] = currentContact;
          setContacts(updatedContacts);
          setIsEditing(false);
        } else {
          setContacts([...contacts, currentContact]);
        }
        setCurrentContact({ name: '', phone: '', type: 'personal', gender: 'male' });
        setShowPopup(false);
      };

      const handleEditContact = (index) => {
        setCurrentContact(contacts[index]);
        setEditIndex(index);
        setIsEditing(true);
        setShowPopup(true);
      };
    
      const handleDeleteContact = (index) => {
        const newContacts = [...contacts];
        const deletedContact = newContacts.splice(index, 1);
        setContacts(newContacts);
        setDeletedContacts([...deletedContacts, ...deletedContact]);
      };
    
      const handleRestoreContact = (index) => {
        const newDeletedContacts = [...deletedContacts];
        const restoredContact = newDeletedContacts.splice(index, 1);
        setDeletedContacts(newDeletedContacts);
        setContacts([...contacts, ...restoredContact]);
      };
    

    return (
        <>
            <div className="add-btn">
            <button onClick={togglePopup} className="circle-btn">
                <CiCirclePlus size={24} />
                <span>Add</span>
            </button>  
            <Popup show={showPopup} handleClose={togglePopup}>
            <form className="form">
                <label>Name: <input type="text" name="name" value={currentContact.name} onChange={handleInputChange} /></label>
                <label>Phone: <input type="text" name="phone" value={currentContact.phone} onChange={handleInputChange} /></label>
                <label>Type: 
                    <select name="type" value={currentContact.type} onChange={handleInputChange}>
                        <option value="personal">Personal</option>
                        <option value="work">Work</option>
                    </select>
                </label>
                <label>Gender: 
                    <select name="gender" value={currentContact.gender} onChange={handleInputChange}>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </label>
                <button className="form-btn" onClick={handleAddContact}>{isEditing ? 'Update' : 'Add'}</button>
                <button className="form-btn" onClick={() => setShowPopup(false)}>Cancel</button>
            </form>
             {/* <div className="field-container">
                    <input
                        type="text"
                        name="name"
                        value={currentContact.name}
                        onChange={handleInputChange}
                        placeholder="Enter Your Name"
                        className="input-field"
                    />
                    <input
                        type="number"
                        name="number"
                        onChange={handleInputChange}
                        placeholder="Enter Your Number"
                        className="input-field"
                        value={currentContact.phone}
                    />
                    <select
                        value={currentContact.gender}
                        onChange={handleInputChange}
                        className="select-field"
                    >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                    <select
                        value={currentContact.type}
                        onChange={handleInputChange}
                        className="select-field"
                    >
                        <option value="personal">Personal</option>
                        <option value="work">Work</option>
                    </select>
                </div> */}
        </Popup>
        <h2>Contacts</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Type</th>
            <th>Gender</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact, index) => (
            <tr key={index}>
              <td>{contact.name}</td>
              <td>{contact.phone}</td>
              <td>{contact.type}</td>
              <td>{contact.gender}</td>
              <td>
                <button onClick={() => handleEditContact(index)}>Edit</button>
                <button onClick={() => handleDeleteContact(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Deleted Contacts</h2>
      <ul>
        {deletedContacts.map((contact, index) => (
          <li key={index}>
            {contact.name} ({contact.phone}) - {contact.type} - {contact.gender}
            <button onClick={() => handleRestoreContact(index)}>Restore</button>
          </li>
        ))}
      </ul>
       
        </div>            

        </>
    )
}

export default DynamicField