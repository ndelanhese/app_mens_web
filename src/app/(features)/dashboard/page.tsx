'use client';

import { CheckboxTree } from '@components/shared/checkboxTree';

import { generateRandomNumber } from '@utils/helpers';

const Dashboard = () => (
  <div className="space-y-8">
    <h1>hello world!!! - Dashboard</h1>
    <CheckboxTree
      title="Accept terms and conditions"
      id={generateRandomNumber(200, 1000)}
      treeChildren={['Teste 1', 'Teste 2', 'Teste 3']}
      treeChildrenIds={[1, 2, 3]}
    />
  </div>
);

export default Dashboard;
