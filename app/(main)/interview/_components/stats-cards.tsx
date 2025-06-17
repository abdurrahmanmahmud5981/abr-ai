import React from 'react'

const StatsCards = ({ assessments }) => {

    const getAverageScore = () => {
        if (!assessments?.length) return 0;
        const total = assessments.reduce((sum, assessment) => sum + assessment.quizScore, 0);
        return (total / assessments.length).toFixed(1);
    }


    const getLatestAssessment = () => {
        if (!assessments?.length) return null;
        return assessments[0];
    }

    const getTotalQuestions = () => {
        if (!assessments?.length) return 0;
        return assessments.reduce((sum, assessment) => sum + assessment.questions.length, 0)
    }

    return (
        <div className='grid gap-4 md:grid-cols-3'>

        </div>
    )
}

export default StatsCards
