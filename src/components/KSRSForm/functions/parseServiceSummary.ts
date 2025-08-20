import type { ServiceSummary } from '@/types';
import { createSummary } from './createSummary';
import { createKey } from './createKey';

export const parseServiceSummaryData = (data: string): ServiceSummary => {
  const lines = data
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line !== '');
  const firstLine = lines[0];
  const firstPeriodIndex = firstLine.indexOf('.');
  const siteName = firstLine.substring(0, firstPeriodIndex).trim();
  const cleanSiteName = siteName.replace(/\*\*(.*?)\*\*/, '$1').trim();
  const range = firstLine.substring(firstPeriodIndex + 1).trim();

  const site = cleanSiteName || firstLine.trim();
  lines.shift();

  const summary = createSummary(site, range);

  createKey({ summary, lines });

  return summary;
};
