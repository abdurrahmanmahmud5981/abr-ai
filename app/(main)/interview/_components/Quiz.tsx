"use client"
import { generateQuiz, saveQuizResult } from '@/actions/interview';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import useFetch from '@/hooks/use-fetch';
import React, { useEffect, useState } from 'react'
import { BarLoader } from 'react-spinners';
import { toast } from 'sonner';

const Quiz = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState<string[]>([]);
    const [showExplanation, setShowExplanation] = useState(false);


    const {
        loading: generatingQuiz,
        fn: generateQuizFn,
        data: quizData,
    } = useFetch(generateQuiz)


    const {
        loading:savingResult,
        fn:saveQuizResultFn,
        data:resultData,
        setData:setResultData,
    } = useFetch(saveQuizResult)
    console.log(resultData)

    useEffect(() => {
        if (quizData) {
            setAnswers(new Array(quizData.length).fill(null))
        }
    }, [quizData])



    const handleAnswer = (answer: string) => {
        const newAnswers = [...answers]
        newAnswers[currentQuestion] = answer;
        setAnswers(newAnswers)
    }



    const handleNext = ()=>{
        if(currentQuestion<quizData.length - 1){
            setCurrentQuestion(currentQuestion+1)
            setShowExplanation(false)
        }else{
            finishQuiz()
        }
    }

    const calculateScore = ()=>{
        let correct = 0;
        answers.forEach((answer,ind)=>{
            if(answer === quizData[ind].correctAnswer){
                correct++;
            }
        })
        return (correct / quizData.length) * 100;
    }

    const finishQuiz = async ()=>{
        const score:number = calculateScore();
        try {
            await saveQuizResultFn(quizData,answers,score);
            toast.success("Quiz Completed")
        } catch (error:unknown) {
            toast.error(error.message || "Failed to save quiz results")
        }
    }


    //loading
    if (generatingQuiz) {
        return <BarLoader className='mt-4' width="100%" color='gray' />
    }

    if (!quizData) {
        return (
            <Card className='mx-2'>
                <CardHeader>
                    <CardTitle>Be Ready To Test Your Strenth </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className='text-muted-foreground'>
                        This Quiz Contains 10 Questions Specifid To Your Industry and Skills. Take Your Time and Choose The Best Answer For Each Question.
                    </p>
                </CardContent>
                <CardFooter>
                    <Button onClick={generateQuizFn} className='w-full'>Start Quiz</Button>
                </CardFooter>
            </Card>
        )
    }


    const question = quizData[currentQuestion];


    return (
        <Card className='mx-2'>
            <CardHeader>
                <CardTitle>
                    Question {currentQuestion + 1} of {quizData.length}
                </CardTitle>
            </CardHeader>
            <CardContent>

                <p className='text-lg font-medium'>
                    {question.question}
                </p>

                <RadioGroup
                    onValueChange={handleAnswer}
                    value={answers[currentQuestion]}
                    className='space-y-2'>
                    {
                        question.options.map((option, ind) => (
                            <div key={ind} className="flex items-center space-x-2">
                                <RadioGroupItem value={option} id={`option-${ind}`} />
                                <Label htmlFor={`option-${ind}`}>{option}</Label>
                            </div>
                        ))
                    }

                </RadioGroup>
                {
                    showExplanation && (<div className='mt-4 p-4 bg-muted rounded-lg'>
                        <p className='font-medium'>Explanation:</p>
                        <p className='text-muted-foreground'>{question.explanation}</p>
                    </div>)
                }
            </CardContent>
            <CardFooter>
                {
                    !showExplanation && <Button variant={"outline"} onClick={() => setShowExplanation(true)}
                        disabled={!answers[currentQuestion]}
                    >
                        Show Explanation
                    </Button>
                }


                <Button className='ml-auto' onClick={handleNext}
                    disabled={!answers[currentQuestion] || savingResult}
                >
                    {
                        savingResult && (
                            <BarLoader className='mt-4' width={"100%"}  color='gray'/>
                        )
                    }
                    {
                        currentQuestion < quizData.length - 1 
                        ? "Next Question" 
                        : "Finish Quiz"
                    }
                </Button>
            </CardFooter>
        </Card>
    )
}

export default Quiz
