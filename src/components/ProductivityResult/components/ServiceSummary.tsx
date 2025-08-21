import * as classes from './../classes';
import clsx from 'clsx';
import {
  getPrepTimeClass,
  getWaitTimeClass,
  getDeliveryTimeClass,
  getLatesClass,
} from './../classes';
import type { ProductivityResult } from '@/types';

type ServiceSummaryComponentProps = {
  serviceSummary: ProductivityResult['serviceSummary'];
  floorLates: boolean;
  kitLates: boolean;
  prepTarget: number;
  foodLift: boolean;
  lateTarget: number;
  manualHolds: boolean;
};

export const ServiceSummaryComponent = ({
  serviceSummary,
  floorLates,
  kitLates,
  prepTarget,
  foodLift,
  lateTarget,
  manualHolds,
}: ServiceSummaryComponentProps) => {
  const servicePrepTimeClass = getPrepTimeClass(
    serviceSummary?.averagePreparationTime.total,
    prepTarget,
  );
  const serviceWaitTimeClass = getWaitTimeClass(serviceSummary?.averageWaitTime.total, foodLift);
  const serviceDeliveryTimeClass = getDeliveryTimeClass(serviceSummary?.averageDeliveryTime.total);
  const serviceLatesClass = getLatesClass(
    serviceSummary?.numberOfLateOrders.total.percentage,
    lateTarget,
  );

  return (
    <ul className={clsx(classes.serviceSummaryContainer)}>
      {[
        {
          label: 'Prep Time',
          value: serviceSummary.averagePreparationTime.total,
          className: servicePrepTimeClass,
        },
        {
          label: 'Wait Time',
          value: serviceSummary.averageWaitTime.total,
          className: serviceWaitTimeClass,
        },
        {
          label: 'Delivery Time',
          value: serviceSummary.averageDeliveryTime.total,
          className: serviceDeliveryTimeClass,
        },
        { label: 'Orders', value: serviceSummary.numberOfOrders, className: '' },
        {
          label: 'Lates',
          value: `${serviceSummary.numberOfLateOrders.total.count} (${serviceSummary.numberOfLateOrders.total.percentage}%)`,
          className: serviceLatesClass,
        },
        { label: 'Items', value: serviceSummary.numberOfItems, className: '' },
        manualHolds
          ? { label: 'Holds', value: serviceSummary.chef1.manualHolds, className: '' }
          : null,
        floorLates
          ? {
              label: 'Floor Lates',
              value:
                serviceSummary.numberOfLateOrders.total.count! -
                serviceSummary.chef1.ordersLate.count +
                ` (${
                  serviceSummary.numberOfLateOrders.total.percentage -
                  serviceSummary.chef1.ordersLate.percentage
                }%)`,
            }
          : null,
        kitLates
          ? {
              label: 'Kitchen Lates',
              value: `${serviceSummary.chef1.ordersLate.count} (${serviceSummary.chef1.ordersLate.percentage}%)`,
              className: serviceLatesClass,
            }
          : null,
      ]
        .filter(Boolean)
        .map((item, index) => (
          <li key={index} className={clsx(classes.serviceSummaryItem)}>
            <div className={clsx(classes.serviceSummaryItemLabel)}>{item?.label}</div>
            <div className={clsx(classes.serviceSummaryItemValue, item?.className)}>
              {item?.value}
            </div>
          </li>
        ))}
    </ul>
  );
};
