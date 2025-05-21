
const FormInput = ({ 
  label, 
  name, 
  register, 
  rules = {}, 
  error, 
  type = 'text', 
  placeholder, 
  required = false,
  disabled = false,
  step = undefined
}) => {
  return (
    <div className="space-y-1">
      <label htmlFor={name} className="block font-semibold text-gray-700">
        {required && <span className="text-red-500 mr-1">*</span>}
        {label}
      </label>
      
      <input
        id={name}
        type={type}
        {...register(name, rules)}
        placeholder={placeholder}
        disabled={disabled}
        step={step}
        className={`w-full p-2 border ${error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-blue-500'} 
          rounded-md focus:outline-none transition duration-200
          ${disabled ? 'bg-gray-100 text-gray-500' : 'bg-white'}
        `}
      />
      
      {error && (
        <p className="text-sm text-red-500 mt-1">{error.message}</p>
      )}
    </div>
  );
};

export default FormInput;