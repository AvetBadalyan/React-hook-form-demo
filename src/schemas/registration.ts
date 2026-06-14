// Keeping the schema in its own file means the component file only
// contains UI logic — a standard separation-of-concerns pattern.
import * as yup from 'yup';

export const registrationSchema = yup.object({
  name: yup
    .string()
    .min(2, 'Name must be at least 2 characters')
    .required('Name is required'),

  email: yup
    .string()
    .email('Must be a valid email')
    .required('Email is required'),

  age: yup
    .number()
    .typeError('Age must be a number')
    .min(18, 'You must be at least 18')
    .max(65, 'Maximum age is 65')
    .required('Age is required'),

  role: yup
    .string()
    .oneOf(['developer', 'designer', 'manager'], 'Pick a valid role')
    .required('Role is required'),

  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/[A-Z]/, 'Must contain at least one uppercase letter')
    .matches(/[0-9]/, 'Must contain at least one number')
    .required('Password is required'),

  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Please confirm your password'),

  agree: yup
    .boolean()
    .oneOf([true], 'You must accept the terms')
    .required(),
});

// yup.InferType reads the schema and builds the TypeScript type for us.
// This is the correct pattern: the schema is the single source of truth for
// both runtime validation AND the compile-time TypeScript type.
// Using it here ensures that yupResolver and useForm share the exact same type,
// which is required for TypeScript to accept the resolver without errors.
export type RegistrationFormData = yup.InferType<typeof registrationSchema>;
