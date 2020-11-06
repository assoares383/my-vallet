import React, { useEffect, useMemo, useState } from 'react';
import { uuid } from 'uuidv4';

import ContentHeader from '../../components/ContentHeader';
import SelectInput from '../../components/SelectInput';
import HistoryFinanceCard from '../../components/HistoryFinanceCard';

import gains from '../../repositories/gains';
import expenses from '../../repositories/expenses';

import formatCurrency from '../../utils/formatCurrency';
import formatDate from '../../utils/formatDate';
import listOfMonths from '../../utils/months';

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
  const [monthSelected, setMonthSelected] = 
    useState<string>(String(new Date().getMonth() + 1));
  const [yearSelected, setYearSelected] = 
    useState<string>(String(new Date().getFullYear()));
  
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

  const months = useMemo(() => {
    return listOfMonths.map((month, index) => {
      return {
        value: index + 1,
        label: month
      }
    });
  }, []);

  const years = useMemo(() => {
    let uniqueYears: number[] = [];

    listData.forEach(item => {
      const date = new Date(item.date);
      const year = date.getFullYear();

      if(!uniqueYears.includes(year)) {
        uniqueYears.push(year);
      }
    });

    return uniqueYears.map(year => {
      return {
        value: year,
        label: year
      }
    });
  }, []);

  useEffect(() => {
    const filteredData = listData.filter(item => {
      const date = new Date(item.date);
      const month = String(date.getMonth() + 1);
      const year = String(date.getFullYear());

      return month === monthSelected && year === yearSelected;
    });

    const formattedData = filteredData.map(item => {
      return {
        id: uuid(),
        description: item.description,
        amountFormatted: formatCurrency(Number(item.amount)),
        frequancy: item.frequency,
        dataFormatted: formatDate(item.date),
        tagColor: item.frequency === 'recorrente' ? '#4E41F0' : '#E44C4E'
      }
      
    });

    setData(formattedData);
  }, [listData, monthSelected, yearSelected, data.length])

  return (
    <Container>
      <ContentHeader title={title} lineColor={lineColor}>
        <SelectInput 
          options={months} 
          defaultValue={monthSelected}
          onChange={(e) => 
            setMonthSelected(e.target.value)} 
        />
        <SelectInput 
          options={years} 
          defaultValue={yearSelected}
          onChange={(e) => 
            setYearSelected(e.target.value)} 
        />
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