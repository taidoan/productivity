import { ServiceSummary } from '@/types';

export const createSummary = (site: string, range: string): ServiceSummary => ({
  siteName: site,
  dateRange: range,
  averageDeliveryTime: {
    starters: '0',
    mains: '0',
    desserts: '0',
    total: '0',
  },
  averageWaitTime: {
    starters: '0',
    mains: '0',
    desserts: '0',
    total: '0',
  },
  averagePreparationTime: {
    starters: '0',
    mains: '0',
    desserts: '0',
    total: '0',
  },
  numberOfOrders: 0,
  numberOfLateOrders: {
    starters: { count: 0, percentage: 0 },
    mains: { count: 0, percentage: 0 },
    desserts: { count: 0, percentage: 0 },
    total: { count: 0, percentage: 0 },
  },
  numberOfItems: 0,
  numberOfLateItems: {
    starters: { count: 0, percentage: 0 },
    mains: { count: 0, percentage: 0 },
    desserts: { count: 0, percentage: 0 },
    total: { count: 0, percentage: 0 },
  },
  checksOnTime: {
    onTime: 0,
    early: 0,
    late: 0,
  },
  chef1: {
    averagePrepTime: '0',
    numberOfOrders: 0,
    ordersLate: { count: 0, percentage: 0 },
    numberOfItems: 0,
    itemsLate: { count: 0, percentage: 0 },
    ordersBumped: 0,
    manualHolds: 0,
  },
  dispense: {
    averagePrepTime: '0',
    numberOfOrders: 0,
    ordersLate: { count: 0, percentage: 0 },
    numberOfItems: 0,
    itemsLate: { count: 0, percentage: 0 },
    ordersBumped: 0,
    manualHolds: 0,
  },
});
