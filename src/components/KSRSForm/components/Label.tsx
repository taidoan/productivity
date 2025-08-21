import clsx from 'clsx';
import { labelClass, labelRequiredClass, labelRequirementClass } from '../classes';

type LabelProps = {
  id: string;
  label: string;
  required?: boolean;
};

export const Label = ({ id, label, required }: LabelProps) => {
  return (
    <label htmlFor={id} className={clsx(labelClass)}>
      {label}:{' '}
      {required ? (
        <span className={clsx(labelRequirementClass)}>
          (Required<span className={clsx(labelRequiredClass)}>*</span>)
        </span>
      ) : (
        <span className={clsx(labelRequirementClass)}>(Optional)</span>
      )}
    </label>
  );
};
