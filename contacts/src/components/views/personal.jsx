import React, { useState, useEffect } from 'react';
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import PopupBtn from './popup-btn';
import '../../assets/css/dynamic.css';

const Personal = () => {
  const [contacts, setContacts] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [editContact, setEditContact] = useState(null);
  const [selectedContacts, setSelectedContacts] = useState([]);

  useEffect(() => {
    // Load contacts from local storage on component mount
    const storedContacts = JSON.parse(localStorage.getItem('contacts')) || [];
    setContacts(storedContacts.filter(contact => contact.type === 'Personal'));
  }, []);

  const openPopup = () => {
    setShowPopup(true);
    setEditContact(null);
  }

  const handleSave = (newContact) => {
    const updatedContacts = editContact
      ? contacts.map(contact => contact.phoneNumber === editContact.phoneNumber ? newContact : contact)
      : [...contacts, newContact];
      
    setContacts(updatedContacts);
    localStorage.setItem('contacts', JSON.stringify(updatedContacts));
    setShowPopup(false);
  }

  const handleEdit = (contact) => {
    setEditContact(contact);
    setShowPopup(true);
  }

  const handleDelete = () => {
    const newContacts = contacts.filter(contact => !selectedContacts.includes(contact.phoneNumber));
    setContacts(newContacts);
    localStorage.setItem('contacts', JSON.stringify(newContacts));
    setSelectedContacts([]);
  };

  const handleCheckboxChange = (phoneNumber) => {
    setSelectedContacts(prevSelected => 
      prevSelected.includes(phoneNumber) 
        ? prevSelected.filter(num => num !== phoneNumber) 
        : [...prevSelected, phoneNumber]
    );
  };
  const personalCount = contacts.length;

  return (
    <>
        <div className='add-btn'>
            <button className="circle-btn" onClick={openPopup}>Add Contact</button>
            {showPopup && (
                <PopupBtn onSave={handleSave} onClose={() => setShowPopup(false)} contact={editContact} />
            )}
        </div>
        <h2>Total Personal Number Contacts: {personalCount}</h2>
        <div className="contacts-list">
            <MDBTable align='middle' style={{ width: '100%' }}>
                <MDBTableHead >
                    <tr>
                        <th scope='col'></th>
                        <th scope='col'>Name</th>
                        <th scope='col'>Phone Number</th>
                        <th scope='col'>Gender</th>
                        <th scope='col'>Type</th>
                        <th scope='col'>Actions</th>
                    </tr>
                </MDBTableHead>
                <MDBTableBody style={{ marginTop: '10px' }}>
                    {contacts.map((contact, index) => (
                        <tr key={index}>
                        <td>
                            <input 
                            type="checkbox" 
                            className='checkbox-field' 
                            checked={selectedContacts.includes(contact.phoneNumber)}
                            onChange={() => handleCheckboxChange(contact.phoneNumber)}
                            />
                        </td>
                        <td>{contact.Fullname}</td>
                        <td>{contact.phoneNumber}</td>
                        <td>{contact.gender}</td>
                        <td>{contact.type}</td>
                        <td>
                            <div className='edit-btn'>
                            <button className="del-btn" onClick={() => handleEdit(contact)}>Edit</button>
                            <button className="del-btn" onClick={handleDelete}>Delete</button>
                            </div>
                        </td>
                        </tr>
                    ))}
                </MDBTableBody>
            </MDBTable>
        </div>
    </>
  );
}

export default Personal;
