import s from './Button.module.css'

export default function Button({ onClick, children}) {
  return (
    <button type="click" onClick={onClick} className={s.btn}>
      {children}
    </button>
)
};
