import React from "react";
import { Field } from "formik";
import { DateInput } from "@bigbinary/neetoui";

export default function FormikDateInput({ name, ...rest }) {
  return (
    <Field name={name} component>
      {({ field, meta }) => {
        /**
         * added this hack inside the compoonent to update the form
         * value as this will keep the form code more clean
         */
        const onChange = value => {
          field.onChange({ target: { value, name } });
        };
        return (
          <DateInput
            {...field}
            onChange={onChange}
            error={meta.touched && meta.error}
            {...rest}
          />
        );
      }}
    </Field>
  );
}
