import React from 'react';

import ContentHeader from '../../components/ContentHeader';
import SelectInput from '../../components/SelectInput';

import { Container } from './styles';

const Dashboard: React.FC = () => {
  const options = [
    {
      value: 'Janeiro',
      label: '2020'
    },
    {
      value: 'Fevereiro',
      label: '2020'
    },
    {
      value: 'Março',
      label: '2020'
    }
  ]

  return (
    <Container>
      <ContentHeader title="Dashboard" lineColor="#F7931B">
        <SelectInput options={options} />
      </ContentHeader>  
    </Container>
  );
}

export default Dashboard;