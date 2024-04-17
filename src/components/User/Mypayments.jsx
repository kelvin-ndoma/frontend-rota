import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';



const Payments = ({ user, selectedEvent }) => {
  const [accessToken, setAccessToken] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('');

  const location = useLocation();
  const event = location.state ? location.state.event : null;

  useEffect(() => {
    fetchAccessToken();
  }, []);

  const fetchAccessToken = async () => {
    try {
      const response = await axios.post('http://localhost:3000/fetch_access_token');
      setAccessToken(response.data.access_token);
    } catch (error) {
      console.error('Error fetching access token:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const pushResponse = await axios.post(
        'https://14d1-165-90-6-63.ngrok-free.app/stkpush',
        {
          phoneNumber: phoneNumber,
          amount: amount,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
  
      const { CheckoutRequestID } = pushResponse.data[1];
  
      alert('Payment initiated. Please confirm on your mobile device.');
  
      await new Promise(resolve => setTimeout(resolve, 10000));
  
      const queryResponse = await axios.post(
        'https://14d1-165-90-6-63.ngrok-free.app/stkquery',
        {
          checkoutRequestID: CheckoutRequestID,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
  
      const { ResultCode } = queryResponse.data[1];
      if (ResultCode === '0') {
        setPaymentStatus('Payment successful!');
      } else {
        setPaymentStatus(queryResponse.data[1].ResultDesc || 'Payment failed. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting payment:', error);
      setPaymentStatus('An error occurred. Please try again later.');
    }
  };
  

  return (
    <div className="container mx-auto">
      <h2 className="text-3xl font-bold mb-4">Make Payment</h2>
      <h3 className="text-lg font-semibold mb-2">Event: {selectedEvent .name }</h3>
      <h4 className="text-md font-semibold mb-2">User: {user && `${user.first_name} `}</h4>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="flex flex-col mb-4">
          <label htmlFor="phoneNumber" className="mb-2">Phone Number</label>
          <input type="text" id="phoneNumber" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="amount" className="mb-2">Amount</label>
          <input type="number" id="amount" value={amount} onChange={(e) => setAmount(e.target.value)} required />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Pay Now</button>
      </form>
      {paymentStatus && <p>{paymentStatus}</p>}
      {/* <Confirmpay
      
      /> */}
    </div>
  );
};

export default Payments;