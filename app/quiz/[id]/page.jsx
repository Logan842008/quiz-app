"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Trophy, ArrowLeft, TrendingUp, Timer } from "lucide-react";
import { quizzes } from "@/utils/data";
import Link from "next/link";

export default function QuizPage() {
  const router = useRouter();
  const params = useParams();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [previousScore, setPreviousScore] = useState(null);
  const [timeLeft, setTimeLeft] = useState(null);
  const [quizStarted, setQuizStarted] = useState(false);

  const quiz = quizzes.find((q) => q.id === params.id);

  useEffect(() => {
    // Check for previous attempts
    const quizScores = JSON.parse(localStorage.getItem("quizScores") || "{}");
    const prevScore = quizScores[params.id];

    if (prevScore && !quizStarted) {
      setPreviousScore(prevScore);
      setShowModal(true);
    }
  }, [params.id, quizStarted]);

  useEffect(() => {
    if (quizStarted && timeLeft === null) {
      // Set initial time (10 minutes)
      setTimeLeft(10 * 60);
    }

    if (!timeLeft || !quizStarted) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleQuizSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, quizStarted]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const handleStartQuiz = () => {
    setShowModal(false);
    setQuizStarted(true);
    setAnswers(new Array(quiz.questions.length).fill(null));
  };

  const handleAnswer = (answer) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answer;
    setAnswers(newAnswers);

    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handleQuizSubmit = () => {
    const searchParams = new URLSearchParams();
    searchParams.set("id", quiz.id);
    searchParams.set("answers", JSON.stringify(answers));
    router.push(`/score?${searchParams.toString()}`);
  };

  if (!quiz) {
    return <div>Quiz not found</div>;
  }

  if (!quizStarted) {
    return (
      <>
        <AlertDialog open={showModal} onOpenChange={setShowModal}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-yellow-500" />
                Quiz Already Completed
              </AlertDialogTitle>
              <AlertDialogDescription className="space-y-4">
                <p>
                  You've already completed{" "}
                  <span className="font-medium">{quiz.title}</span>. Your
                  previous score was:
                </p>
                {previousScore && (
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <p className="text-2xl font-bold text-gray-900">
                      {previousScore.score} out of {previousScore.total}
                    </p>
                    <p className="text-sm text-gray-500">
                      ({previousScore.percentage.toFixed(1)}% correct)
                    </p>
                  </div>
                )}
                <p>Would you like to try again and improve your score?</p>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel asChild>
                <Link href="/quiz">
                  <Button variant="outline">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Quizzes
                  </Button>
                </Link>
              </AlertDialogCancel>
              <AlertDialogAction onClick={handleStartQuiz} className="gap-2">
                <TrendingUp className="h-4 w-4" />
                Start New Attempt
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Card>
              <CardHeader>
                <CardTitle className="text-3xl font-bold">
                  {quiz.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">{quiz.description}</p>
                <div className="flex justify-center space-x-4 text-sm text-gray-500">
                  <div>Questions: {quiz.questions.length}</div>
                  <div>Time Limit: 10 minutes</div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-center gap-4">
                <Link href="/quiz">
                  <Button variant="outline">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Quizzes
                  </Button>
                </Link>
                <Button onClick={handleStartQuiz}>Start Quiz</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </>
    );
  }

  const currentQ = quiz.questions[currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Progress Header */}
        <Card className="mb-8">
          <CardContent className="py-6">
            <div className="flex justify-between items-center mb-4">
              <div className="text-sm text-gray-500">
                Question {currentQuestion + 1} of {quiz.questions.length}
              </div>
              <div className="flex items-center text-sm font-medium">
                <Timer className="h-4 w-4 mr-1" />
                {formatTime(timeLeft)}
              </div>
            </div>
            <Progress
              value={(currentQuestion / quiz.questions.length) * 100}
              className="h-2"
            />
          </CardContent>
        </Card>

        {/* Question Card */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">
              {currentQ.text}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {currentQ.options.map((option, index) => (
              <Button
                key={index}
                variant={
                  answers[currentQuestion] === option ? "default" : "outline"
                }
                className="w-full justify-start text-left h-auto py-4 px-6"
                onClick={() => handleAnswer(option)}
              >
                <span className="mr-4">{String.fromCharCode(65 + index)}.</span>
                {option}
              </Button>
            ))}
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => setCurrentQuestion((prev) => Math.max(0, prev - 1))}
            disabled={currentQuestion === 0}
          >
            Previous
          </Button>
          {currentQuestion === quiz.questions.length - 1 ? (
            <Button
              onClick={handleQuizSubmit}
              disabled={answers.some((answer) => answer === null)}
            >
              Submit Quiz
            </Button>
          ) : (
            <Button
              onClick={() =>
                setCurrentQuestion((prev) =>
                  Math.min(quiz.questions.length - 1, prev + 1)
                )
              }
              disabled={answers[currentQuestion] === null}
            >
              Next
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
