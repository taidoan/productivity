type SalesComponentProps = {
  sales: number | null;
  salesTarget: number | null;
};

export const SalesComponent = ({ sales, salesTarget }: SalesComponentProps) => {
  if (!sales || salesTarget === null) return null;

  const salesDifference = Math.abs(salesTarget - sales);
  const percentageDifference = ((salesDifference / salesTarget) * 100).toFixed(2);
  const isBelowTarget = sales < salesTarget;
  const percentageClass = isBelowTarget ? 'text-red-500' : 'dark:text-lime-500 text-lime-700';

  return (
    <p>
      We&apos;ve taken <span className='font-bold'>£{sales}</span> in food sales this week. This was
      £{salesDifference}
      <span className={`text-sm ${percentageClass}`}>
        {isBelowTarget ? ` (-${percentageDifference}%)` : `(+${percentageDifference}%)`}
      </span>
      {isBelowTarget ? ' below' : ' above'} the target of <strong>£{salesTarget}</strong>.
    </p>
  );
};
