import React from 'react';

import MainHeader from '../MainHeader';
import Sidebar from '../Sidebar'
import Content from '../Content'

import { Grid } from './styles';

const Layout: React.FC = ({ children }) => {
  return (
    <Grid>
      <MainHeader />
      <Sidebar />
      <Content>
        { children }
      </Content>
    </Grid>
  );
}

export default Layout;