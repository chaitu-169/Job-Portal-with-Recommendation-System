import React from "react";

const ResumeModal = ({ imageUrl, onClose }) => {
  const isImage = imageUrl && (imageUrl.endsWith(".png") || imageUrl.endsWith(".jpeg") || imageUrl.endsWith(".jpg") || imageUrl.endsWith(".webp"));
  const isPdf = imageUrl && imageUrl.endsWith(".pdf");

  return (
    <div className="resume-modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>

        {isImage ? (
          <img src={imageUrl} alt="resume" />
        ) : isPdf ? (
          <embed src={imageUrl} width="100%" height="500px" type="application/pdf" />
        ) : (
          <p>Unsupported file format.</p>
        )}
      </div>
    </div>
  );
};

export default ResumeModal;
