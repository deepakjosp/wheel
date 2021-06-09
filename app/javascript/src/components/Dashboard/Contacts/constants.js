import * as yup from "yup";

export const contacts = [
  {
    id: "5846499e-c369-11eb-8529-0242ac130003",
    name: "Neeraj Singh",
    email: "neeraj@bigbinary.com",
    department: "Engineering",
    contactNumber: "(555)-390-102",
    addToBaseCamp: true,
  },
  {
    id: "58464c3c-c369-11eb-8529-0242ac130003",
    name: "Vinay Chandran",
    email: "vinay@bigbinary.com",
    department: "Engineering",
    contactNumber: "99210011001",
    addToBaseCamp: false,
  },
  {
    id: "58464d2c-c369-11eb-8529-0242ac130003",
    name: "Karthik Menon",
    email: "karthik@bigbinary.com",
    department: "Engineering",
    contactNumber: "8283002301",
    addToBaseCamp: true,
  },
  {
    id: "58464df4-c369-11eb-8529-0242ac130003",
    name: "Deepak Jose",
    email: "deepak.jose@bigbinary.com",
    department: "Engineering",
    contactNumber: "9633249711",
    addToBaseCamp: true,
  },
];

export const phoneRegularExpression = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const newContactInitialValues = {
  name: "",
  email: "",
  contactNumber: "",
  department: "",
  addToBaseCamp: false,
};

export const newContactValidationScehema = yup.object({
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
});
