'use client';
import type { FormData, KSRSFormProps } from '@/types';
import * as config from '@/config';
import * as style from './classes';
import clsx from 'clsx';
import { useState } from 'react';
import { parseServiceSummaryData } from './functions/parseServiceSummary';
import { parseProductivityData } from './functions/parseProductivity';
import { Checkbox } from './components/Checkbox';
import { TextArea } from './components/Textarea';
import { Input } from './components/Input';
import { Select } from './components/Select';
import { fieldContainerClass } from './classes';

const KSRSForm = ({ onSubmit, initialValues = {} }: KSRSFormProps) => {
  const [formData, setFormData] = useState<FormData>({
    ...config.DEFAULT_FORM_OPTIONS,
    ...initialValues,
  });

  const [error, setError] = useState<string>('');

  const updateField = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setError('');
  };

  const checkboxFields = [
    { id: 'kitLates', label: 'Kitchen Lates', field: 'kitLates' },
    { id: 'floorLates', label: 'Floor Lates', field: 'floorLates' },
    { id: 'foodLift', label: 'Food Lift', field: 'foodLift' },
    { id: 'holds', label: 'Manual Holds', field: 'manualHolds' },
  ] as const;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    if (!formData.copiedServiceData.trim()) {
      setError('Please enter Service Summary Data');
      return;
    }

    if (!formData.copiedProdData.trim()) {
      setError('Please enter Productivity Data');
      return;
    }

    try {
      const parsedServiceSummary = parseServiceSummaryData(formData.copiedServiceData);
      const parsedProductivityData = parseProductivityData(formData.copiedProdData);

      onSubmit({
        ...formData,
        parsedServiceSummary,
        parsedProductivityData,
      });
    } catch (error) {
      setError(`Error parsing data: ${error instanceof Error ? error.message : String(error)}`);
      console.error('Parsing error:', error);
    }
  };

  return (
    <div className={``}>
      <p className='text-center mt-0 mb-4'>
        Set your sales and performance targets, select any optional information to display, and
        enter the data <strong>copied directly</strong> from KSRS into the fields below.
      </p>
      <form onSubmit={handleSubmit} className={`flex flex-wrap gap-4 md:grid grid-cols-4`}>
        <Input
          id='salesTarget'
          label='Sales Forecast'
          value={formData.salesTarget || ''}
          onChange={(e) => updateField('salesTarget', Number(e.target.value) || null)}
          type='number'
          containerClassName={clsx(fieldContainerClass, 'col-span-2')}
        />

        <Input
          id='actualSales'
          label='Actual Sales'
          value={formData.sales || ''}
          onChange={(e) => updateField('sales', Number(e.target.value) || null)}
          type='number'
          containerClassName={clsx(fieldContainerClass, 'col-span-2')}
        />

        <div className={`flex flex-col gap-4 flex-wrap w-full md:flex-row md:col-span-4`}>
          <Select
            id='latesTarget'
            label='Lates Target'
            onChange={(e) => updateField('lateTarget', Number(e.target.value))}
            value={formData.lateTarget}
            containerClassName={clsx(fieldContainerClass, 'gap-x-3')}
            required
          >
            {config.LATE_TARGET_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>

          <Select
            id='prepTarget'
            label='Prep Target'
            onChange={(e) => updateField('prepTarget', Number(e.target.value))}
            value={formData.prepTarget}
            containerClassName={clsx(fieldContainerClass, 'gap-x-3')}
            required
          >
            {config.PREP_TARGET_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </div>

        <div className={`flex flex-col gap-4 flex-wrap w-full md:flex-row md:col-span-4 `}>
          {checkboxFields.map(({ id, label, field }) => (
            <Checkbox
              key={id}
              id={id}
              label={label}
              checked={formData[field]}
              onChange={(e) => updateField(field, e.target.checked)}
              containerClassName={clsx(fieldContainerClass, '!flex-row gap-x-3 md:justify-center')}
            />
          ))}
        </div>

        <TextArea
          id='serviceSummaryData'
          label='Service Summary Data'
          value={formData.copiedServiceData}
          onChange={(e) => updateField('copiedServiceData', e.target.value)}
          rows={13}
          placeholder='Copy and paste the service summary report here'
          containerClassName={clsx(fieldContainerClass, 'col-span-4')}
          required
        />

        <TextArea
          id='prodData'
          label='Productivity Data'
          value={formData.copiedProdData}
          onChange={(e) => updateField('copiedProdData', e.target.value)}
          rows={6}
          placeholder='Copy and paste productivity report here'
          containerClassName={clsx(fieldContainerClass, 'col-span-4')}
          required
        />

        {error && (
          <div className='bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded'>
            {error}
          </div>
        )}

        <button
          type='submit'
          className={clsx(
            style.baseButton,
            style.enabledButton,
            style.hoverButton,
            'mx-auto',
            'col-span-4',
          )}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default KSRSForm;
