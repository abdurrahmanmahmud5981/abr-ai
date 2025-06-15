import React, { Suspense } from 'react'
import { BarLoader } from 'react-spinners'
const InterviewdLayout = ({ children }:{
    children:React.ReactNode
}) => {
    return (
        <div className="px-5 py-8">
            
            <Suspense fallback={
                <BarLoader className='mt-4' width={"100%"} color='gray'/>
            }>
                {children}
            </Suspense>
        </div>
    )
}

export default InterviewdLayout;