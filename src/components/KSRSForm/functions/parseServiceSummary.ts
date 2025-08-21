import type { ServiceSummary } from '@/types';
import { createSummary } from './createSummary';
import { createKey } from './createKey';

export const parseServiceSummaryData = (data: string): ServiceSummary => {
  // Handle empty or undefined data
  if (!data || typeof data !== 'string') {
    throw new Error('Service summary data is required and must be a valid string');
  }

  const lines = data
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line !== '');

  // Check if we have any lines after filtering
  if (lines.length === 0) {
    throw new Error('Service summary data appears to be empty or contains no valid content');
  }

  const firstLine = lines[0];

  // Check if first line exists and is not empty
  if (!firstLine || firstLine.length === 0) {
    throw new Error('First line of service summary data is empty or invalid');
  }

  const firstPeriodIndex = firstLine.indexOf('.');

  // Handle case where there's no period in the first line
  let siteName = '';
  let range = '';

  if (firstPeriodIndex !== -1) {
    siteName = firstLine.substring(0, firstPeriodIndex).trim();
    range = firstLine.substring(firstPeriodIndex + 1).trim();
  } else {
    // If no period found, use the entire first line as site name
    siteName = firstLine.trim();
    range = '';
  }

  const cleanSiteName = siteName.replace(/\*\*(.*?)\*\*/, '$1').trim();
  const site = cleanSiteName || firstLine.trim();

  lines.shift();

  const summary = createSummary(site, range);

  createKey({ summary, lines });

  return summary;
};
