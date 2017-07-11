import React from 'react'
import styled from 'styled-components'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const Cover = styled.div`
  background-color: #ddd;
  padding: 10px;
  margin-top: 20px;
`

const Chart = ({ dataStatistic, allStat }) => {

  const data = dataStatistic
  console.log(allStat)
  if (!dataStatistic || !allStat) {
    return (<center style={{ color: '#ddd' }}><h2> no data to create chart</h2></center>)
  }
  return (
    <Cover>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{ top: 5, right: 30, left: 10, bottom: 5 }}
        >
          <XAxis dataKey="mailConfig[0].name" label="success" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#232323" />
          <Bar dataKey="clickAvg" fill="#585858" />
          <Bar dataKey="openAvg" fill="#898989" />
        </BarChart>
      </ResponsiveContainer>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{ top: 5, right: 30, left: 10, bottom: 5 }}
        >
          <XAxis dataKey="mailConfig[0].name" label="success" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Bar dataKey="success" fill="#898989" />
        </BarChart>
      </ResponsiveContainer>
      <h4>success average : {allStat.successAvg.toFixed(2)}</h4>
      <h4>click average : {allStat.clickAvg.toFixed(2)}</h4>
      <h4>open average : {allStat.clickAvg.toFixed(2)}</h4>
      <h4>total email : {allStat.count}</h4>

    </Cover>
  )
}

export default Chart
