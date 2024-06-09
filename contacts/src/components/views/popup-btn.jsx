import React, { useState } from 'react';
import '../../assets/css/popup-btn.css';

const PopupBtn = ({ onClose, onSave }) => {
    const [values, setValues] = useState({ Fullname: '', phoneNumber: '', gender: '', type: '' });
    const [errors, setErrors] = useState({ Fullname: '', phoneNumber: '', type: '', gender: '' });

    const handleChange1 = (e) => {
        const { name, value } = e.target;
        if (name === 'phoneNumber' && !/^\d*$/.test(value)) {
            return;
        }
        setValues({
            ...values,
            [name]: value
        })
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'phoneNumber' && !/^\d*$/.test(value)) {
            return;
        }        setValues((prevContact) => ({
            ...prevContact,
            [name]: value,
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        let formErrors = {};

        if (!values.Fullname) {
            formErrors.Fullname = 'Name is required';
        }

        if (!values.phoneNumber) {
            formErrors.phoneNumber = 'Phone number is required';
        } else if (values.phoneNumber.length !== 10) {
            formErrors.phoneNumber = 'Phone number must be 10 digits';
        }

        if (!values.type) {
            formErrors.type = 'Type is required';
        }

        if (!values.gender) {
            formErrors.gender = 'Gender is required';
        }

        setErrors(formErrors);

        if (Object.keys(formErrors).length === 0) {
            onSave(values);
            console.log('Form submitted successfully', values);
            onClose(); // Close the popup after successful form submission
        }
    }

    return (
        <>
            <div className="popup">
                <div className="popup-inner">
                    <p className='contact-details'>Contact Details</p>
                    <form onSubmit={handleSubmit}>
                        <input className='input-field' type="text" name="Fullname" value={values.Fullname} onChange={handleChange} placeholder='Enter Your Name' />
                        {errors.Fullname && <div className="error">{errors.Fullname}</div>}

                        <input className='input-field' type="text" name="phoneNumber" value={values.phoneNumber} onChange={handleChange} placeholder='Enter Your Phone Number' />
                        {errors.phoneNumber && <div className="error">{errors.phoneNumber}</div>}

                        <select className='select-field' name="type" value={values.type} onChange={handleChange}>
                            <option value="">Select an Option</option>
                            <option value="Personal">Personal</option>
                            <option value="Business">Business</option>
                        </select>
                        {errors.type && <div className="error">{errors.type}</div>}

                        <select className='select-field' name="gender" value={values.gender} onChange={handleChange}>
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                        {errors.gender && <div className="error">{errors.gender}</div>}

                        <div>
                            <button className='sub-btn' type="submit">Add</button>
                            <button className='sub-btn' type="button" onClick={onClose}>Close</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default PopupBtn;
