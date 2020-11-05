import React, { useEffect, useMemo, useState } from 'react';

import ContentHeader from '../../components/ContentHeader';
import SelectInput from '../../components/SelectInput';
import HistoryFinanceCard from '../../components/HistoryFinanceCard';

import gains from '../../repositories/gains';
import expenses from '../../repositories/expenses';
import formatCurrency from '../../utils/formatCurrency';
import formatDate from '../../utils/formatDate';


import { Container, Content, Filters } from './styles';
interface IRouteParams {
  match: {
    params: {
      type: string;
    }
  }
}

interface IData {
  id: string;
  description: string;
  amountFormatted: string;
  frequancy: string;
  dataFormatted: string;
  tagColor: string;
}

const List: React.FC<IRouteParams> = ({ match }) => {
  const [data, setData] = useState<IData[]>([]);
  
  const { type } = match.params;

  const title = useMemo(() => {
    return type === 'entry-balance' ? 'Entradas' : 'Saída'
  }, [type]);

  const lineColor = useMemo(() => {
    return type === 'entry-balance' ? '#F7931B' : '#E44C4E'
  }, [type]);

  const listData = useMemo(() => {
    return type === 'entry-balance' ? gains : expenses;
  }, [])

  const months = [
    {
      value: 11,
      label: 'Novembro'
    },
    {
      value: 12,
      label: 'Dezembro'
    },
    {
      value: 1,
      label: 'Janeiro'
    },
    {
      value: 2,
      label: 'Fevereiro'
    },
    {
      value: 3,
      label: 'Março'
    },
    {
      value: 4,
      label: 'Abril'
    },
    {
      value: 5,
      label: 'Maio'
    }
  ]

  const years = [
    {
      value: 2020,
      label: 2020
    },
    {
      value: 2019,
      label: 2019
    },
    {
      value: 2018,
      label: 2018
    },
  ]

  useEffect(() => {
    const response = listData.map(item => {
      return {
        id: String(Math.random() * data.length),
        description: item.description,
        amountFormatted: formatCurrency(Number(item.amount)),
        frequancy: item.frequency,
        dataFormatted: formatDate(item.date),
        tagColor: item.frequency === 'recorrente' ? '#4E41F0' : '#E44C4E'
      }
    })
    setData(response);
  }, [])

  return (
    <Container>
      <ContentHeader title={title} lineColor={lineColor}>
        <SelectInput options={months} />
        <SelectInput options={years} />
      </ContentHeader> 

      <Filters>
        <button 
          type="button" 
          className="tag-filter tag-filter-recurrent"
        >Recorrentes</button>

        <button 
          type="button" 
          className="tag-filter tag-filter-eventual"
        >Eventuais</button>
      </Filters>

      <Content>
        {
          data.map(item => (
            <HistoryFinanceCard 
              key={item.id}
              tagColor={item.tagColor}
              title={item.description}
              subtitle={item.dataFormatted}
              amount={item.amountFormatted}
            />
          ))
        }
      </Content> 
    </Container>
  );
}

export default List;