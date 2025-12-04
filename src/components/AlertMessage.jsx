import React, { useEffect } from "react";
import { X } from "lucide-react";

const AlertMessage = ({ message, onClose }) => {
  useEffect(() => {
    if (!message) return;

    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [message]);

  if (!message) return null;

  return (
    <div
      className="
        fixed top-10 w-[90%] sm:w-[380px] bg-purple-500 text-white px-4 py-3 rounded-xl flex justify-between transition-all duration-300 z-10"
    >
      <span className="font-medium">{message}</span>

      <button onClick={onClose}>
        <X
          size={18}
          className="text-white hover:opacity-70 transition cursor-pointer"
        />
      </button>
    </div>
  );
};

export default AlertMessage;
