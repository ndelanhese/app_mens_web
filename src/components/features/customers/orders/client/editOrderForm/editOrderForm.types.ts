import { Order } from '../table/table.types';

export type OrderFormProps = {
  handleCloseModal: () => void;
  order: Order | undefined;
};
