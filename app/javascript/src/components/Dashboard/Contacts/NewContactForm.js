import React from "react";
import * as yup from "yup";
import { Formik, Form } from "formik";
import { Input, Switch } from "neetoui/formik";
import { Button } from "neetoui";
import { phoneRegularExpression } from "constants/contacts";

export default function NewContactForm({ onClose, refetch }) {
  const handleSubmit = async () => {
    try {
      refetch();
      onClose();
    } catch (err) {
      logger.error(err);
    }
  };
  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        contactNumber: "",
        department: "",
        addToBaseCamp: false,
      }}
      onSubmit={handleSubmit}
      validationSchema={yup.object({
        name: yup.string().required("Name is required"),
        email: yup
          .string()
          .email("Email should be valid email")
          .required("Email is required"),
        contactNumber: yup
          .string()
          .matches(phoneRegularExpression, "Contact number is not valid")
          .required("Contact number is required"),
        department: yup.string().required("Department is required"),
        addToBaseCamp: yup.boolean(),
      })}
    >
      {({ isSubmitting }) => (
        <Form>
          <Input label="Name" name="name" className="mb-6" />
          <Input label="Email" name="email" className="mb-6" />
          <Input label="Contact Number" name="contactNumber" className="mb-6" />
          <Input label="Department" name="department" className="mb-6" />
          <Switch
            label="Add to Basecamp"
            name="addTBaseCamp"
            className="mb-6"
          />
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
