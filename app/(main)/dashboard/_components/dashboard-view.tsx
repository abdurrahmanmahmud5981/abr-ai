import { LineChart, TrendingDown, TrendingUpIcon } from 'lucide-react';
import { format, formatDistanceToNow } from 'date-fns';
import React from 'react'
import { Badge } from '@/components/ui/badge';

const DashboardView = ({ insights }) => {
    const salaryData = insights.salaryRange.map((item) => ({
        role: item.role,
        min: item.min / 1000, // Convert to thousands
        max: item.max / 1000, // Convert to thousands
        median: item.median / 1000, // Convert to thousands
    }));
    console.log('salaryData', salaryData)

    const getDemandLevelColor = (level)=>{
        switch(level.toLowerCase()){
          case 'high':
            return 'text-green-500';
          case 'medium':
            return 'text-yellow-500';
          case 'low':
            return 'text-red-500';
          default:
            return 'text-gray-500';
        }
    }

    const getMarketOutLookInfo = (outlook) => {
        switch(outlook.toLowerCase()) {
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
    const nextUpdateDate = formatDistanceToNow(new Date(insights.nextUpdate), {addSuffix:true});
    console.log('lastUpdatedDate', nextUpdateDate)
  return (
    <div>
      <div className="">
        <Badge variant="outline"> Last Updated: {lastUpdatedDate}</Badge>
      </div>
    </div>
  )
}

export default DashboardView