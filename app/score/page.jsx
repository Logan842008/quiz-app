"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  CheckCircle2,
  XCircle,
  Trophy,
  ArrowLeft,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import { quizzes } from "@/utils/data";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";

function ScorePageContent() {
  const params = useSearchParams();
  const id = params.get("id");
  const answers = JSON.parse(decodeURIComponent(params.get("answers") || "[]"));
  const quiz = quizzes.find((q) => q.id === id);
  const [previousScore, setPreviousScore] = useState(null);

  const score = quiz.questions.reduce(
    (acc, q, i) => (q.correct === answers[i] ? acc + 1 : acc),
    0
  );

  const percentage = (score / quiz.questions.length) * 100;

  useEffect(() => {
    if (typeof window !== "undefined") {
      const quizScores = JSON.parse(localStorage.getItem("quizScores") || "{}");
      const prevScore = quizScores[id];

      quizScores[id] = {
        score,
        total: quiz.questions.length,
        percentage,
        timestamp: new Date().toISOString(),
        previousScore: prevScore?.score || null,
      };

      if (prevScore) {
        setPreviousScore(prevScore);
      }
      localStorage.setItem("quizScores", JSON.stringify(quizScores));
    }
  }, [id, score, percentage, quiz.questions.length]);

  const getScoreComparison = () => {
    if (!previousScore) return null;

    const scoreDiff = score - previousScore.score;
    const percentageDiff = percentage - previousScore.percentage;

    return {
      scoreDiff,
      percentageDiff,
      improved: scoreDiff > 0,
      previousScore: previousScore.score,
      previousPercentage: previousScore.percentage,
    };
  };

  const comparison = getScoreComparison();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <Card className="mb-8">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Trophy className="h-12 w-12 text-yellow-500" />
            </div>
            <CardTitle className="text-3xl font-bold">Quiz Complete!</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="mb-4">
              <p className="text-2xl font-bold text-gray-900">
                You scored {score} out of {quiz.questions.length}
              </p>
              <p className="text-gray-500 mt-1">
                ({percentage.toFixed(1)}% correct)
              </p>
            </div>
            <Progress value={percentage} className="h-3 mb-6" />

            {comparison && (
              <div className="mt-4 mb-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold mb-2">
                  Compared to Previous Attempt
                </h3>
                <div className="flex items-center justify-center gap-2">
                  {comparison.improved ? (
                    <TrendingUp className="h-5 w-5 text-green-500" />
                  ) : (
                    <TrendingDown className="h-5 w-5 text-red-500" />
                  )}
                  <span
                    className={
                      comparison.improved ? "text-green-600" : "text-red-600"
                    }
                  >
                    {comparison.scoreDiff > 0 ? "+" : ""}
                    {comparison.scoreDiff} points (
                    {comparison.percentageDiff > 0 ? "+" : ""}
                    {comparison.percentageDiff.toFixed(1)}%)
                  </span>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Previous score: {comparison.previousScore} out of{" "}
                  {quiz.questions.length} (
                  {comparison.previousPercentage.toFixed(1)}%)
                </p>
              </div>
            )}

            <div className="flex justify-center gap-4">
              <Link href="/quiz">
                <Button variant="outline">
                  <ArrowLeft className="mr-2 h-4 w-4" /> Take Another Quiz
                </Button>
              </Link>
              <Link href={`/quiz/${id}`}>
                <Button>
                  <Trophy className="mr-2 h-4 w-4" /> Try Again
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          {quiz.questions.map((q, i) => (
            <Card key={i} className="overflow-hidden">
              <CardHeader className="bg-gray-50 border-b">
                <CardTitle className="text-lg font-semibold">
                  Question {i + 1}: {q.text}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-3">
                  {q.options.map((option, optionIndex) => (
                    <div
                      key={optionIndex}
                      className={`p-4 rounded-lg border-2 ${
                        answers[i] === option && q.correct === option
                          ? "border-green-500 bg-green-50"
                          : answers[i] === option && q.correct !== option
                          ? "border-red-500 bg-red-50"
                          : option === q.correct
                          ? "border-green-500 bg-green-50"
                          : "border-gray-200"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="text-gray-600">
                            {String.fromCharCode(65 + optionIndex)}.
                          </span>
                          <span>{option}</span>
                        </div>
                        {answers[i] === option && (
                          <div className="flex items-center text-sm">
                            {q.correct === option ? (
                              <div className="flex items-center text-green-600">
                                <CheckCircle2 className="h-4 w-4 mr-1" />
                                Your answer (Correct)
                              </div>
                            ) : (
                              <div className="flex items-center text-red-600">
                                <XCircle className="h-4 w-4 mr-1" />
                                Your answer (Incorrect)
                              </div>
                            )}
                          </div>
                        )}
                        {option === q.correct && answers[i] !== option && (
                          <div className="flex items-center text-sm text-green-600">
                            <CheckCircle2 className="h-4 w-4 mr-1" />
                            Correct answer
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ScorePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ScorePageContent />
    </Suspense>
  );
}
