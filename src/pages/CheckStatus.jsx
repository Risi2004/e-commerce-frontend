import React, { useState } from "react";

const CheckStatus = () => {
  const [reference, setReference] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!reference.trim()) {
      alert("Please enter a reference number.");
      return;
    }
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-lg w-full">
        <h2 className="text-2xl font-bold text-center text-blue-800 mb-6">
          🔍 Check Order Status
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Enter your reference number"
            className="w-full p-3 border rounded"
            value={reference}
            onChange={(e) => setReference(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-3 rounded shadow"
          >
            Check Status
          </button>
        </form>

        {submitted && (
          <div className="mt-6 text-center text-blue-700 font-medium">
            You entered: <strong>{reference}</strong> <br />
            (In future: fetch order details from DB using this ref.)
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckStatus;
