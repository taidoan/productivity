'use client';
import { useState, useEffect } from 'react';
import { ServiceSummary, ProductivityData } from '@/types';
import { parseServiceSummaryData } from './functions/parseServiceSummary';
import { parseProductivityData } from './functions/parseProductivity';
import { Checkbox } from './components/Checkbox';
import { TextArea } from './components/Textarea';

type KSRSFormProps = {
  onSubmit: (
    data: [
      number | null,
      number | null,
      number,
      number,
      boolean,
      boolean,
      boolean,
      ServiceSummary,
      ProductivityData,
      string,
      string,
    ],
  ) => void;
  initialValues: {
    sales: number | null;
    salesTarget: number | null;
    lateTarget: number;
    prepTarget: number;
    foodLift: boolean;
    kitLates: boolean;
    floorLates: boolean;
    copiedServiceData: string;
    copiedProdData: string;
  };
};

const KSRSForm = ({ onSubmit, initialValues }: KSRSFormProps) => {
  const [sales, setSales] = useState<number | null>(null);
  const [salesTarget, setSalesTarget] = useState<number | null>(null);
  const [lateTarget, setLateTarget] = useState<number>(25);
  const [prepTarget, setPrepTarget] = useState<number>(8);
  const [lift, setLift] = useState<boolean>(false);
  const [kitLates, setKitLates] = useState<boolean>(false);
  const [floorLates, setFloorLates] = useState<boolean>(false);
  const [serviceData, setServiceData] = useState<string>('');
  const [prodData, setProdData] = useState<string>('');
  const [copiedServiceData, setCopiedServiceData] = useState<string>('');
  const [copiedProdData, setCopiedProdData] = useState<string>('');

  useEffect(() => {
    if (initialValues) {
      setSales(initialValues.sales);
      setSalesTarget(initialValues.salesTarget);
      setLateTarget(initialValues.lateTarget);
      setPrepTarget(initialValues.prepTarget);
      setLift(initialValues.foodLift);
      setKitLates(initialValues.kitLates);
      setFloorLates(initialValues.floorLates);
      setServiceData(initialValues.copiedServiceData);
      setProdData(initialValues.copiedProdData);
      setCopiedServiceData(initialValues.copiedServiceData);
      setCopiedProdData(initialValues.copiedProdData);
    }
  }, [initialValues]);

  const handleSalesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSales(value ? Number(value) : null);
  };

  const handleSalesTargetChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSalesTarget(value ? Number(value) : null);
  };

  const handleLatesChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLateTarget(Number(event.target.value));
  };

  const handlePrepChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPrepTarget(Number(event.target.value));
  };

  const handleLiftChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLift(event.target.checked);
  };

  const handleKitLateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKitLates(event.target.checked);
  };

  const handleFloorLateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFloorLates(event.target.checked);
  };

  const handleServiceChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value;
    setCopiedServiceData(value);
    setServiceData(value);
  };

  const handleProdChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value;
    setCopiedProdData(value);
    setProdData(value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const parsedServiceSummary = parseServiceSummaryData(serviceData);
    const parsedProductivityData = parseProductivityData(prodData);
    onSubmit([
      sales,
      salesTarget,
      lateTarget,
      prepTarget,
      lift,
      kitLates,
      floorLates,
      parsedServiceSummary,
      parsedProductivityData,
      copiedServiceData,
      copiedProdData,
    ]);
  };

  const formFieldClass = `rounded-lg bg-grey-100 p-4 px-4 grow flex flex-col gap-2 gap-y-3 dark:bg-grey-700`;
  const labelClass = `font-bold leading-4 content-center text-left`;
  const fieldClass = `rounded-lg p-3 py-3 shadow-md text-grey-600 dark:bg-grey-900 dark:shadow-none dark:text-grey-200 placeholder:text-grey-300 dark:placeholder:text-grey-400 focus:outline-2 focus:outline-primary-600 focus:ring-inset focus:outline-none focus:shadow-none focus:outline-offset-0 `;

  return (
    <div className={``}>
      <p className='text-center mt-0 mb-4'>
        Please set your targets, select optional information and enter data{' '}
        <strong>copied directly</strong> KSRS into the boxes below.
      </p>
      <form onSubmit={handleSubmit} className={`flex flex-wrap gap-4 md:grid grid-cols-4`}>
        <div className={`${formFieldClass} col-span-2`}>
          <label htmlFor='salesTarget' className={`${labelClass}`}>
            Sales Forecast: <span className='text-sm font-normal text-grey-400'>(Optional)</span>
          </label>
          <input
            type='number'
            id='salesTarget'
            value={salesTarget !== null ? salesTarget : ''}
            onChange={handleSalesTargetChange}
            className={`${fieldClass}`}
          />
        </div>

        <div className={`${formFieldClass} col-span-2`}>
          <label htmlFor='actualSales' className={`${labelClass}`}>
            Actual Sales: <span className='text-sm font-normal text-grey-400'>(Optional)</span>
          </label>
          <input
            type='number'
            id='actualSales'
            value={sales !== null ? sales : ''}
            onChange={handleSalesChange}
            className={`${fieldClass}`}
          />
        </div>

        <div className={`flex flex-col gap-4 flex-wrap w-full md:flex-row md:col-span-4`}>
          <div className={`${formFieldClass} gap-x-3`}>
            <label htmlFor='latesTarget' className={`${labelClass}`}>
              Lates Target:{' '}
              <span className='text-sm font-normal text-grey-400'>
                (Required<span className='text-red-600'>*</span>)
              </span>
            </label>
            <select
              value={lateTarget}
              id='latesTarget'
              onChange={handleLatesChange}
              className={`${fieldClass} grow`}
            >
              <option value={10}>10%</option>
              <option value={15}>15%</option>
              <option value={20}>20%</option>
              <option value={25}>25%</option>
              <option value={30}>30%</option>
            </select>
          </div>

          <div className={`${formFieldClass}  gap-x-3`}>
            <label htmlFor='prepTarget' className={`${labelClass}`}>
              Prep Target:{' '}
              <span className='text-sm font-normal text-grey-400'>
                (Required<span className='text-red-600'>*</span>)
              </span>
            </label>
            <select
              value={prepTarget}
              id='prepTarget'
              onChange={handlePrepChange}
              className={`${fieldClass} grow`}
            >
              <option value={6}>6:00</option>
              <option value={7}>7:00</option>
              <option value={8}>8:00</option>
              <option value={9}>9:00</option>
            </select>
          </div>
        </div>

        <div className={`flex flex-col gap-4 flex-wrap w-full md:flex-row md:col-span-4 `}>
          <Checkbox
            id='kitchenLates'
            label='Kitchen Lates'
            checked={kitLates}
            onChange={handleKitLateChange}
            required={false}
            containerClassName={`${formFieldClass} !flex-row gap-x-3 md:justify-center`}
          />

          <Checkbox
            id='floorLates'
            label='Floor Lates'
            checked={floorLates}
            onChange={handleFloorLateChange}
            required={false}
            containerClassName={`${formFieldClass} !flex-row gap-x-3 md:justify-center`}
          />

          <Checkbox
            id='foodLift'
            label='Food Lift'
            checked={lift}
            onChange={handleLiftChange}
            required={false}
            containerClassName={`${formFieldClass} !flex-row gap-x-3 md:justify-center`}
          />
        </div>

        <TextArea
          id='serviceSummaryData'
          label='Service Summary Data'
          value={serviceData}
          onChange={handleServiceChange}
          rows={13}
          placeholder='Copy and paste the service summary report here'
          containerClassName={`${formFieldClass} col-span-4`}
          required
        />

        <TextArea
          id='prodData'
          label='Productivity Data'
          value={prodData}
          onChange={handleProdChange}
          rows={6}
          placeholder='Copy and paste productivity report here'
          containerClassName={`${formFieldClass} col-span-4`}
          required
        />

        <button
          type='submit'
          className='font-bold rounded-lg px-5 py-3 text-grey-500 bg-grey-100 hover:bg-slate-600 ease-in-out duration-300 hover:text-white mx-auto block full-width col-span-4 my-2 dark:bg-grey-500 dark:text-grey-900 dark:hover:bg-primary-600 dark:hover:text-white'
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default KSRSForm;
