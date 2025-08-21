import clsx from 'clsx';
import * as style from '../classes';
import { Label } from './Label';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  label: string;
  containerClassName?: string;
};

export const Input = ({ id, label, containerClassName, ...props }: InputProps) => {
  return (
    <div className={clsx(containerClassName)}>
      <Label id={id} label={label} required={props.required} />
      <input id={id} className={style.fieldClass} {...props} />
    </div>
  );
};
