// components/Modal.js

import React from "react";

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-lg font-bold">{title}</h3>
        {children}
        <button className="btn btn-sm btn-error mt-4" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
