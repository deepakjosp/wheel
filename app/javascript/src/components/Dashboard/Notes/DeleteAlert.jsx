import React, { useState } from "react";
import { Alert } from "neetoui";
import notesApi from "apis/notes";

export default function DeleteAlert({ refetch, onClose, selectedNoteIds }) {
  const [deleting, setDeleting] = useState(false);
  const handleDelete = async () => {
    try {
      setDeleting(true);
      await notesApi.destroy({ ids: selectedNoteIds });
      onClose();
      refetch();
    } catch (error) {
      logger.error(error);
    } finally {
      setDeleting(false);
    }
  };
  return (
    <Alert
      icon="ri-alarm-warning-line text-red-500"
      isOpen
      title={
        selectedNoteIds.length === 1
          ? "Delete Note"
          : `Delete ${selectedNoteIds.length} notes?`
      }
      message={
        selectedNoteIds.length === 1
          ? "Are you sure you want to delete the note? All of your data will be permanently removed from our database forever. This action cannot be undone."
          : "Are you sure you want to continue? This cannot be undone."
      }
      onClose={onClose}
      cancelButtonProps={onClose}
      submitButtonProps={{
        onClick: handleDelete,
        loading: deleting,
      }}
      hideConfirmation={true}
    />
  );
}
