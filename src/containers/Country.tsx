import * as React from 'react'
import { useState, useEffect } from 'react'
import { CountryTimeData } from '../models/CountryTimeData' // eslint-disable-line no-unused-vars
import { DetailedRequest, getData } from '../utils/restClient' // eslint-disable-line no-unused-vars
import StyledTd from '../models/styled/StyledTd'
import StyledTr from '../models/styled/StyledTr'
import { capitalize, formatAmount } from '../utils/formatting'
import { Covid19Data } from '../models/Covid19Data' // eslint-disable-line no-unused-vars
import { buildStyledTable } from '../utils/table'
import Chart from '../components/Chart'
import { AmountTimePair } from '../models/AmountTimePair' // eslint-disable-line no-unused-vars
import Switch from '@material-ui/core/Switch'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { DATA_COUNT, SCALE } from '../utils/constants'

interface Props {
    match: {
        params: {
            countryName: string
        }
    }
}

const buildStyledRow = (data: Covid19Data, index: number) => <StyledTr key={index + 1}>
  <StyledTd>{formatAmount(data.cases)}</StyledTd>
  <StyledTd>{formatAmount(data.deaths)}</StyledTd>
  <StyledTd>{formatAmount(data.recovered)}</StyledTd>
  <StyledTd>{data.date}</StyledTd>
</StyledTr>

const buildChartData = (countryTimeData: CountryTimeData, dataCount: string) => {
  return countryTimeData.data
    .filter((value: Covid19Data) => value[dataCount] > 0)
    .map((value: Covid19Data) => {
      const noYear: string = value.date.slice(5) // removing year as 2020 is implied
      const date = noYear.slice(0, 2) + '/' + noYear.slice(3, 5)
      return {
        amount: value[dataCount],
        date
      } as AmountTimePair
    })
}

const Country: React.FC<Props> = (props: Props) => {
  const { match } = props

  const [scale, setScale] = useState(SCALE.LINEAR)
  const [dataCount, setDataCount] = useState(DATA_COUNT.CASES)
  const [data, setData] = useState({
    name: 'Unknown',
    data: []
  } as CountryTimeData)

  useEffect(() => {
    getData({ path: `/time/${match.params.countryName}` } as DetailedRequest)
      .then((value: CountryTimeData) => {
        setData(value)
      })
  })

  const buildRows = () => data.data.map((row, index) => buildStyledRow(row, index))

  const handleScaleChange = event => {
    event.preventDefault()
    setScale(event.target.checked ? SCALE.LOGARITHMIC : SCALE.LINEAR)
  }

  const handleDeathsOrCasesChange = event => {
    event.preventDefault()
    setDataCount(event.target.checked ? DATA_COUNT.DEATHS : DATA_COUNT.CASES)
  }

  const buildSwitch = (checked: boolean, changeFunc, name: string, leftLabel: string, rightLabel) =>
    <Typography component="div">
      <Grid component="label" container alignItems="center" spacing={1}>
        <Grid item>{leftLabel}</Grid>
        <Grid item>
          <Switch checked={checked} onChange={changeFunc} name={name} color="default" />
        </Grid>
        <Grid item>{rightLabel}</Grid>
      </Grid>
    </Typography>

  return <div>
    <h1>{match.params.countryName}</h1>
    {buildSwitch(
      scale === SCALE.LOGARITHMIC,
      handleScaleChange, 'scale switch',
      SCALE.LINEAR, SCALE.LOGARITHMIC
    )}
    {buildSwitch(
      dataCount === DATA_COUNT.DEATHS,
      handleDeathsOrCasesChange,
      'data count switch',
      DATA_COUNT.CASES,
      DATA_COUNT.DEATHS
    )}
    <Chart xLabel={'date'} yLabel={'amount'} data={buildChartData(data, dataCount)} scale={scale} />
    {buildStyledTable([
      capitalize(DATA_COUNT.CASES),
      capitalize(DATA_COUNT.DEATHS),
      capitalize(DATA_COUNT.RECOVERED),
      'Last Update'
    ], buildRows)}
  </div>
}

export default Country
