import React from "react";

const Modal: React.FC<{ onClose: () => void; children: React.ReactNode }> = ({
  onClose,
  children,
}) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white rounded shadow-lg max-w-lg w-full">
      {children}
    </div>
  </div>
);

export default Modal;
