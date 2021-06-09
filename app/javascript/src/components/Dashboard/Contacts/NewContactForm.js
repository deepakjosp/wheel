import React from "react";
import { Formik, Form } from "formik";
import { Input, Switch } from "neetoui/formik";
import { Button } from "neetoui";

import {
  newContactInitialValues,
  newContactValidationScehema,
} from "./constants";

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
      initialValues={newContactInitialValues}
      onSubmit={handleSubmit}
      validationSchema={newContactValidationScehema}
    >
      {({ isSubmitting }) => (
        <Form className="space-y-6">
          <Input
            labelProps={{
              className: "font-medium mb-1",
            }}
            placeholder="Name"
            label="Name"
            name="name"
          />
          <Input
            labelProps={{
              className: "font-medium mb-1",
            }}
            label="Email"
            placeholder="Email"
            name="email"
          />
          <Input
            labelProps={{
              className: "font-medium mb-1",
            }}
            label="Contact Number"
            placeholder="Contact Number"
            name="contactNumber"
          />
          <Input
            labelProps={{
              className: "font-medium mb-1",
            }}
            label="Department"
            placeholder="Department"
            name="department"
          />
          <Switch
            labelProps={{
              className: "font-medium ml-0",
            }}
            label="Add to Basecamp"
            name="addToBaseCamp"
            className="flex-row-reverse justify-between"
          />
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
