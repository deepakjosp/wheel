import React from "react";
import * as yup from "yup";
import { Formik, Form } from "formik";
import { Input, Textarea, Select, Switch } from "neetoui/formik";
import { Button } from "neetoui";
import { issueTypes, contacts } from "constants/notes";
import notesApi from "apis/notes";
import DateInput from "components/formik/DateInput";

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
      initialValues={{
        title: "",
        tag: "internal",
        description: "",
        assignedContact: contacts[0].value,
        dueDate: new Date(),
        doesNoteHaveDueDate: false,
      }}
      onSubmit={handleSubmit}
      validationSchema={yup.object({
        title: yup.string().required("Title is required"),
        tag: yup.string().required("Tag is required"),
        description: yup.string().required("Description is required"),
        assignedContact: yup.string().required("Assignee is a required field"),
        doesNoteHaveDueDate: yup.boolean(),
        dueDate: yup.string().when("doesNoteHaveDueDate", {
          is: true,
          then: yup.string().required("Due date is required"),
        }),
      })}
    >
      {({ isSubmitting, values }) => (
        <Form>
          <Input label="Title" name="title" className="mb-6" />
          <Select options={issueTypes} name="tag" className="mb-6" />
          <Textarea
            label="Description"
            name="description"
            rows={8}
            className="mb-6"
          />
          <Select options={contacts} name="assignedContact" className="mb-6" />
          <Switch
            name="doesNoteHaveDueDate"
            label="Add Due Date to Note"
            className="mb-6"
          />
          {values?.doesNoteHaveDueDate && <DateInput name="dueDate" />}
          <div className="nui-pane__footer nui-pane__footer--absolute">
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
              className="ml-2"
              disabled={isSubmitting}
              loading={isSubmitting}
            />
          </div>
        </Form>
      )}
    </Formik>
  );
}
