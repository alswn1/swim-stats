import './Button.css'

interface ButtonProps {
  text: string,
  font: string,
  type: string,
  loading?: boolean,
  onClick?: () => void,
}

const Button = ({ text, font, type, loading, onClick }: ButtonProps) => {
  return (
    <button onClick={onClick} disabled={loading} className={`${font} Button Button_${type}`}>{text}</button>
  )
}

export default Button