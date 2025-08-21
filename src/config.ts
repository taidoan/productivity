// Initial data for the form, feel free to edit these values if needed.

// Late Target as a percentage
const late_percentage_target = 25;

// Preparation Target in minutes
const preparation_target = 8;

// Does the kitchen use a food lift? Default to false
const food_lift = false;

// Show kitchen lates (CHEF lates from KSRS)
const show_kitchen_lates = true;

// Show floor lates (Total Lates - CHEF Lates from KSRS)
const show_floor_lates = false;

// Show manual holds
const show_manual_holds = true;

// Actual sales data. Default to null
const sales = null;

// Sales forecast. Default to null
const sales_forecast = null;

// Late Target Options
// These are pretty sensible options for late targets.
export const LATE_TARGET_OPTIONS = [
  { value: 5, label: '5%' },
  { value: 10, label: '10%' },
  { value: 15, label: '15%' },
  { value: 20, label: '20%' },
  { value: 25, label: '25%' },
  { value: 30, label: '30%' },
];

// Prep Target Options
// These are pretty sensible options for prep targets. Maximum would be nine as company target overall is less than 10:00.
export const PREP_TARGET_OPTIONS = [
  { value: 6, label: '6:00' },
  { value: 7, label: '7:00' },
  { value: 8, label: '8:00' },
  { value: 9, label: '9:00' },
];

// DO NOT EDIT THIS
export const DEFAULT_FORM_OPTIONS = {
  sales: sales,
  salesTarget: sales_forecast,
  lateTarget: late_percentage_target,
  prepTarget: preparation_target,
  foodLift: food_lift,
  kitLates: show_kitchen_lates,
  manualHolds: show_manual_holds,
  floorLates: show_floor_lates,
  copiedServiceData: '',
  copiedProdData: '',
};
