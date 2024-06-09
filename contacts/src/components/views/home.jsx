import React, { useState, useEffect } from 'react';
import {MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import '../../assets/css/dynamic.css';
import PopupBtn from './popup-btn';

const Home = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [contacts, setContacts] = useState([]);
    const [editContact, setEditContact] = useState(null);
    const [selectedContacts, setSelectedContacts] = useState([]);
    const [filter, setFilter] = useState('');

    useEffect(() => {
        // Load contacts from local storage on component mount
        const storedContacts = JSON.parse(localStorage.getItem('contacts')) || [];
        setContacts(storedContacts);
    }, []);

    useEffect(() => {
        // Save contacts to local storage whenever they change
        localStorage.setItem('contacts', JSON.stringify(contacts));
    }, [contacts]);

    const openPopup = () => {
        setShowPopup(true);
        setEditContact(null); // Reset edit contact
    }

    const handleSave = (newContact) => {
        if (editContact) {
            // Update existing contact
            const updatedContacts = contacts.map(contact =>
                contact.phoneNumber === editContact.phoneNumber ? newContact : contact
            );
            setContacts(updatedContacts);
        } else {
            // Add new contact
            setContacts([...contacts, newContact]);
        }
        setShowPopup(false); // Close popup after saving
    }

    const handleEdit = (contact) => {
        setEditContact(contact);
        setShowPopup(true);
    }

    const handleClosePopup = () => {
        setShowPopup(false);
        setEditContact(null); // Reset edit contact
    };

    const handleDelete = () => {
        const newContacts = contacts.filter(contact => !selectedContacts.includes(contact.phoneNumber));
        setContacts(newContacts);
        setSelectedContacts([]);
    };

    const handleCheckboxChange = (phoneNumber) => {
        setSelectedContacts(prevSelected => 
            prevSelected.includes(phoneNumber) 
                ? prevSelected.filter(num => num !== phoneNumber) 
                : [...prevSelected, phoneNumber]
        );
    };

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

    const filteredContacts = contacts.filter(contact => {
        if (!filter) return true;
        return contact.type === filter || contact.gender === filter;
    });

    return (
        <>
            <div className='add-btn'>
                <button className="circle-btn" onClick={openPopup}>Add Contacts</button>
                {showPopup && (
                    <PopupBtn onSave={handleSave} onClose={handleClosePopup} contact={editContact} />
                )}
            </div>
            <div className="filter-dropdown">
                Select the Filter : 
                <select className='select-field' onChange={handleFilterChange} value={filter}>
                    <option value="">All</option>
                    <option value="Personal">Personal</option>
                    <option value="Business">Business</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
            </div>
            <div className="contacts-list">
                <MDBTable align='middle' style={{ width: '100%' }}>
                    <MDBTableHead>
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
                        <tr>
                            <td>
                                <input 
                                    type="checkbox" 
                                    className='checkbox-field' 
                                />
                            </td>
                            <td>Sai Kiranmayi Grandhi</td>
                            <td>9100394566</td>
                            <td>Female</td>
                            <td>Personal</td>
                            <td>
                                <div className='edit-btn'>
                                    <button className="del-btn " onClick={() => handleEdit()}>Edit</button>
                                    <button className="del-btn" onClick={handleDelete}>Delete</button>
                                </div>
                            </td>
                        </tr>
                        {filteredContacts.map((contact, index) => (
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
                                        <button className="del-btn " onClick={() => handleEdit(contact)}>Edit</button>
                                        <button className="del-btn" onClick={handleDelete}>Delete</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </MDBTableBody>
                </MDBTable>
                {/* {selectedContacts.length > 0 && (
                    <MDBBtn color='danger' onClick={handleDelete}>Delete All</MDBBtn>
                )} */}
            </div>
        </>
    );
}

export default Home;
