import React from 'react'

const DashboardView = ({ insights }) => {
    const salaryData = insights.salaryRange.map((item) => ({
        role: item.role,
        min: item.min / 1000, // Convert to thousands
        max: item.max / 1000, // Convert to thousands
        median: item.median / 1000, // Convert to thousands
    }));
    console.log('salaryData', salaryData)
  return (
    <div>
      <h1>Industry Insights</h1>
      <pre>{JSON.stringify(insights, null, 2)}</pre>
    </div>
  )
}

export default DashboardView