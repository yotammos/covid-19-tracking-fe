import * as React from 'react'
import { getData } from '../utils/restClient'
import CountryData from '../models/CountryData'
import StyledTd from '../models/styled/StyledTd'
import StyledTr from '../models/styled/StyledTr'
import StyledLink from '../models/styled/StyledLink'
import { formatAmount } from '../utils/formatting'
import { buildStyledTable } from '../utils/table'
import {DATA_COUNT, PATHS} from '../utils/constants'
import styled from 'styled-components'

interface Props {}  

interface State {
    data?: Array<CountryData>
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
    if (availableCountries.includes(name)) {
        return <StyledLink to={`${PATHS.COUNTRY}/${name}`}>{name}</StyledLink>
    } else {
        return <div>{name}</div>
    }
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

export default class Summary extends React.Component<Props, State> {
    state = {
        data: []
    }

    componentDidMount = () => {
        getData("http://localhost:8080/counts/all").then(value => {
            this.setState({
                data: value
            })
        })
    }

    buildRows = () => {
        return this.state.data.map((row, index) => buildStyledRow(row, index))
    }

    render() {
        return <div>
            <StyledH1>Summary</StyledH1>
            {buildStyledTable(['Name', DATA_COUNT.CASES, DATA_COUNT.DEATHS, DATA_COUNT.RECOVERED], this.buildRows)}
        </div>
    }
}