import React from 'react'

interface CoverLetterPageProps {
  params: {
    id: string;
  };
}

const CoverLetterPage = async ({ params }: CoverLetterPageProps) => {
  const id = params?.id;
  return (
    <div>CoverLetterPage {id}</div>
  )
}

export default CoverLetterPage