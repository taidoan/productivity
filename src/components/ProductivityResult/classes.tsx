import { convertTimeToMinutes } from '@/utilities/timeConverter';

export const darkHeaderBg = 'dark:bg-grey-950 print:bg-black print:dark:bg-black';
export const darkCellBg = 'dark:bg-grey-900 print:dark:bg-white';
export const border = `border-2 border-slate-800 border-collapse dark:border-grey-950 print:border-black print:dark:border-black`;
export const dataClass = 'p-2 px-3';

export const darkHeaderClasses = darkHeaderBg;

export const headerClasses = `bg-slate-800 text-white font-bold p-2 px-3 print:bg-black ${darkHeaderClasses}`;
export const prodHeaderClasses = `${border} !border-4 p-2 px-3`;

export const darkItemClass = `${darkCellBg} dark:text-gray-100`;
export const itemClass = `grow bg-white ${darkItemClass} ${border} print:dark:bg-white print:!text-black`;

export const prodItemClass = `${border} bg-white print:bg-white print:!text-black `;

export const darkNameClass = `dark:!bg-grey-950 dark:text-white dark:md:!bg-grey-900 dark:md:!text-gray-300 print:dark:!bg-white print:dark:!text-black`;
export const nameClass = `bg-slate-900 text-white font-bold md:!bg-white md:!text-inherit md:font-normal ${darkNameClass} print:bg-white print:!text-black`;

export const darkTableCellClass = `${darkCellBg} dark:text-gray-100 print:dark:bg-white print!:text-black`;
export const tableCellClass = `block before:content-[attr(data-cell)] before:font-bold md:table-cell md:before:content-[''] ${darkTableCellClass} ${border} md:border-4 print:table-cell print:before:content-none`;

export const rowClass = `block mt-3 print:table-row md:table-row md:mt-0 ${border}`;

export const hitTargetColour =
  '!bg-lime-500 dark:!bg-lime-800 print:dark:!bg-lime-500 print:!bg-lime-500';
export const overTargetColour =
  '!bg-amber-400 dark:!bg-amber-600 print:dark:!bg-amber-400 print:!bg-amber-400';
export const failedTargetColour =
  '!bg-red-500 dark:!bg-red-600 print:dark:!bg-red-500 print:!bg-red-500';

export const hitTargetKey = (
  <span className={`${hitTargetColour} inline-block w-3 h-3 mr-2`}></span>
);
export const overTargetKey = (
  <span className={`${overTargetColour} inline-block w-3 h-3 mr-2`}></span>
);
export const failedTargetKey = (
  <span className={`${failedTargetColour} inline-block w-3 h-3 mr-2`}></span>
);

export const getPrepTimeClass = (prepTime: string | undefined, prepTarget: number) => {
  const prepTimeValue = convertTimeToMinutes(prepTime || '0:00');

  if (prepTarget === 9) {
    if (prepTimeValue <= prepTarget) return hitTargetColour;
    return failedTargetColour;
  }

  if (prepTimeValue <= prepTarget) return hitTargetColour;
  if (prepTimeValue < prepTarget + 1) return overTargetColour;
  return failedTargetColour;
};

export const getWaitTimeClass = (waitTime: string | undefined, foodLift: boolean) => {
  const waitTimeMinutes = convertTimeToMinutes(waitTime || '0');
  return waitTimeMinutes <= (foodLift ? 1.5 : 1) ? hitTargetColour : failedTargetColour;
};

export const getDeliveryTimeClass = (deliveryTime: string | undefined) => {
  const deliveryTimeInMinutes = convertTimeToMinutes(deliveryTime || '0');
  return deliveryTimeInMinutes >= 10 ? failedTargetColour : hitTargetColour;
};

export const getLatesClass = (latePercentage: number, lateTarget: number) => {
  if (latePercentage < lateTarget) return hitTargetColour;
  if (latePercentage <= lateTarget + 10) return overTargetColour;
  return failedTargetColour;
};
