import React from 'react';
import { hitTargetKey, overTargetKey, failedTargetKey } from './../classes';

type KeysProps = {
  prepTarget: number;
  lateTarget: number;
  foodLift: boolean;
};

export const KeysComponent = ({ prepTarget, lateTarget, foodLift }: KeysProps) => {
  const renderPerformanceKeys = (label: string, keys: JSX.Element[]) => (
    <div className='rounded-2xl grow content-center xl:content-start lg:text-left bg-white/25 border border-white/20 shadow-md p-4 px-5 dark:bg-stone-600/30   dark:shadow-md print:shadow-none! print:bg-white! print:p-0! print:content-start print:!mt-4'>
      <h2 className='uppercase text-2xl font-bold mb-1 xl:mb-2'>{label}</h2>
      <hr className='border-white/30 dark:border-white/15 hidden lg:block mb-2 xl:mb-3' />
      <ul>{keys}</ul>
    </div>
  );

  const prepKeys = renderPerformanceKeys('Prep Time', [
    <li key='prep-target-0'>
      {hitTargetKey} {prepTarget}m or under prep time.
    </li>,
    prepTarget === 9 ? (
      <li key='prep-failed-1'>
        {failedTargetKey} Over {prepTarget}m prep time.
      </li>
    ) : (
      <React.Fragment key='prep-key'>
        <li key='prep-under-2'>
          {overTargetKey} Under {prepTarget + 1}m prep time.
        </li>
        <li key='prep-failed-under-3'>
          {failedTargetKey} Over {prepTarget + 1}m prep time.
        </li>
      </React.Fragment>
    ),
  ]);

  const waitKeys = renderPerformanceKeys('Wait Time', [
    <li key='wait-target-0'>
      {hitTargetKey} {foodLift ? '1:30' : '1:00'}m or under wait time.
    </li>,
    <li key='wait-failed-1'>
      {failedTargetKey} Over {foodLift ? '1:30' : '1:00'}m wait time.
    </li>,
  ]);

  const deliveryKeys = renderPerformanceKeys('Delivery Time', [
    <li key='delivery-hit-0'>{hitTargetKey} Under 10m delivery.</li>,
    <li key='delivery-failed-1'>{failedTargetKey} Over 10m delivery.</li>,
  ]);

  const latesKeys = renderPerformanceKeys('Late Orders', [
    <li key='late-hit-0'>
      {hitTargetKey} {lateTarget}% or under late orders.
    </li>,
    <li key='late-over-1'>
      {overTargetKey} Over {lateTarget}% late orders.
    </li>,
    <li key='late-failed-2'>
      {failedTargetKey} Over {lateTarget + 10}% late orders.
    </li>,
  ]);

  return (
    <>
      <div className='lg:w-10/12 mx-auto my-8 mb-6 print:w-full print:text-left print:!mt-4'>
        <h2 className='uppercase text-4xl font-bold mb-1 print:hidden'>Understanding The Report</h2>
        <p>
          The floor team requires at least{' '}
          {foodLift ? (
            <>
              <strong>1:30</strong> minutes
            </>
          ) : (
            <>
              <strong>1:00</strong> minute
            </>
          )}{' '}
          to deliver food sent from kitchen.
        </p>
      </div>
      <div className='flex flex-wrap lg:grid lg:grid-cols-2 xl:grid-cols-4 gap-4 print:flex print:gap-1'>
        {prepKeys}
        {waitKeys}
        {deliveryKeys}
        {latesKeys}
      </div>
    </>
  );
};
