import * as yup from "yup";

export const issueTypeBadgeColors = {
  internal: "blue",
  agile: "green",
  bug: "red",
};

export const issueTypes = [
  {
    value: "internal",
    label: "Internal",
  },
  {
    value: "agileWorkFlow",
    label: "Agile Work Flow",
  },
  {
    value: "bug",
    label: "Bug",
  },
];

export const contacts = [
  {
    value: "vinay",
    label: "Vinay",
  },
  {
    value: "karthik",
    label: "Karthik Menon",
  },
  {
    value: "kabir",
    label: "Kabir Nazir",
  },
];

export const createNoteInitialValues = {
  title: "",
  tag: "internal",
  description: "",
  assignedContact: contacts[0].value,
  dueDate: new Date(),
  doesNoteHaveDueDate: false,
};

export const createNoteValidation = yup.object({
  title: yup.string().required("Title is required"),
  tag: yup.string().required("Tag is required"),
  description: yup.string().required("Description is required"),
  assignedContact: yup.string().required("Assignee is a required field"),
  doesNoteHaveDueDate: yup.boolean(),
  dueDate: yup.string().when("doesNoteHaveDueDate", {
    is: true,
    then: yup.string().required("Due date is required"),
  }),
});
