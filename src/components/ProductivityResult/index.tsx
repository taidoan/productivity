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
      <div
        className='
    rounded-2xl 
    bg-white/25
    border border-white/20
    shadow-[0_5px_15px_rgba(0,0,0,0.2)]
    p-6 
    dark:bg-stone-600/30 
    print:bg-white 
    print:p-0 
    print:rounded-none 
    print:shadow-none 
    transition-all duration-300
  '
      >
        {serviceSummary && (
          <div className='lg:w-10/12 mx-auto mb-6 print:mx-0 print:w-full print:text-left '>
            <h2 className='uppercase text-4xl font-bold mb-1'>
              {serviceSummary.siteName} Food Delivery Times
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
