import * as Yup from 'yup';

export const userValidationSchema = Yup.object({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string().email("Invalid email address").required("Email is required"),
  password: Yup.string().required("Password is required"),
  birthday: Yup.date().required("Birthday is required"),
  isMale: Yup.boolean(),
  avatar: Yup.mixed()
    .test("fileSize", "The file is too large", value => value && value.size <= 1024 * 1024) // Limite de 1MB
    .test("fileType", "Unsupported file format", value => value && ['image/jpg', 'image/jpeg', 'image/png'].includes(value.type)), // Tipos permitidos
});
