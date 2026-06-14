import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import styled from 'styled-components';
import { Card, CardTitle, CardSubtitle } from './ui/Card';
import { registrationSchema, type RegistrationFormData } from '../schemas/registration';

// ─── Styled components ────────────────────────────────────────────────────────
// Every visual piece is a named component — no inline styles anywhere.

const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  margin-bottom: 1.6rem;
`;

const Label = styled.label`
  font-size: 1.4rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`;

// $error is a "transient prop" (the $ prefix).
// Styled-components uses it for styling but does NOT forward it to the DOM,
// which prevents React warnings about unknown HTML attributes.
const Input = styled.input<{ $error?: boolean }>`
  width: 100%;
  padding: 1rem 1.4rem;
  border-radius: ${({ theme }) => theme.radii.sm};
  border: 1.5px solid ${({ theme, $error }) =>
    $error ? theme.colors.danger : theme.colors.border};
  font-family: inherit;
  font-size: 1.6rem;
  color: ${({ theme }) => theme.colors.text};
  outline: none;
  transition: border-color 0.15s, box-shadow 0.15s;

  &:focus {
    border-color: ${({ theme, $error }) =>
      $error ? theme.colors.danger : theme.colors.primary};
    /* Append '29' (hex for ~16% opacity) to the theme colour — no hardcoded values */
    box-shadow: 0 0 0 3px ${({ theme, $error }) =>
      $error ? `${theme.colors.danger}29` : `${theme.colors.primary}29`};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.muted};
    font-weight: 400;
  }
`;

const Select = styled.select<{ $error?: boolean }>`
  width: 100%;
  padding: 1rem 1.4rem;
  border-radius: ${({ theme }) => theme.radii.sm};
  border: 1.5px solid ${({ theme, $error }) =>
    $error ? theme.colors.danger : theme.colors.border};
  font-family: inherit;
  font-size: 1.6rem;
  color: ${({ theme }) => theme.colors.text};
  background: white;
  outline: none;
  cursor: pointer;
  transition: border-color 0.15s, box-shadow 0.15s;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    /* Same '29' hex-opacity pattern used on Input focus */
    box-shadow: 0 0 0 3px ${({ theme }) => `${theme.colors.primary}29`};
  }
`;

const ErrorMsg = styled.span`
  font-size: 1.4rem;
  color: ${({ theme }) => theme.colors.danger};
`;

// Two-column layout that stacks to one column on small screens
const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.6rem;

  @media (max-width: 540px) {
    grid-template-columns: 1fr;
  }
`;

const CheckRow = styled.label`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  font-size: 1.4rem;
  cursor: pointer;
  margin-bottom: 1.6rem;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 1.6rem;
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  border: none;
  border-radius: ${({ theme }) => theme.radii.sm};
  font-family: inherit;
  font-size: 1.6rem;
  font-weight: 700;
  cursor: pointer;
  letter-spacing: 0.02em;
  transition: background 0.15s;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryHover};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const SuccessBanner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${({ theme }) => theme.colors.success};
  color: #fff;
  border-radius: ${({ theme }) => theme.radii.sm};
  padding: 1.6rem;
  margin-bottom: 1.6rem;
  font-weight: 600;
`;

// A proper styled component instead of an inline style object
const ResetLink = styled.button`
  background: none;
  border: none;
  color: #fff;
  cursor: pointer;
  font-size: 1.4rem;
  text-decoration: underline;
`;

// ─── Component ────────────────────────────────────────────────────────────────
export function RegistrationForm() {
  const {
    register,     // connects an <input> to React Hook Form (no useState needed)
    handleSubmit, // validates the form then calls your submit function
    reset,        // clears all fields back to defaultValues
    formState: {
      errors,             // object with validation error messages per field
      isSubmitting,       // true while your async onSubmit is running
      isSubmitSuccessful, // true once onSubmit resolves without throwing
    },
  } = useForm<RegistrationFormData>({
    resolver: yupResolver(registrationSchema), // connect Yup schema to RHF
    defaultValues: {
      name: '',
      email: '',
      age: undefined,   // number fields start as undefined (not 0)
      role: undefined,  // must be undefined, not '' — the type is a string literal union
      password: '',
      confirmPassword: '',
      agree: false,
    },
  });

  // Called only when ALL Yup rules pass — RHF handles the rest
  const onSubmit = async (data: RegistrationFormData) => {
    await new Promise((resolve) => setTimeout(resolve, 800)); // simulate API call
    console.log('Form submitted:', data);
  };

  return (
    <Card>
      <CardTitle>Candidate Registration</CardTitle>
      <CardSubtitle>
        React Hook Form + Yup — the stack listed in your job description.
        Try submitting empty to see all validation errors fire at once without a page reload.
      </CardSubtitle>

      {isSubmitSuccessful && (
        <SuccessBanner>
          <span>Registered! Check the console for the payload.</span>
          <ResetLink type="button" onClick={() => reset()}>
            Reset form
          </ResetLink>
        </SuccessBanner>
      )}

      {/* noValidate disables the browser's built-in validation so Yup is always used */}
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Row>
          <FieldGroup>
            <Label htmlFor="name">Full name</Label>
            <Input
              id="name"
              placeholder="Jane Doe"
              $error={!!errors.name}
              {...register('name')}
            />
            {errors.name && <ErrorMsg>{errors.name.message}</ErrorMsg>}
          </FieldGroup>

          <FieldGroup>
            <Label htmlFor="age">Age</Label>
            <Input
              id="age"
              type="number"
              placeholder="25"
              $error={!!errors.age}
              {...register('age')}
            />
            {errors.age && <ErrorMsg>{errors.age.message}</ErrorMsg>}
          </FieldGroup>
        </Row>

        <FieldGroup>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="jane@example.com"
            $error={!!errors.email}
            {...register('email')}
          />
          {errors.email && <ErrorMsg>{errors.email.message}</ErrorMsg>}
        </FieldGroup>

        <FieldGroup>
          <Label htmlFor="role">Role</Label>
          <Select id="role" $error={!!errors.role} {...register('role')}>
            <option value="">— select a role —</option>
            <option value="developer">Developer</option>
            <option value="designer">Designer</option>
            <option value="manager">Manager</option>
          </Select>
          {errors.role && <ErrorMsg>{errors.role.message}</ErrorMsg>}
        </FieldGroup>

        <Row>
          <FieldGroup>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Min 8 chars, 1 uppercase, 1 number"
              $error={!!errors.password}
              {...register('password')}
            />
            {errors.password && <ErrorMsg>{errors.password.message}</ErrorMsg>}
          </FieldGroup>

          <FieldGroup>
            <Label htmlFor="confirmPassword">Confirm password</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Repeat password"
              $error={!!errors.confirmPassword}
              {...register('confirmPassword')}
            />
            {errors.confirmPassword && (
              <ErrorMsg>{errors.confirmPassword.message}</ErrorMsg>
            )}
          </FieldGroup>
        </Row>

        {/* Wrapping label already links to the checkbox — no htmlFor needed.
            Adding htmlFor on top would fire the toggle twice on click. */}
        <CheckRow>
          <input id="agree" type="checkbox" {...register('agree')} />
          I agree to the Terms & Conditions
          {errors.agree && <ErrorMsg>{errors.agree.message}</ErrorMsg>}
        </CheckRow>

        <SubmitButton type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting…' : 'Create account'}
        </SubmitButton>
      </form>
    </Card>
  );
}
