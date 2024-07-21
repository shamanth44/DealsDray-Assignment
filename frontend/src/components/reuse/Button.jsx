

export function Button({label, onClick, disabled}) {
    return <button onClick={onClick} disabled={disabled} type="submit" className="button">{label}</button>
}
  