import { type UseFormRegister, type FieldError } from "react-hook-form";
import type { CreateVoyageInput } from "~/lib/validations/voyage";

interface FormFieldProps {
  id: keyof CreateVoyageInput;
  label: string;
  type: string;
  placeholder?: string;
  register: UseFormRegister<CreateVoyageInput>;
  error?: FieldError;
}

export function FormField({
  id,
  label,
  type,
  placeholder,
  register,
  error,
}: Readonly<FormFieldProps>) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium mb-1">
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        {...register(id)}
        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
      />
      {error && (
        <p className="text-sm text-destructive mt-1">{error.message}</p>
      )}
    </div>
  );
}
