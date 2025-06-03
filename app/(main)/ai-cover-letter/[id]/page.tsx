import React from 'react'


const CoverLetterPage = async ({ params } ) => {
  const {id} = await params
  return (
    <div>CoverLetterPage {id}</div>
  )
}

export default CoverLetterPage