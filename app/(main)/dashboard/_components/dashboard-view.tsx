import { Brain, BriefcaseIcon, LineChart, TrendingDown, TrendingUp, TrendingUpIcon } from 'lucide-react';
import { format, formatDistanceToNow } from 'date-fns';
import React from 'react'
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const DashboardView = ({ insights }) => {
  const salaryData = insights.salaryRange.map((item) => ({
    role: item.role,
    min: item.min / 1000, // Convert to thousands
    max: item.max / 1000, // Convert to thousands
    median: item.median / 1000, // Convert to thousands
  }));
  console.log('salaryData', salaryData)

  const getDemandLevelColor = (level) => {
    switch (level.toLowerCase()) {
      case 'high':
        return 'bg-green-500';
      case 'medium':
        return 'bg-yellow-500';
      case 'low':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  }

  const getMarketOutLookInfo = (outlook) => {
    switch (outlook.toLowerCase()) {
      case 'positive':
        return { color: 'text-green-500', icon: TrendingUpIcon };
      case 'neutral':
        return { color: 'text-yellow-500', icon: LineChart };
      case 'negative':
        return { color: 'text-red-500', icon: TrendingDown };
      default:
        return { color: 'text-gray-500', icon: LineChart };
    }
  }

  const OutlookIcon = getMarketOutLookInfo(insights.marketOutlook).icon;
  const outlookColor = getMarketOutLookInfo(insights.marketOutlook).color;

  // const lastUpdatedDate = new Date(insights.lastUpdated);
  // const formattedDate = lastUpdatedDate.toLocaleDateString('en-US', {
  //     year: 'numeric',
  //     month: 'long',
  //     day: 'numeric',
  // });

  const lastUpdatedDate = format(new Date(insights.lastUpdated), 'MMMM dd, yyyy');
  const nextUpdateDate = formatDistanceToNow(new Date(insights.nextUpdate), { addSuffix: true });
  console.log('lastUpdatedDate', nextUpdateDate)


  return (
    <div className=" space-y-6">
      <div className=" flex items-center justify-between ">
        <Badge variant="outline"> Last Updated: {lastUpdatedDate}</Badge>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Market Outlook */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className='text-sm font-medium'>Market Outlook</CardTitle>
            <OutlookIcon className={`h-4 w-4 ${outlookColor}`} />

          </CardHeader>
          <CardContent>
            <div className="">
              <p className={`text-2xl font-semibold`}>
                {insights.marketOutlook}
              </p>
              <p className="text-xs text-muted-foreground">
                Next Update: {nextUpdateDate}
              </p>
            </div>
          </CardContent>
        </Card>
        {/* Industry Growth */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className='text-sm font-medium'>Industry Growth</CardTitle>
            <TrendingUp className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="">
              <p className={`text-2xl font-semibold`}>
                {insights.growthRate.toFixed(2)}%
              </p>
              <Progress value={insights.growthRate} max={100} className="mt-2" />
            </div>
          </CardContent>
        </Card>
        {/* Demand Level */}
         <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Demand Level</CardTitle>
            <BriefcaseIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{insights.demandLevel}</div>
             <div
              className={`h-2 w-full rounded-full mt-2 ${getDemandLevelColor(
                insights.demandLevel
              )}`}
            />
          </CardContent>
        </Card>
        {/* top skills */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className='text-sm font-medium'>Top Skills</CardTitle>
            <Brain className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {insights.topSkills.map((skill: string) => (
                <Badge variant="secondary" key={skill}>{skill}</Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default DashboardView