import '../css/input.css'
export function InputField({label, value, placeholder, onChange, type}) {
    return <div>
      <div>
        <p className='label'>{label}</p>
      </div>
      <input onChange={onChange}  type={type} value={value}   placeholder={placeholder} className="input" />
    </div>
}