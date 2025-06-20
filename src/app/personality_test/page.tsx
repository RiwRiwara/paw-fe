'use client';
import { useState, useEffect } from 'react';
import Image from "next/image";
import { useRouter } from "next/navigation";
import api from "@/utils/api";
import { FaPaw } from 'react-icons/fa';

interface Question {
    id: number;
    text: string;
    trait: string;
    selected: boolean | null;
}

export default function PersonalityTest() {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState<number>(0);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [isCompleted, setIsCompleted] = useState<boolean>(false);

    // Personality questions fetched from backend
    const [questions, setQuestions] = useState<Question[]>([]);
    const [loadingQuestions, setLoadingQuestions] = useState<boolean>(true);

    // fetch questions on mount
    useEffect(() => {
        const fetchQuestions = async () => {
            setLoadingQuestions(true);
            const res = await api.user.getPersonalityQuestions();
            console.log(res.data);
            try {
                if (res.data.success) {
                    const mapTrait = (type: string): string => {
                        switch (type) {
                            case 'Active':
                                return 'active';
                            case 'Space Required':
                                return 'spaceRequired';
                            case 'Pet Friendly':
                                return 'petFriendly';
                            case 'Special Care Need':
                                return 'specialCareNeed';
                            default:
                                return type.replace(/\s+/g, '').toLowerCase();
                        }
                    };

                    const qList: Question[] = res.data.data.map((item: any) => ({
                        id: item.QuestionId ?? item.questionId,
                        text: item.Question ?? item.question,
                        trait: mapTrait(item.PersonalityType ?? item.personalityType),
                        selected: item.PersonalityAnswer ? item.PersonalityAnswer.answerValue : (item.personalityAnswer ? item.personalityAnswer.answerValue : null)
                    }));
                    setQuestions(qList);
                    setLoadingQuestions(false);
                }
            } catch (err) {
                console.error('Failed to load personality questions', err);
            }
        };
        fetchQuestions();
    }, []);

    const updateAnswer = (questionId: number, answer: boolean) => {
        setQuestions(prevQuestions =>
            prevQuestions.map(q =>
                q.id === questionId ? { ...q, selected: answer } : q
            )
        );
    };

    const allQuestionsAnswered = () => {
        return questions.every(q => q.selected !== null);
    };

    const handleSubmit = async () => {
        if (!allQuestionsAnswered()) {
            alert("กรุณาตอบคำถามทุกข้อ");
            return;
        }

        setIsSubmitting(true);

        try {
            // Convert questions to the format expected by the API
            const answers: Record<string, number> = {};
            questions.forEach(q => {
                answers[q.trait] = q.selected ? 5 : 1; // Yes = 5, No = 1 on the 1-5 scale
            });

            // Call your API to save the personality test results
            // This is a placeholder - implement the actual API call when available
            try {
                // Uncomment this when the API endpoint is implemented
                // const response = await api.user.savePersonalityTest(answers);
                console.log('Personality test answers:', answers);
            } catch (error) {
                console.error('API call would be made here with:', answers);
            }

            // For now, just simulate a successful submission
            await new Promise(resolve => setTimeout(resolve, 1500));

            setIsCompleted(true);
            setTimeout(() => {
                router.push('/adopt'); // Redirect to adoption page after test
            }, 2000);
        } catch (error) {
            console.error('Error saving personality test:', error);
            alert('เกิดข้อผิดพลาดในการบันทึกข้อมูล กรุณาลองอีกครั้ง');
        } finally {
            setIsSubmitting(false);
        }
    };

    const nextQuestion = () => {
        if (currentStep < questions.length - 1) {
            setCurrentStep(prev => prev + 1);
        }
    };

    const prevQuestion = () => {
        if (currentStep > 0) {
            setCurrentStep(prev => prev - 1);
        }
    };

    if (loadingQuestions) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-gray-500">กำลังโหลดคำถาม...</p>
            </div>
        );
    }

    if (questions.length === 0) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-gray-500">ไม่พบคำถาม</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen  mt-20">
            {/* Hero Section with Illustration */}
            <div className="max-w-4xl mx-auto text-center">
                <div className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-primary-red mb-4">Find Your Perfect Pet Match</h1>
                    <div className="w-24 h-1 bg-primary-pink mx-auto mb-6"></div>
                    <p className="text-primary-400 text-lg">Answer a few questions to help us find the perfect pet for your lifestyle.</p>
                </div>

            </div>

            {/* Main Content */}
            <div className="flex-grow flex items-start justify-center px-4 py-12 sm:px-6 lg:px-8">
                <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full p-6 md:p-8 border-2 ">
                    {!isCompleted ? (
                        <>
                            {/* Progress Indicator */}
                            <div className="mb-8">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm font-medium text-primary-400">คำถาม {currentStep + 1}/{questions.length}</span>
                                    <span className="text-sm font-medium text-primary-400">{Math.round(((currentStep + 1) / questions.length) * 100)}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2.5">
                                    <div
                                        className="bg-primary-red h-2.5 rounded-full transition-all duration-300"
                                        style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
                                    ></div>
                                </div>
                            </div>

                            {/* Current Question */}
                            <div className="mb-8 text-center">
                                <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-6">

                                    {
                                        questions[currentStep].text
                                    }
                                </h3>

                                <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
                                    <button
                                        onClick={() => updateAnswer(questions[currentStep].id, true)}
                                        className={`flex-1 py-4 px-6 rounded-lg text-lg font-medium transition-all duration-200 ${questions[currentStep].selected === true
                                            ? 'bg-green-600 text-white'
                                            : 'bg-white border-2 border-green-500 text-green-600 hover:bg-green-50'}`}
                                    >
                                        ใช่
                                    </button>
                                    <button
                                        onClick={() => updateAnswer(questions[currentStep].id, false)}
                                        className={`flex-1 py-4 px-6 rounded-lg text-lg font-medium transition-all duration-200 ${questions[currentStep].selected === false
                                            ? 'bg-red-600 text-white'
                                            : 'bg-white border-2 border-red-500 text-red-600 hover:bg-red-50'}`}
                                    >
                                        ไม่
                                    </button>
                                </div>
                            </div>

                            {/* Navigation Buttons */}
                            <div className="flex justify-between">
                                <button
                                    onClick={prevQuestion}
                                    disabled={currentStep === 0}
                                    className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${currentStep === 0
                                        ? 'text-gray-400 cursor-not-allowed bg-gray-100'
                                        : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
                                >
                                    ย้อนกลับ
                                </button>

                                {currentStep === questions.length - 1 ? (
                                    <button
                                        onClick={handleSubmit}
                                        disabled={isSubmitting || !questions[currentStep].selected}
                                        className={`px-8 py-3 rounded-full font-medium transition-all duration-200 ${isSubmitting || !questions[currentStep].selected
                                            ? 'bg-primary-300 text-white cursor-not-allowed'
                                            : 'bg-primary-red text-white hover:bg-primary-600 shadow-md hover:shadow-lg'}`}
                                    >
                                        {isSubmitting ? (
                                            <div className="flex items-center">
                                                <span className="animate-spin h-5 w-5 mr-2 border-t-2 border-b-2 border-white rounded-full"></span>
                                                กำลังบันทึก...
                                            </div>
                                        ) : 'บันทึกคำตอบ'}
                                    </button>
                                ) : (
                                    <button
                                        onClick={nextQuestion}
                                        disabled={questions[currentStep].selected === null}
                                        className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${questions[currentStep].selected === null
                                            ? 'bg-primary-300 text-white cursor-not-allowed'
                                            : 'bg-primary-red text-white hover:bg-primary-600 shadow-md hover:shadow-lg'}`}
                                    >
                                        ถัดไป
                                    </button>
                                )}
                            </div>
                        </>
                    ) : (
                        <div className="text-center py-8">
                            <div className="w-20 h-20 bg-green-100 rounded-full mx-auto flex items-center justify-center mb-6">
                                <FaPaw className="text-primary-red text-3xl" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">ขอบคุณสำหรับการตอบแบบทดสอบ!</h2>
                            <p className="text-primary-400 mb-6">ขณะนี้เรามีข้อมูลเพียงพอที่จะแนะนำสัตว์เลี้ยงที่เหมาะกับคุณแล้ว</p>
                            <div className="animate-pulse">
                                <p className="text-gray-500">กำลังพาคุณไปยังหน้าแนะนำสัตว์เลี้ยง...</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Decorative Paw Prints */}
            <div className="relative w-full">
                <div className="absolute top-10 right-10 w-16 h-16 opacity-20">
                    <Image src="/images/paw.png" alt="paw" fill className="object-contain" />
                </div>
                <div className="absolute bottom-20 left-10 w-20 h-20 opacity-20">
                    <Image src="/images/paw.png" alt="paw" fill className="object-contain" />
                </div>
            </div>
        </div>
    );
}
