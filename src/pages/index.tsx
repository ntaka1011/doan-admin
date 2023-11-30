// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Icons Imports
import Poll from 'mdi-material-ui/Poll'
import HelpCircleOutline from 'mdi-material-ui/HelpCircleOutline'
import BriefcaseVariantOutline from 'mdi-material-ui/BriefcaseVariantOutline'

// ** Custom Components Imports
import CardStatisticsVerticalComponent from 'src/@core/components/card-statistics/card-stats-vertical'
import withAuth from 'hooks/withAuth'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

// ** Demo Components Imports
import Table from 'src/views/dashboard/Table'
import Trophy from 'src/views/dashboard/Trophy'
import StatisticsCard from 'src/views/dashboard/StatisticsCard'
import WeeklyOverview from 'src/views/dashboard/WeeklyOverview'
import { useOrder } from 'hooks/useOrder'
import { useEffect, useState } from 'react'
import { convertPrice } from 'utils/convertPrice'

const Dashboard = () => {
  // ** states
  const [percent, setPercent] = useState(0)

  // ** Hooks
  const { getOrderIncome, getOrderQuantityMonth } = useOrder()
  const { data, mutate } = getOrderIncome()
  console.log('🚀 ~ file: index.tsx:32 ~ Dashboard ~ data:', data)
  const { data: quantity, mutate: muateQuantity } = getOrderQuantityMonth()
  console.log('🚀 ~ file: index.tsx:35 ~ Dashboard ~ data:', quantity)

  useEffect(() => {
    mutate()
    muateQuantity()
  }, [muateQuantity, mutate])

  useEffect(() => {
    if (data) {
      setPercent((data?.[1]?.total * 100) / data[0]?.total - 100)
    }
  }, [data])

  function floor(value: number) {
    return `${Math.floor(value)}%`
  }

  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12} md={4}>
          <Trophy />
        </Grid>
        <Grid item xs={12} md={8}>
          <StatisticsCard />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <WeeklyOverview />
        </Grid>
        <Grid item xs={12} md={6} lg={8}>
          <Grid container spacing={6}>
            <Grid item xs={6}>
              <CardStatisticsVerticalComponent
                stats={convertPrice(data?.[1]?.total)}
                icon={<Poll />}
                color='success'
                trend={`${percent > 0 ? 'positive' : 'negative'}`}
                trendNumber={`${percent > 0 ? `+${floor(percent)}` : floor(percent)}`}
                title='Total Profit'
                subtitle='Weekly Profit'
              />
            </Grid>
            <Grid item xs={6}>
              <CardStatisticsVerticalComponent
                stats='862'
                trend='negative'
                trendNumber='-18%'
                title='New Project'
                subtitle='Yearly Project'
                icon={<BriefcaseVariantOutline />}
              />
            </Grid>
            <Grid item xs={6}>
              <CardStatisticsVerticalComponent
                stats={quantity?.data?.[1]?.total || 0}
                color='warning'
                trend={`${quantity?.data[1]?.total / quantity?.data[0]?.total > 0 ? 'positive' : 'negative'}`}
                trendNumber={`${quantity?.data[1]?.total / quantity?.data[0]?.total}`}
                subtitle='Last Week'
                title='Sales Queries'
                icon={<HelpCircleOutline />}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Table />
        </Grid>
      </Grid>
    </ApexChartWrapper>
  )
}

export default withAuth(Dashboard)
