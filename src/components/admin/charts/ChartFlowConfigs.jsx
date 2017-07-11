import React from 'react'
import styled from 'styled-components'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const Cover = styled.div`
  background-color: #ddd;
  padding: 10px;
  margin-top: 20px;
`

const Chart = ({ dataStatistic, allSuccess }) => {

  const data = allSuccess
  if (!dataStatistic || !allSuccess) {
    return (<center style={{ color: '#ddd' }}><h2> no data to create chart</h2></center>)
  }
  return (
    <Cover>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{ top: 5, right: 30, left: 10, bottom: 5 }}
        >
          <XAxis dataKey="_id" label="success" />
          <YAxis label="total" />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#383838" />
        </BarChart>
      </ResponsiveContainer>
      <h4>success average : {dataStatistic.successAvg.toFixed(2)}</h4>
      <h4>total : {dataStatistic.total.toFixed(2)}</h4>

    </Cover>
  )
}

export default Chart
