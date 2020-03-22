import * as React from 'react'
import { AmountTimePair } from '../models/AmountTimePair' // eslint-disable-line no-unused-vars
import { LineChart, XAxis, Tooltip, YAxis, Line, CartesianGrid, Brush, AreaChart, Area } from 'recharts'

interface Props {
  xLabel: string
  yLabel: string
  data: Array<AmountTimePair>
  scale: string
}

const Chart: React.FC<Props> = (props: Props) => {
  const { xLabel, yLabel, data, scale } = props
  console.log()
  const reversed = data.reverse()

  return <div>
    <LineChart data={reversed} width={1200} height={350} margin={{ top: 40, right: 40, bottom: 20, left: 20 }}>
      <CartesianGrid vertical={false} />
      <XAxis dataKey="date" label={{ value: xLabel, position: 'insideBottomRight', dy: 10 }} />
      <YAxis scale={scale} domain={['auto', 'auto']} allowDataOverflow label={{ value: yLabel, position: 'insideLeft', angle: -90, dy: -10 }} />
      <Tooltip
        wrapperStyle={{
          borderColor: 'white',
          boxShadow: '2px 2px 3px 0px rgb(204, 204, 204)'
        }}
        contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}
        labelStyle={{ fontWeight: 'bold', color: '#666666' }}
      />
      <Line dataKey="amount" stroke="#ff7300" dot={false} />
      <Brush dataKey="date">
        <AreaChart>
          <CartesianGrid />
          <YAxis hide domain={['auto', 'auto']} />
          <Area dataKey="amount" stroke="#ff7300" fill="#ff7300" dot={false} />
        </AreaChart>
      </Brush>
    </LineChart>
  </div >
}

export default Chart
