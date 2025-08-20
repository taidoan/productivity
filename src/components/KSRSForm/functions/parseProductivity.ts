import type { ProductivityData } from '@/types';
import { convertToMinutesSeconds, convertToHHMM } from '@/utilities/timeConverter';

export const parseProductivityData = (data: string): ProductivityData => {
  // Handle empty or undefined data
  if (!data || typeof data !== 'string') {
    throw new Error('Productivity data is required and must be a valid string');
  }

  const lines = data
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line !== '');

  // Check if we have any lines after filtering
  if (lines.length === 0) {
    throw new Error('Productivity data appears to be empty or contains no valid content');
  }

  const firstLine = lines[0];

  // Check if first line exists and is not empty
  if (!firstLine || firstLine.length === 0) {
    throw new Error('First line of productivity data is empty or invalid');
  }

  const firstPeriodIndex = firstLine.indexOf('.');

  // Handle case where there's no period in the first line
  let range = '';
  if (firstPeriodIndex !== -1) {
    range = firstLine.substring(firstPeriodIndex + 1).trim();
  } else {
    // If no period found, use a default or the entire first line
    range = firstLine.trim();
  }

  // Safely remove the first two lines if they exist
  if (lines.length > 0) lines.shift();
  if (lines.length > 0) lines.shift();

  const productivity: ProductivityData = {
    range: range,
    staffMembers: [],
  };

  for (const line of lines) {
    if (!line || line.trim() === '') {
      continue;
    }

    const parts = line.split('\t').map((v) => v.trim());

    // Ensure we have enough parts for processing
    if (parts.length < 8) {
      console.warn(`Skipping line with insufficient data: "${line}"`);
      continue;
    }

    const [station, name, avgTime, noOrders, noItems, ordersLate, longestOrder, hoursWorked] =
      parts;

    // Validate essential fields
    if (!station || !name) {
      console.warn(`Skipping line missing station or name: "${line}"`);
      continue;
    }

    try {
      // Safely parse numeric values with defaults
      const lateOrdersCount = parseInt(ordersLate, 10) || 0;
      const totalOrders = parseInt(noOrders, 10) || 0;
      const itemCount = parseInt(noItems, 10) || 0;

      let prepTime = '0:00';
      let longestOrderTime = '0:00';
      let hoursWorkedTime = '0:00';

      try {
        prepTime = convertToMinutesSeconds(avgTime) || '0:00';
      } catch (error) {
        console.warn(`Failed to convert prep time "${avgTime}" for ${name}:`, error);
      }

      try {
        longestOrderTime = convertToMinutesSeconds(longestOrder) || '0:00';
      } catch (error) {
        console.warn(`Failed to convert longest order time "${longestOrder}" for ${name}:`, error);
      }

      try {
        hoursWorkedTime = convertToHHMM(hoursWorked) || '0:00';
      } catch (error) {
        console.warn(`Failed to convert hours worked "${hoursWorked}" for ${name}:`, error);
      }

      const lateOrdersPercentage =
        totalOrders > 0 ? Math.round((lateOrdersCount / totalOrders) * 100) : 0;

      productivity.staffMembers.push({
        name,
        prepTime,
        orders: totalOrders,
        items: itemCount,
        lateOrders: lateOrdersCount,
        lateOrdersPercentage,
        longestOrder: longestOrderTime,
        hoursWorked: hoursWorkedTime,
      });
    } catch (error) {
      console.warn(`Error processing line "${line}":`, error);
      continue;
    }
  }

  // Warn if no staff members were successfully parsed
  if (productivity.staffMembers.length === 0) {
    console.warn('No staff members were successfully parsed from the productivity data');
  }

  return productivity;
};
