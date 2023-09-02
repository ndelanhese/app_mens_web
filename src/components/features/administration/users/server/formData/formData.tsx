import { UserData } from './formData.types';

export const FormData = ({ user }: UserData) => {
  return <div>{user.employee.name}</div>;
};
