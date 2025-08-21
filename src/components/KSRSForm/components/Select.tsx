import clsx from 'clsx';
import * as style from '../classes';
import { Label } from './Label';

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  id: string;
  label: string;
  containerClassName?: string;
};

export const Select = ({ id, label, containerClassName, ...props }: SelectProps) => {
  return (
    <div className={clsx(containerClassName)}>
      <Label id={id} label={label} required={props.required} />
      <select id={id} className={clsx(style.fieldClass, 'grow')} {...props} />
    </div>
  );
};
