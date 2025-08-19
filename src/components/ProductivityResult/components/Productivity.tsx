import * as classes from "./../classes";
import { getPrepTimeClass, getLatesClass } from "./../classes";
import type { ProductivityData } from "@/types";

type ProductivityProps = {
  productivity: ProductivityData;
  prepTarget: number;
  lateTarget: number;
};

export const ProductivityComponent = ({
  productivity,
  prepTarget,
  lateTarget,
}: ProductivityProps) => {
  return (
    <table className="text-left md:bg-white w-full md:text-center mt-6 md:table border-collapse print:text-center print:table">
      <thead
        className={`bg-slate-800 text-white font-bold hidden md:table-header-group print:table-header-group ${classes.darkHeaderBg}`}
      >
        <tr>
          {[
            "Name",
            "Prep Time",
            "Orders",
            "Items",
            "Late Orders",
            "Longest Order",
            "Hours Worked",
          ].map((header) => (
            <th key={header} className={`${classes.prodHeaderClasses} `}>
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {productivity?.staffMembers.map((member) => {
          const prepTimeClass = getPrepTimeClass(member.prepTime, prepTarget);
          const latesClass = getLatesClass(
            member.lateOrdersPercentage,
            lateTarget
          );

          return (
            <tr key={member.name} className={`${classes.rowClass}`}>
              <td
                className={`${classes.dataClass} ${classes.tableCellClass}  ${classes.nameClass}`}
              >
                {member.name}
              </td>
              <td
                className={`${prepTimeClass} ${classes.prodItemClass} ${classes.dataClass} ${classes.tableCellClass}`}
                data-cell="Prep Time: "
              >
                {member.prepTime}
              </td>
              <td
                className={`${classes.prodItemClass} ${classes.dataClass} ${classes.tableCellClass}`}
                data-cell="Orders: "
              >
                {member.orders}
              </td>
              <td
                className={`${classes.prodItemClass} ${classes.dataClass} ${classes.tableCellClass}`}
                data-cell="Items: "
              >
                {member.items}
              </td>
              <td
                className={`${latesClass} ${classes.prodItemClass} ${classes.dataClass} ${classes.tableCellClass}`}
                data-cell="Late Orders: "
              >
                {member.lateOrders}{" "}
                <span className="text-sm">
                  ({member.lateOrdersPercentage}%)
                </span>
              </td>
              <td
                className={`${classes.prodItemClass} ${classes.dataClass} ${classes.tableCellClass}`}
                data-cell="Longest Order: "
              >
                {member.longestOrder}
              </td>
              <td
                className={`${classes.prodItemClass} ${classes.dataClass} ${classes.tableCellClass}`}
                data-cell="Hours Worked: "
              >
                {member.hoursWorked}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
