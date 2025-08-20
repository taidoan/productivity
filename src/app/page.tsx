'use client';
import DarkModeToggle from '@/components/DarkModeToggle';
import KSRSForm from '@/components/KSRSForm';
import Footer from '@/layout/Footer';
import Header from '@/layout/Header';
import { Roboto_Flex } from 'next/font/google';
import { Oswald } from 'next/font/google';
import { ServiceSummary, ProductivityData } from '@/types';
import { useState } from 'react';
import ProductivityResult from '@/components/ProductivityResult';
import printArea from '@/utilities/printArea';

const roboto = Roboto_Flex({
  subsets: ['latin'],
  variable: '--font-roboto',
  display: 'swap',
});

const oswald = Oswald({
  subsets: ['latin'],
  variable: '--font-oswald',
  display: 'swap',
});

interface FormData {
  sales: number | null;
  salesTarget: number | null;
  lateTarget: number;
  prepTarget: number;
  foodLift: boolean;
  kitLates: boolean;
  floorLates: boolean;
  manualHolds: boolean;
  copiedServiceData: string;
  copiedProdData: string;
  parsedServiceSummary: ServiceSummary;
  parsedProductivityData: ProductivityData;
}

export default function Home() {
  const [formData, setFormData] = useState<FormData | null>(null);
  const [activeTab, setActiveTab] = useState<string>('dataEntry');
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);

  const handleFormSubmit = (data: FormData) => {
    setFormData(data);
    setFormSubmitted(true);
    setActiveTab('result');
  };

  // Button styling
  const baseClass = `text-grey-600 rounded-lg p-3 px-5 font-bold border ease-in-out duration-300`;
  const disabledClass = `bg-stone-400/20 border-white/0`;
  const enabledClass = `bg-white/30 border-white/40 shadow-md dark:border-white/20 dark:text-white`;
  const hoverClass = `hover:bg-gradient-to-b hover:from-slate-700 hover:to-slate-600 hover:text-white hover:border-white dark:hover:bg-gradient-to-b dark:hover:border-primary-600 dark:hover:from-primary-700 dark:hover:to-primary-600`;

  const buttonClass = (isDisabled: boolean) =>
    `${baseClass} ${isDisabled ? disabledClass : `${enabledClass} ${hoverClass}`}`;

  const buttonActiveClass = `
    ${baseClass}
    bg-gradient-to-t from-teal-400 to-teal-500 border-teal-500/10 text-teal-800 shadow
    dark:from-teal-700 dark:to-teal-900 dark:border-teal-700 dark:text-white
  `;

  return (
    <div
      className={`w-10/12 lg:w-11/12 xl:w-4/6 mx-auto print:w-full print:!bg-white print:mx-0 ${roboto.variable} ${oswald.variable}`}
    >
      <Header />
      <main
        className={`
    rounded-3xl 
    p-6
    bg-white/30 
    backdrop-blur-xl 
    border border-white/40
    shadow-2xl
    text-center 
    dark:bg-stone-900/50 
    dark:border-stone-100/20 
    print:bg-white
    transition-all duration-300
  `}
      >
        <div className='flex justify-center gap-x-4 mb-4 print:mb-0'>
          <button
            className={`${activeTab === 'dataEntry' ? buttonActiveClass : buttonClass(false)}`}
            onClick={() => setActiveTab('dataEntry')}
          >
            Data Entry
          </button>

          <button
            className={`${
              activeTab === 'result' ? buttonActiveClass : buttonClass(!formSubmitted)
            }`}
            onClick={() => {
              if (formSubmitted) {
                setActiveTab('result');
              }
            }}
            disabled={!formSubmitted}
          >
            Result
          </button>

          <button
            className={`${buttonClass(activeTab !== 'result')}`}
            disabled={activeTab !== 'result'}
            onClick={() => {
              if (activeTab === 'result') {
                printArea();
              }
            }}
          >
            Print
          </button>
        </div>

        {activeTab === 'dataEntry' ? (
          <KSRSForm
            onSubmit={handleFormSubmit}
            initialValues={
              formData
                ? {
                    sales: formData.sales,
                    salesTarget: formData.salesTarget,
                    lateTarget: formData.lateTarget,
                    prepTarget: formData.prepTarget,
                    foodLift: formData.foodLift,
                    kitLates: formData.kitLates,
                    floorLates: formData.floorLates,
                    manualHolds: formData.manualHolds,
                    copiedServiceData: formData.copiedServiceData,
                    copiedProdData: formData.copiedProdData,
                  }
                : {}
            }
          />
        ) : (
          <ProductivityResult
            sales={formData?.sales || null}
            salesTarget={formData?.salesTarget || null}
            lateTarget={formData?.lateTarget || 25}
            prepTarget={formData?.prepTarget || 8}
            foodLift={formData?.foodLift || false}
            kitLates={formData?.kitLates || false}
            manualHolds={formData?.manualHolds || false}
            floorLates={formData?.floorLates || false}
            serviceSummary={formData?.parsedServiceSummary || ({} as ServiceSummary)}
            productivity={formData?.parsedProductivityData || ({} as ProductivityData)}
          />
        )}
      </main>
      <DarkModeToggle />
      <Footer />
    </div>
  );
}
