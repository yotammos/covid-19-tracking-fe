import * as React from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Counter from './Counter'
import { PATHS } from '../utils/constants'
import Styled from './Styled'
import Summary from './Summary'
import StyledLi from '../models/styled/StyledLi'
import StyledUl from '../models/styled/StyledUl'
import Country from './Country'
import Global from './Global'

const Home = () => <h2>Home</h2>

const NUM_TABS = 5

const AppRouter = () =>
  <Router>
    <div>
      <StyledUl>
        <StyledLi numTabs={NUM_TABS}>
          <Link to={PATHS.HOME}>Home</Link>
        </StyledLi>
        <StyledLi numTabs={NUM_TABS}>
          <Link to={PATHS.COUNTER}>Counter Example</Link>
        </StyledLi>
        <StyledLi numTabs={NUM_TABS}>
          <Link to={PATHS.STYLED}>Styled Example</Link>
        </StyledLi>
        <StyledLi numTabs={NUM_TABS}>
          <Link to={PATHS.SUMMARY}>Summary</Link>
        </StyledLi>
        <StyledLi numTabs={NUM_TABS}>
          <Link to={PATHS.GLOBAL}>Global</Link>
        </StyledLi>
      </StyledUl>

      <Route path={PATHS.HOME} exact component={Home} />
      <Route path={PATHS.COUNTER} component={Counter} />
      <Route path={PATHS.STYLED} component={Styled} />
      <Route path={`${PATHS.COUNTRY}/:countryName`} component={Country}/>
      <Route path={PATHS.SUMMARY} component={Summary} />
      <Route path={PATHS.GLOBAL} component={Global}/>
    </div>
  </Router>

render(<AppRouter />, document.getElementById('main'))
