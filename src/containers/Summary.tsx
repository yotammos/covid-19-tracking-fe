import * as React from 'react'
import { DetailedRequest, getData } from '../utils/restClient' // eslint-disable-line no-unused-vars
import { CountryData } from '../models/CountryData' // eslint-disable-line no-unused-vars
import StyledTd from '../models/styled/StyledTd'
import StyledTr from '../models/styled/StyledTr'
import StyledLink from '../models/styled/StyledLink'
import { formatAmount } from '../utils/formatting'
import { buildStyledTable } from '../utils/table'
import { DATA_COUNT, PATHS } from '../utils/constants'
import styled from 'styled-components'
import { useState, useEffect } from 'react'

interface Props {}

interface State {
    data?: CountryData[]
}

const availableCountries = [
  'US',
  'China',
  'Israel',
  'Iran',
  'Italy',
  'Germany',
  'Spain'
]

const buildPossibleLink = (name: string) => {
  return name in availableCountries
    ? <StyledLink to={`${PATHS.COUNTRY}/${name}`}>{name}</StyledLink>
    : <div>{name}</div>
}

const buildStyledRow = (data: CountryData, index: number) => <StyledTr key={index + 1}>
  <StyledTd>{buildPossibleLink(data.name)}</StyledTd>
  <StyledTd>{formatAmount(data.data.cases)}</StyledTd>
  <StyledTd>{formatAmount(data.data.deaths)}</StyledTd>
  <StyledTd>{formatAmount(data.data.recovered)}</StyledTd>
</StyledTr>

const StyledH1 = styled.h1`
    text-align: center;
`

const Summary: React.FC<Props> = (props: Props) => {
  const [data, setData] = useState([])

  useEffect(() => {
    getData({ path: '/counts/all' } as DetailedRequest)
      .then((value: CountryData[]) => {
        setData(value)
      })
  })

  const buildRows = () => data.map((row, index) => buildStyledRow(row, index))

  return <div>
    <StyledH1>Summary</StyledH1>
    {buildStyledTable(['Name', DATA_COUNT.CASES, DATA_COUNT.DEATHS, DATA_COUNT.RECOVERED], buildRows)}
  </div>
}

export default Summary
