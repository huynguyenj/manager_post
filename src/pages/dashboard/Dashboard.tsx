import { AxiosInstance } from 'axios'
import React from 'react'

type DashboardPageApi = {
  api:AxiosInstance
}
function Dashboard({api}:DashboardPageApi) {
  return (
    <div>Dashboard</div>
  )
}

export default Dashboard