import React from 'react';

const Confirmpay = ({ user, selectedEvent, amount, phoneNumber, checkoutRequestID }) => {
  return (
    <div className="container mx-auto">
      <h2 className="text-3xl font-bold mb-4">Confirm Payment</h2>
      <table className="table-auto">
        <tbody>
          <tr>
            <td className="font-semibold">Event:</td>
            <td>{selectedEvent.name}</td>
          </tr>
          <tr>
            <td className="font-semibold">User:</td>
            <td>{user.first_name}</td>
          </tr>
          <tr>
            <td className="font-semibold">Amount:</td>
            <td>{amount}</td>
          </tr>
          <tr>
            <td className="font-semibold">Phone Number:</td>
            <td>{phoneNumber}</td>
          </tr>
          <tr>
            <td className="font-semibold">Checkout Request ID:</td>
            <td>{checkoutRequestId}</td>
          </tr>
        </tbody>
      </table>
      {/* Add a confirmation button */}
    </div>
  );
};

export default Confirmpay;
