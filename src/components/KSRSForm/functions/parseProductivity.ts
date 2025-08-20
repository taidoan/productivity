import type { ProductivityData } from '@/types';
import { convertToMinutesSeconds, convertToHHMM } from '@/utilities/timeConverter';

export const parseProductivityData = (data: string): ProductivityData => {
  const lines = data
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line !== '');

  const firstLine = lines[0];
  const firstPeriodIndex = firstLine.indexOf('.');
  const range = firstLine.substring(firstPeriodIndex + 1).trim();

  lines.shift();
  lines.shift();

  const productivity: ProductivityData = {
    range: range,
    staffMembers: [],
  };

  for (const line of lines) {
    const [station, name, avgTime, noOrders, noItems, ordersLate, longestOrder, hoursWorked] = line
      .split('\t')
      .map((v) => v.trim());

    if (station && name) {
      const lateOrdersCount = parseInt(ordersLate, 10);
      const totalOrders = parseInt(noOrders, 10);

      productivity.staffMembers.push({
        name,
        prepTime: convertToMinutesSeconds(avgTime),
        orders: totalOrders,
        items: parseInt(noItems, 10),
        lateOrders: lateOrdersCount,
        lateOrdersPercentage:
          totalOrders > 0 ? Math.round((lateOrdersCount / totalOrders) * 100) : 0,
        longestOrder: convertToMinutesSeconds(longestOrder),
        hoursWorked: convertToHHMM(hoursWorked),
      });
    }
  }

  return productivity;
};
