import React from "react";
import { useLocation, Link } from "react-router-dom";

const Confirmation = () => {
  const { state } = useLocation();
  const { selections = {}, total = 0, reference = "N/A" } = state || {};

  return (
    <div className="max-w-4xl mx-auto mt-10 p-8 bg-white shadow-lg rounded">
      <h2 className="text-3xl font-bold text-green-700 text-center mb-6">
        🎉 Payment Successful!
      </h2>
      <p className="text-center text-gray-700 mb-2">
        Thank you for your order with <strong>TechHaven</strong>.
      </p>
      <p className="text-center text-blue-800 font-medium mb-6">
        📦 Reference Number: <span className="font-bold">{reference}</span>
      </p>

      <h3 className="text-xl font-semibold mb-4 text-gray-800">🧾 Order Summary</h3>
      <div className="space-y-3">
        {Object.entries(selections).map(([part, choice], idx) => {
          if ((part === "storage" || part === "ram") && (!Array.isArray(choice) || choice.length === 0)) return null;
          if (!Array.isArray(choice) && !choice?.name) return null;

          return (
            <div key={idx} className="flex justify-between border-b pb-1">
              <span className="capitalize w-1/2 font-medium text-gray-700">{part}</span>
              <span className="text-right w-1/2 text-gray-700">
                {Array.isArray(choice) ? (
                  <>
                    {choice.map((item, i) => (
                      <div key={i}>
                        {item.name} - ${item.price}
                      </div>
                    ))}
                    {choice.length > 1 && (
                      <div className="font-semibold text-blue-700">
                        Total: ${choice.reduce((s, i) => s + i.price, 0)}
                      </div>
                    )}
                  </>
                ) : (
                  `${choice.name} - $${choice.price}`
                )}
              </span>
            </div>
          );
        })}
      </div>

      <hr className="my-6" />

      <div className="text-right font-bold text-xl text-blue-700">
        Grand Total: ${Number(total).toFixed(2)}
      </div>

      <div className="mt-8 text-center">
        <Link
          to="/"
          className="inline-block px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 font-medium shadow"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default Confirmation;
