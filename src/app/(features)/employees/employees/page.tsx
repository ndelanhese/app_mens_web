import { api } from '@axios';
import { EmployeesTable } from '@features-components/employees/employees/client/table/table';
import { Metadata } from 'next';
import { cookies } from 'next/headers';
import { cache } from 'react';

import { Employees } from './page.types';

const iterateResponse = (employees?: Employees) => {
  if (!employees) return [];
  return employees?.data?.map(employee => ({
    id: employee?.id,
    name: employee?.name,
    cpf: employee?.cpf,
    rg: employee?.rg,
    birthDate: employee?.birth_date,
    phone: employee?.phone,
    pisPasep: employee?.pis_pasep,
    admissionDate: employee?.admission_date,
    resignationDate: employee?.resignation_date,
    status: employee?.status,
    addresses: employee?.addresses?.map(address => ({
      id: address.id,
      address: address.address,
      number: address.number,
      district: address.district,
      postalCode: address.postal_code,
      city: address.city,
      state: address.state,
    })),
  }));
};

export const revalidate = 3600;

const getEmployees = cache(async () => {
  try {
    const cookiesStore = cookies();
    const token = cookiesStore.get('token')?.value;
    const { data } = await api.get<Employees>('/employees', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error: Error | any) {
    console.log(error?.response?.data?.message);
  }
});

export const metadata: Metadata = {
  title: 'Funcionários',
};

const Employees = async () => {
  const employees = await getEmployees();
  const rows = iterateResponse(employees);
  return <EmployeesTable rows={rows} />;
};

export default Employees;
