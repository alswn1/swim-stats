import './Button.css'

interface ButtonProps {
  text: string,
  type: string,
  onClick: () => void,
}

const Button = ({ text, type, onClick }: ButtonProps) => {
  return (
    <button onClick={onClick} className={`black-han Button Button_${type}`}>{text}</button>
  )
}

export default Button