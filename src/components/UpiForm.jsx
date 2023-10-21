import React, { useState, useEffect } from "react";
import QRious from "qrious";

const QRCode = ({ value }) => {
  useEffect(() => {
    const qr = new QRious({
      element: document.getElementById("qrcode"),
      value,
      size: 300,
    });
  }, [value]);

  return <canvas id="qrcode" className="w-full"></canvas>;
};

const UPIForm = () => {
  const [formData, setFormData] = useState({
    upiid: "",
    amount: 0,
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const generateUPI = () => {
    const { upiid, amount, description } = formData;
    return `upi://pay?pa=${upiid}&am=${amount}&tn=${encodeURIComponent(
      description,
    )}&cu=INR`;
  };

  const handleDownload = () => {
    const canvas = document.getElementById("qrcode");
    const imageLink = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");

    const link = document.createElement("a");
    link.href = imageLink;
    link.download = "qrcode.png";
    link.click();
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center p-6 lg:flex-row">
      <div className="mb-4 w-full max-w-md rounded-lg bg-white p-6 shadow-lg lg:m-0">
        <h2 className="mb-4 text-center text-2xl font-bold text-indigo-800">
          Generate UPI QR Code
        </h2>

        <div className="mb-4">
          <label className="mb-2 block font-semibold text-gray-700">
            UPI ID
          </label>
          <input
            type="text"
            name="upiid"
            value={formData.upiid}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 p-2 focus:border-indigo-500 focus:outline-none"
          />
        </div>

        <div className="mb-4">
          <label className="mb-2 block font-semibold text-gray-700">
            Amount:
          </label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 p-2 focus:border-indigo-500 focus:outline-none"
          />
        </div>

        <div className="mb-4">
          <label className="mb-2 block font-semibold text-gray-700">
            Message
          </label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 p-2 focus:border-indigo-500 focus:outline-none"
          />
        </div>

        <button
          onClick={handleDownload}
          className="mb-4 w-full rounded bg-indigo-700 px-4 py-2 font-semibold text-white hover:bg-indigo-800 focus:outline-none"
        >
          Download QR Code
        </button>
      </div>

      <div className="relative rounded-lg border border-gray-300 bg-white p-4 shadow-lg lg:ml-8">
        <QRCode value={generateUPI()} />
      </div>
    </div>
  );
};

export default UPIForm;
