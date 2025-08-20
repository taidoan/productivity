import clsx from 'clsx';
import * as style from '../classes';
import { Label } from './Label';

type CheckboxProps = React.InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  label: string;
  containerClassName?: string;
};

export const Checkbox = ({ id, label, containerClassName, className, ...props }: CheckboxProps) => {
  return (
    <div className={clsx(containerClassName)}>
      <Label id={id} label={label} required={props.required} />
      <input id={id} type='checkbox' className={clsx(style.checkBoxClass, className)} {...props} />
    </div>
  );
};
