import * as classes from './../classes';
import clsx from 'clsx';
import { getPrepTimeClass, getLatesClass } from './../classes';
import type { ProductivityData } from '@/types';

type ProductivityProps = {
  productivity: ProductivityData;
  prepTarget: number;
  lateTarget: number;
};

export const ProductivityComponent = ({
  productivity,
  prepTarget,
  lateTarget,
}: ProductivityProps) => {
  return (
    <table className={`${classes.productivityTable}`}>
      <thead className={clsx(classes.productivityHeader)}>
        <tr>
          {[
            'Name',
            'Prep Time',
            'Orders',
            'Items',
            'Late Orders',
            'Longest Order',
            'Hours Worked',
          ].map((header) => (
            <th key={header} className={clsx(classes.productivityHeaderCell)}>
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {productivity?.staffMembers.map((member) => {
          const prepTimeClass = getPrepTimeClass(member.prepTime, prepTarget);
          const latesClass = getLatesClass(member.lateOrdersPercentage, lateTarget);

          return (
            <tr key={member.name} className={clsx(classes.rowClass)}>
              <td className={clsx(classes.productivityItem, classes.productivityName)}>
                {member.name}
              </td>
              <td className={clsx(prepTimeClass, classes.productivityItem)} data-cell='Prep Time: '>
                {member.prepTime}
              </td>
              <td className={clsx(classes.productivityItem)} data-cell='Orders: '>
                {member.orders}
              </td>
              <td className={clsx(classes.productivityItem)} data-cell='Items: '>
                {member.items}
              </td>
              <td className={clsx(latesClass, classes.productivityItem)} data-cell='Late Orders: '>
                {member.lateOrders}{' '}
                <span className='text-sm'>({member.lateOrdersPercentage}%)</span>
              </td>
              <td className={clsx(classes.productivityItem)} data-cell='Longest Order: '>
                {member.longestOrder}
              </td>
              <td className={clsx(classes.productivityItem)} data-cell='Hours Worked: '>
                {member.hoursWorked}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
