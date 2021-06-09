import React from "react";
import { Alert } from "neetoui";

export default function DeleteAlert({ handleDelete, onClose, isOpen }) {
  return (
    <Alert
      icon="ri-alarm-warning-line text-red-500"
      isOpen={isOpen}
      title="Delete Note"
      message="Are you sure you want to delete the note? All of your data will be permanently removed from our database forever. This action cannot be undone."
      onClose={onClose}
      cancelButtonProps={{
        onClick: onClose,
      }}
      submitButtonProps={{
        onClick: handleDelete,
      }}
      hideConfirmation={true}
    />
  );
}
