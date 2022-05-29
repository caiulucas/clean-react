import { useForm } from '@presentation/hooks/useForm';

type Props = {
  title: string;
};

export function SubmitButton({ title }: Props) {
  const { isFormInvalid } = useForm();

  return (
    <button type="submit" disabled={isFormInvalid}>
      {title}
    </button>
  );
}
