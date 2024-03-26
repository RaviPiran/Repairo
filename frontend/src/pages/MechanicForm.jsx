import React, { useState } from 'react';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const MechanicForm = () => {
  const [ShopName, setShopName] = useState('');
  const [Location, setLocation] = useState('');
  const [ShopAddress, setShopAddress] = useState('');
  const [ShopNear, setShopNear] = useState('');
  const [ShopType, setShopType] = useState('');
  const [PhoneNumber, setPhoneNumber] = useState('');
  const [Email, setEmail] = useState('');
  const [ShopTime, setShopTime] = useState('');
  const [ShopPhoto, setShopPhoto] = useState(null);

  const handleShopNameChange = (e) => {
    setShopName(e.target.value);
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handleShopAddressChange = (e) => {
    setShopAddress(e.target.value);
  };

  const handleShopNearChange = (e) => {
    setShopNear(e.target.value);
  };

  const handleShopTypeChange = (e) => {
    setShopType(e.target.value);
  };

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleShopTimeChange = (e) => {
    setShopTime(e.target.value);
  };

  const handleShopPhotoChange = (e) => {
    setShopPhoto(e.target.files[0]);
  };

  const handleUpload = async () => {
    // Basic validation
    if (!ShopName || !Location || !ShopType || !PhoneNumber || !Email || !ShopTime || !ShopPhoto || !ShopAddress || !ShopNear) {
      toast.error('Please fill in all fields.');
      return;
    }

    // Additional validation (e.g., email format)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(Email)) {
      toast.error('Please enter a valid email address.');
      return;
    }

    const formData = new FormData();
    formData.append('ShopName', ShopName);
    formData.append('Location', Location);
    formData.append('ShopAddress', ShopAddress);
    formData.append('ShopNear', ShopNear);
    formData.append('ShopType', ShopType);
    formData.append('PhoneNumber', PhoneNumber);
    formData.append('Email', Email);
    formData.append('ShopTime', ShopTime);
    formData.append('ShopPhoto', ShopPhoto);

    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/mechanic/createmechanic`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        toast.success('Shop is Registered');
        // Clear form after successful submission
        setShopName('');
        setLocation('');
        setShopAddress('');
        setShopNear('');
        setShopType('');
        setPhoneNumber('');
        setEmail('');
        setShopTime('');
        setShopPhoto(null);
      } else {
        toast.error('Failed to upload shop information.');
      }
    } catch (error) {
      console.error('Error uploading:', error);
      toast.error('An error occurred while uploading shop information.');
    }
  };

  return (
    <div className="ventor-form">
      <h1>Shop Register Form</h1>
      <div className="form-container4">
        <div className="column1">
          <label htmlFor="ShopName">Shop Name :</label>
          <input type="text" id="ShopName" value={ShopName} onChange={handleShopNameChange} required placeholder='Eg: Jeya Work Shop'/>

          <label htmlFor="Location">Shop Location Town :</label>
          <input type="text" id="Location" value={Location} onChange={handleLocationChange} required placeholder='Eg: Jaffna, Kopay, Atchchuvely' />

          <label htmlFor="ShopAddress">Shop Address :</label>
          <input type="text" id="ShopAddress" value={ShopAddress} onChange={handleShopAddressChange} required placeholder='Eg: Jaffna Town' />
          
          <label htmlFor="ShopNear">Nearby Shop :</label>
          <input type="text" id="ShopNear" value={ShopNear} onChange={handleShopNearChange} required placeholder='Eg: Near to Jaffna Bus Stand'/>

          <label htmlFor="ShopPhoto">Shop Photo :</label>
          <input type="file" id="ShopPhoto" onChange={handleShopPhotoChange} accept="image/*" required />
        </div>
        <div className="column1">
          <label htmlFor="ShopType">Shop Type :</label>
          <select id="ShopType" value={ShopType} onChange={handleShopTypeChange} required>
            <option value="">Select shop type</option>
            <option value="Bike Service">Bike Service</option>
            <option value="Bike & Car Service">Bike & Car Service</option>
            <option value="Others">Others</option>
          </select>
          
          <label htmlFor="PhoneNumber">Phone Number :</label>
          <input type="text" id="PhoneNumber" value={PhoneNumber} onChange={handlePhoneNumberChange} required placeholder='Eg: +9477*******' />

          <label htmlFor="Email">Email :</label>
          <input type="email" id="Email" value={Email} onChange={handleEmailChange} required placeholder='Eg: Jeya245@gmail.com' />

          <label htmlFor="ShopTime">Shop Time :</label>
          <input type="text" id="ShopTime" value={ShopTime} onChange={handleShopTimeChange} required placeholder='Eg: 08.00 AM- 05.00 PM' />
        </div>
      </div>
      <button type="button" onClick={handleUpload} className='upload'>
        Upload
      </button>
      <ToastContainer />
    </div>
  );
};

export default MechanicForm;
