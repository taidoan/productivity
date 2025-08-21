import { ServiceSummary } from '@/types';
import { convertToMinutesSeconds } from '@/utilities/timeConverter';

type createKeyProps = {
  summary: ServiceSummary;
  lines: string[];
};

export const createKey = ({ summary, lines }: createKeyProps) => {
  for (const line of lines) {
    const [key, ...values] = line.split('\t').map((v) => v.trim());

    switch (key) {
      case 'Average Delivery Time':
        const Delivery = summary.averageDeliveryTime;

        Delivery.starters = convertToMinutesSeconds(parseFloat(values[0]));
        Delivery.mains = convertToMinutesSeconds(parseFloat(values[1]));
        Delivery.desserts = convertToMinutesSeconds(parseFloat(values[2]));
        Delivery.total = convertToMinutesSeconds(parseFloat(values[3]));
        break;

      case 'Average Wait Time':
        const Wait = summary.averageWaitTime;

        Wait.starters = convertToMinutesSeconds(parseFloat(values[0]));
        Wait.mains = convertToMinutesSeconds(parseFloat(values[1]));
        Wait.desserts = convertToMinutesSeconds(parseFloat(values[2]));
        Wait.total = convertToMinutesSeconds(parseFloat(values[3]));
        break;

      case 'Average Preparation Time':
        const Prep = summary.averagePreparationTime;

        Prep.starters = convertToMinutesSeconds(parseFloat(values[0]));
        Prep.mains = convertToMinutesSeconds(parseFloat(values[1]));
        Prep.desserts = convertToMinutesSeconds(parseFloat(values[2]));
        Prep.total = convertToMinutesSeconds(parseFloat(values[3]));
        break;

      case 'No. of Orders':
        summary.numberOfOrders = parseInt(values[3], 10);
        break;

      case 'No. of Late Orders':
        const Orders = summary.numberOfOrders;

        const Starters = summary.numberOfLateOrders.starters;
        Starters.count = parseInt(values[0], 10);
        Starters.percentage = Math.round((Starters.count / Orders) * 100);

        const Mains = summary.numberOfLateOrders.mains;
        Mains.count = parseInt(values[1], 10);
        Mains.percentage = Math.round((Mains.count / Orders) * 100);

        const Desserts = summary.numberOfLateOrders.desserts;
        Desserts.count = parseInt(values[2], 10);
        Desserts.percentage = Math.round((Desserts.count / Orders) * 100);

        summary.numberOfLateOrders.total.count = parseInt(values[3], 10);
        summary.numberOfLateOrders.total.percentage = Math.round(
          (summary.numberOfLateOrders.total.count / Orders) * 100,
        );
        break;

      case 'No. of Items':
        summary.numberOfItems = parseInt(values[3], 10);
        break;

      case 'No. of Late Items':
        const Items = summary.numberOfItems;

        const StarterItems = summary.numberOfLateItems.starters;
        StarterItems.count = parseInt(values[0], 10);
        StarterItems.percentage = Math.round((StarterItems.count / Items) * 100);

        const MainsItems = summary.numberOfLateItems.mains;
        MainsItems.count = parseInt(values[1], 10);
        MainsItems.percentage = Math.round((MainsItems.count / Items) * 100);

        const DessertItems = summary.numberOfLateItems.desserts;
        DessertItems.count = parseInt(values[2], 10);
        DessertItems.percentage = Math.round((DessertItems.count / Items) * 100);

        summary.numberOfLateItems.total.count = parseInt(values[3], 10);
        summary.numberOfLateItems.total.percentage = Math.round(
          (summary.numberOfLateItems.total.count / Items) * 100,
        );

        break;

      case 'Table/Meal Checks On-Time':
        summary.checksOnTime.onTime = parseInt(values[0], 10);
        summary.checksOnTime.early = parseInt(values[1], 10);
        summary.checksOnTime.late = parseInt(values[2], 10);
        break;

      case 'CHEF1':
        const Chef = summary.chef1;

        Chef.averagePrepTime = convertToMinutesSeconds(parseFloat(values[0]));
        Chef.numberOfOrders = parseInt(values[1], 10);
        Chef.ordersLate.count = parseInt(values[2], 10);
        Chef.ordersLate.percentage = Math.round(
          (Chef.ordersLate.count / Chef.numberOfOrders) * 100,
        );

        Chef.numberOfItems = parseInt(values[3], 10);
        Chef.itemsLate.count = parseInt(values[4], 10);
        Chef.itemsLate.percentage = Math.round((Chef.itemsLate.count / Chef.numberOfItems) * 100);

        Chef.ordersBumped = parseInt(values[5], 10);
        Chef.manualHolds = parseInt(values[6], 10);
        break;

      case 'DISPENSE':
        const Dispense = summary.dispense;

        Dispense.averagePrepTime = convertToMinutesSeconds(parseFloat(values[0]));
        Dispense.numberOfOrders = parseInt(values[1], 10);
        Dispense.ordersLate.count = parseInt(values[2], 10);
        Dispense.ordersLate.percentage = Math.round(
          (Dispense.ordersLate.count / Dispense.numberOfOrders) * 100,
        );
        Dispense.numberOfItems = parseInt(values[3], 10);
        Dispense.itemsLate.count = parseInt(values[4], 10);
        Dispense.itemsLate.percentage = Math.round(
          (Dispense.itemsLate.count / Dispense.numberOfItems) * 100,
        );
        Dispense.ordersBumped = parseInt(values[5], 10);
        Dispense.manualHolds = parseInt(values[6], 10);
        break;

      default:
        break;
    }
  }
};
