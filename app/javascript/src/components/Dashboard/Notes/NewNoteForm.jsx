import React from "react";
import { Formik, Form } from "formik";
import { Input, Textarea, Select, Switch } from "neetoui/formik";
import { Button } from "neetoui";
import notesApi from "apis/notes";
import DateInput from "components/formik/DateInput";

import {
  createNoteInitialValues,
  createNoteValidation,
  issueTypes,
  contacts,
} from "./constants";

export default function NewNoteForm({ onClose, refetch }) {
  const handleSubmit = async values => {
    try {
      await notesApi.create(values);
      refetch();
      onClose();
    } catch (err) {
      logger.error(err);
    }
  };

  return (
    <Formik
      initialValues={createNoteInitialValues}
      onSubmit={handleSubmit}
      validationSchema={createNoteValidation}
    >
      {({ isSubmitting, values }) => (
        <Form className="space-y-6">
          <Input
            labelProps={{
              className: "font-medium mb-1",
            }}
            placeholder="Note Title"
            label="Note Title"
            name="title"
          />
          <Select
            labelProps={{
              className: "font-medium mb-1",
            }}
            label="Tags"
            options={issueTypes}
            name="tag"
          />
          <Textarea
            labelProps={{
              className: "font-medium mb-1",
            }}
            placeholder="Note Description"
            label="Note Description"
            name="description"
            rows={8}
          />
          <Select
            label="Assigned Contact"
            options={contacts}
            name="assignedContact"
          />
          <Switch
            labelProps={{
              className: "font-medium ml-0",
            }}
            name="doesNoteHaveDueDate"
            className="flex-row-reverse justify-between"
            label="Add Due Date to Note"
          />
          {values?.doesNoteHaveDueDate && <DateInput name="dueDate" />}
          <div className="nui-pane__footer nui-pane__footer--absolute space-x-4">
            <Button
              onClick={onClose}
              label="Cancel"
              size="large"
              style="secondary"
            />
            <Button
              type="submit"
              label="Submit"
              size="large"
              style="primary"
              disabled={isSubmitting}
              loading={isSubmitting}
            />
          </div>
        </Form>
      )}
    </Formik>
  );
}
