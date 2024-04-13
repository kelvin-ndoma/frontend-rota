import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const Payments = () => {
  const location = useLocation();
  const { event, user } = location.state;
  const [accessToken, setAccessToken] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('');

  useEffect(() => {
    fetchAccessToken();
  }, []);

  const fetchAccessToken = async () => {
    try {
      const response = await axios.post('http://localhost:3000/fetch_access_token'); // Changed from axios.get to axios.post
      setAccessToken(response.data.access_token);
    } catch (error) {
      console.error('Error fetching access token:', error);
      // Handle error gracefully (e.g., display error message to user)
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const pushResponse = await axios.post(
        'https://f618-165-90-6-63.ngrok-free.app/stkpush',
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
  
      console.log('Push Response:', pushResponse.data); // Log the entire push response data
  
      const { CheckoutRequestID } = pushResponse.data[1]; // Access the CheckoutRequestID from the second element
  
      // Log the CheckoutRequestID before making the query request
      console.log('CheckoutID:', CheckoutRequestID);
  
      // Show the success message to the user
      alert('Payment initiated. Please confirm on your mobile device.');
  
      // Wait for user confirmation before making the query request
      await new Promise(resolve => setTimeout(resolve, 10000)); // Wait for 10 seconds
  
      // Make stkquery request to check payment status
      const queryResponse = await axios.post(
        'https://f618-165-90-6-63.ngrok-free.app/stkquery',
        {
          checkoutRequestID: CheckoutRequestID, // Use the CheckoutRequestID here
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
  
      console.log('Query Response:', queryResponse.data);
  
      const { ResultCode } = queryResponse.data[1];
      if (ResultCode === '0') {
        // Update the payment status to "Payment successful!"
        setPaymentStatus('Payment successful!');
      } else {
        // Update the payment status to the actual error message received from the server
        setPaymentStatus(queryResponse.data[1].ResultDesc || 'Payment failed. Please try again.');
      }
      
    } catch (error) {
      console.error('Error submitting payment:', error);
      // Update the payment status to indicate an error
      // Assuming setPaymentStatus is the function to update the payment status
      setPaymentStatus('An error occurred. Please try again later.');
    }
  };
  
  return (
    <div className="container mx-auto">
      <h2 className="text-3xl font-bold mb-4">Make Payment</h2>
      <h3 className="text-lg font-semibold mb-2">Event: {event && event.name}</h3>
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
    </div>
  );
};

export default Payments;
