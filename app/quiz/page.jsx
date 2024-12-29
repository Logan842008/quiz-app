import Link from "next/link";
import { BookOpen, Clock, Trophy, Users } from "lucide-react";
import Navbar from "@/components/Navbar";
import { quizzes } from "@/utils/data";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";

export default function QuizOverview() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Navbar />
      <div className="container mx-auto py-12 px-6">
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto mb-12">
          <Badge variant="secondary" className="mb-4">
            Featured Quizzes
          </Badge>
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-800 sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
            Discover All Quizzes
          </h1>
          <p className="text-lg text-gray-600 mt-4">
            Explore a variety of topics to challenge your knowledge and skills.
            Whether you're into trivia, science, or history, there's something
            for everyone.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { icon: BookOpen, label: "Total Quizzes", value: quizzes.length },
            { icon: Users, label: "Active Players", value: "1,000+" },
            { icon: Trophy, label: "Completion Rate", value: "85%" },
            { icon: Clock, label: "Avg. Duration", value: "10 mins" },
          ].map((stat, index) => (
            <Card key={index} className="text-center">
              <CardContent className="pt-6">
                <stat.icon className="w-8 h-8 mx-auto mb-2 text-purple-500" />
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-sm text-gray-500">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Separator className="mb-12" />

        {/* Categories Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {["All", "Popular", "New", "Science", "History", "Technology"].map(
            (category) => (
              <Badge
                key={category}
                variant={category === "All" ? "default" : "secondary"}
                className="cursor-pointer hover:bg-purple-100"
              >
                {category}
              </Badge>
            )
          )}
        </div>

        {/* Quizzes Grid */}
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {quizzes.map((quiz) => (
            <Link key={quiz.id} href={`/quiz/${quiz.id}`}>
              <Card className="h-full hover:shadow-xl transition-all duration-300 group">
                <div className="relative h-40 bg-gradient-to-r from-purple-500 to-pink-500 overflow-hidden">
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <h3 className="text-white text-2xl font-bold text-center px-4">
                      {quiz.title}
                    </h3>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <p className="text-sm text-gray-600">{quiz.description}</p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Difficulty</span>
                        <span className="font-medium">
                          {quiz.difficulty || "Intermediate"}
                        </span>
                      </div>
                      <Progress
                        value={
                          quiz.difficulty === "Easy"
                            ? 33
                            : quiz.difficulty === "Medium"
                            ? 66
                            : 100
                        }
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="px-6 py-4 border-t bg-gray-50">
                  <div className="flex justify-between items-center w-full text-sm text-gray-500">
                    <span>{quiz.questions?.length || "10"} Questions</span>
                    <span>{quiz.estimatedTime || "10 mins"}</span>
                  </div>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
