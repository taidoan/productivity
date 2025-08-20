import React from 'react';
import type { ProductivityResult } from '@/types';
import { ProductivityComponent } from './components/Productivity';
import { ServiceSummaryComponent } from './components/ServiceSummary';
import { KeysComponent } from './components/Keys';
import { SalesComponent } from './components/SalesComponent';

const ProductivityResult = ({
  sales,
  salesTarget,
  lateTarget,
  prepTarget,
  foodLift,
  kitLates,
  floorLates,
  manualHolds,
  serviceSummary,
  productivity,
}: ProductivityResult) => {
  return (
    <div id='printable'>
      <div className='rounded-xl bg-grey-50 shadow-md p-6 dark:bg-grey-700 dark:shadow-md printSettings print:!bg-white print:p-0 print:rounded-none print:shadow-none'>
        {serviceSummary && (
          <div className='lg:w-10/12 mx-auto mb-6 print:mx-0 print:w-full print:text-left '>
            <h2 className='uppercase text-4xl font-bold mb-1'>
              {serviceSummary.siteName} Kitchen Report
            </h2>
            {productivity && <p>{productivity.range}</p>}
            <SalesComponent sales={sales} salesTarget={salesTarget} />
          </div>
        )}

        {serviceSummary && (
          <ServiceSummaryComponent
            serviceSummary={serviceSummary}
            floorLates={floorLates}
            kitLates={kitLates}
            prepTarget={prepTarget}
            foodLift={foodLift}
            lateTarget={lateTarget}
            manualHolds={manualHolds}
          />
        )}

        {productivity && (
          <ProductivityComponent
            productivity={productivity}
            prepTarget={prepTarget}
            lateTarget={lateTarget}
          />
        )}
      </div>
      <KeysComponent prepTarget={prepTarget} lateTarget={lateTarget} foodLift={foodLift} />
    </div>
  );
};

export default ProductivityResult;
