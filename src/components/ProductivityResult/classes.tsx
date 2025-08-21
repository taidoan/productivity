import { convertTimeToMinutes } from '@/utilities/timeConverter';

// Print class
export const printClass = 'print:bg-white print:text-black print:text-center';

const padding = 'p-2 px-3 print:p-2! print:px-3!';
export const border =
  'border-4 border-slate-800 border-collapse dark:border-grey-950 print:border-black print:border-black print:border-collapse dark:border-stone-900';
const insideBorder = `border-t-4 border-slate-800 md:border-l-4 print:border-black dark:border-stone-900`;

// Header background
const headerPrint = `print:bg-black! print:text-white`;
const header = `bg-slate-800! font-bold text-white ${padding} ${headerPrint} dark:!bg-stone-900 dark:!text-white`;

// Cell
const cellBg = 'bg-white/80';
const cell = `${cellBg} dark:text-black print:table-cell print:before:content-non  dark:!bg-stone-800/80 dark:!text-white print:!bg-white print:!text-black`;

// Service summary container
export const serviceSummaryContainer = `text-center flex flex-wrap border-l-4 border-slate-800 print:mt-4! dark:border-stone-900`;

// Service Summary Item
export const serviceSummaryItem = `grow ${cell} ${printClass} ${border} border-l-0`;
export const serviceSummaryItemLabel = `${header}`;
export const serviceSummaryItemValue = `${padding}`;

// Productivity table
export const productivityTable = `overflow-hidden text-left w-full md:text-center mt-6 md:table border-collapse ${printClass} print:border-collapse print:mt-4!`;
export const productivityHeader = `hidden md:table-header-group ${header}  print:table-header-group ${border}`;
export const productivityHeaderCell = `${header}`;
export const productivityItem = `${cell} block before:content-[attr(data-cell)] before:font-bold md:table-cell md:before:content-[''] ${padding} ${insideBorder} print:before:content-none`;
export const productivityName = `${header} md:text-black md:font-normal md:bg-white/80! print:text-black! print:bg-white! dark:md:!bg-stone-800/20`;

export const rowClass = `block mt-3 print:table-row md:table-row md:mt-0 [&:first-child]:mt-0 ${border}`;

export const hitTargetColour = 'bg-lime-500! dark:bg-lime-900! print:bg-lime-500!';
export const overTargetColour = 'bg-amber-400! dark:bg-amber-700! print:bg-amber-400!';
export const failedTargetColour = 'bg-red-500! dark:bg-red-700! print:bg-red-500!';

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
