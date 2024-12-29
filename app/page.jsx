import Link from "next/link";
import { BookOpen, Users, Award, Brain, Target, ChartBar } from "lucide-react";
import Navbar from "@/components/Navbar";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Navbar />
      <div className="container mx-auto py-12 px-6">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="secondary" className="mb-4">
            Test Your Knowledge
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
            Welcome to the Ultimate Quiz App!
          </h1>
          <p className="text-lg text-gray-600 mt-6">
            Challenge your knowledge, learn something new, and have fun while
            testing your skills in various categories. From trivia to advanced
            topics, we've got it all!
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link href="/quiz" passHref>
              <Button size="lg" className="text-lg font-medium group">
                Get Started Now
                <Award className="ml-2 w-5 h-5 group-hover:rotate-12 transition-transform" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="text-lg font-medium">
              Learn More
            </Button>
          </div>
        </div>

        <Separator className="mb-16" />

        {/* Benefits Section */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 mb-20">
          {[
            {
              icon: Brain,
              title: "Learn New Things",
              description:
                "Expand your knowledge with quizzes designed to teach and test.",
              color: "text-indigo-600",
            },
            {
              icon: Users,
              title: "Compete with Friends",
              description:
                "Compare scores and challenge your friends to see who's the best.",
              color: "text-purple-600",
            },
            {
              icon: BookOpen,
              title: "Easy to Use",
              description:
                "Intuitive design ensures you focus on what matters—learning!",
              color: "text-pink-600",
            },
          ].map((benefit, index) => (
            <Card
              key={index}
              className="group hover:shadow-xl transition-all duration-300"
            >
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <benefit.icon
                    className={`w-6 h-6 ${benefit.color} group-hover:scale-110 transition-transform`}
                  />
                  <CardTitle
                    className={`text-xl font-semibold ${benefit.color}`}
                  >
                    {benefit.title}
                  </CardTitle>
                </div>
                <CardDescription className="text-base">
                  {benefit.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>

        {/* Explanation Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
            How Does This App Work?
          </h2>
          <p className="text-lg text-gray-600 mt-4">
            This app is designed to make learning fun and engaging. Choose a
            quiz category that matches your interest, answer thought-provoking
            questions, and get immediate feedback. Whether you're preparing for
            a test, brushing up on general knowledge, or just having fun, this
            app has something for everyone!
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              icon: Target,
              title: "Pick a Category",
              description:
                "Explore topics ranging from general trivia to advanced subjects. Find something you love!",
              color: "text-indigo-600",
            },
            {
              icon: BookOpen,
              title: "Take the Quiz",
              description:
                "Answer carefully curated questions and get real-time feedback to track your progress.",
              color: "text-purple-600",
            },
            {
              icon: ChartBar,
              title: "Track Your Results",
              description:
                "See detailed analytics and learn from your mistakes to improve over time.",
              color: "text-pink-600",
            },
          ].map((step, index) => (
            <Card
              key={index}
              className="group hover:shadow-xl transition-all duration-300"
            >
              <CardHeader>
                <div className="flex items-center gap-2">
                  <step.icon
                    className={`w-6 h-6 ${step.color} group-hover:scale-110 transition-transform`}
                  />
                  <CardTitle className={`text-xl font-semibold ${step.color}`}>
                    {step.title}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
