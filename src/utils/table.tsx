import * as React from 'react'
import StyledTable from '../models/styled/StyledTable'
import StyledTh from '../models/styled/StyledTh'
import StyledTr from '../models/styled/StyledTr'
import { Covid19Data } from '../models/Covid19Data' // eslint-disable-line no-unused-vars
import StyledTd from '../models/styled/StyledTd'
import { formatAmount } from './formatting'

export const buildStyledTable = (cols: Array<string>, buildRows: () => any) =>
  <StyledTable>
    <thead>
      <StyledTr key={0}>
        {cols.map((col, index) => <StyledTh key={index}>{col}</StyledTh>)}
      </StyledTr>
    </thead>
    <tbody>
      {buildRows()}
    </tbody>
  </StyledTable>

export const buildStyledRow = (data: Covid19Data, index: number) => <StyledTr key={index + 1}>
  <StyledTd>{formatAmount(data.cases)}</StyledTd>
  <StyledTd>{formatAmount(data.deaths)}</StyledTd>
  <StyledTd>{formatAmount(data.recovered)}</StyledTd>
  <StyledTd>{data.date}</StyledTd>
</StyledTr>
