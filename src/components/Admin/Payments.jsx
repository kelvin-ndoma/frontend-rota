import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Payments() {
  const [amount, setAmount] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [accessToken, setAccessToken] = useState('');

  useEffect(() => {
    fetchAccessToken();
  }, []);

  const fetchAccessToken = async () => {
    try {
      const response = await axios.get('https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials');
      setAccessToken(response.data.accessToken);
    } catch (error) {
      console.error('Error fetching access token:', error);
      // Handle error gracefully (e.g., display error message to user)
    }
  };

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data } = await axios.post(
        'https://72c4-165-90-6-63.ngrok-free.app/stkpush',
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
      setIsLoading(false);
      await checkTransactionStatus(data);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const checkTransactionStatus = async (responseData) => {
    const checkStatus = async () => {
      try {
        const { data: responseData } = await axios.post(
          'https://72c4-165-90-6-63.ngrok-free.app/stkquery',
          {
            CheckoutRequestID: responseData.CheckoutRequestID,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        if (responseData.status === 'Completed') {
          console.log('Mpesa Stk Push Success, transaction completed successfully');
        } else if (responseData.status === 'Failed') {
          console.error('Mpesa Stk Push Failed, Please try again');
        } else {
          // Schedule another check after 10 seconds
          setTimeout(checkStatus, 10000);
        }
      } catch (error) {
        console.log(error);
      }
    };
    
    setTimeout(checkStatus, 10000);
  };
  

  return (
    <div className="App bg-slate-700 h-screen text-white w-full">
      <header className="App-header">
        <p className="text-center pt-9">Please Enter your Details Below</p>
      </header>
      <div className="flex items-center justify-center">
        <form className="flex flex-col items-center" onSubmit={handleSubmit}>
          <input
            className="border-2 border-gray-500 rounded-md p-2 m-2 text-black"
            type="text"
            placeholder="2547XXXXXXXX"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
          />
          <input
            className="border-2 border-gray-500 rounded-md p-2 m-2 text-black"
            type="number"
            placeholder="Enter Amount"
            value={amount}
            onChange={handleAmountChange}
          />
          <button
            className={`border-2 border-gray-500 rounded-md p-2 m-2 bg-green-600 
            hover:bg-green-700 ${
              !phoneNumber || !amount ? "opacity-50 cursor-not-allowed" : ""
            }`}
            type="submit"
            disabled={!phoneNumber || !amount || isLoading}
          >
            Submit
          </button>
          {isLoading && (
            <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
              <p className="text-white absolute">Loading...</p>
              <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default Payments;
