import clsx from 'clsx';
import * as style from '../classes';
import { Label } from './Label';

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  id: string;
  label: string;
  containerClassName?: string;
};

export const TextArea = ({ id, label, containerClassName, className, ...props }: TextareaProps) => {
  return (
    <div className={clsx(containerClassName)}>
      <Label id={id} label={label} required={props.required} />
      <textarea id={id} className={clsx(style.fieldClass, className)} {...props} />
    </div>
  );
};
