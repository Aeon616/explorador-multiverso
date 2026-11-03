interface FormFieldProps {
  id: string
  label: string
  value: string
  error?: string
  multiline?: boolean
  type?: string
  placeholder?: string
  onChange: (value: string) => void
  onBlur: () => void
}

export default function FormField({
  id,
  label,
  value,
  error,
  multiline = false,
  type = 'text',
  placeholder,
  onChange,
  onBlur,
}: FormFieldProps) {
  const errorId = `${id}-error`
  const shared = {
    id,
    value,
    placeholder,
    onBlur,
    required: true,
    'aria-invalid': Boolean(error),
    'aria-describedby': error ? errorId : undefined,
    className: `w-full rounded-xl border-2 bg-white px-4 py-2.5 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-ink ${
      error ? 'border-danger' : 'border-ink'
    }`,
  }

  return (
    <div>
      <label htmlFor={id} className="mb-1 block font-bold">
        {label}
      </label>
      {multiline ? (
        <textarea {...shared} rows={5} onChange={(event) => onChange(event.target.value)} />
      ) : (
        <input {...shared} type={type} onChange={(event) => onChange(event.target.value)} />
      )}
      {error && (
        <p id={errorId} role="alert" className="mt-1 text-sm font-semibold text-danger">
          {error}
        </p>
      )}
    </div>
  )
}
