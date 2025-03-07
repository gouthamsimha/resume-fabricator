
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedContainer from "@/components/ui-utils/AnimatedContainer";
import { ArrowRight, FileText, Zap, Sparkles } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-20 md:py-28">
          <div className="absolute inset-0 bg-gradient-to-b from-accent/50 to-transparent pointer-events-none" aria-hidden="true"></div>
          <div className="container px-6 mx-auto">
            <div className="max-w-4xl mx-auto text-center">
              <AnimatedContainer animation="fade" className="space-y-6">
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                  Create AI-Powered Tailored Resumes in Seconds
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground">
                  Stand out with professionally crafted resumes optimized for each job application.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
                  <Button
                    size="lg"
                    className="text-base px-8"
                    onClick={() => navigate("/builder")}
                  >
                    Get Started <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="text-base px-8"
                    onClick={() => navigate("/templates")}
                  >
                    View Templates
                  </Button>
                </div>
              </AnimatedContainer>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container px-6 mx-auto">
            <AnimatedContainer animation="slide-up" className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                How It Works
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Our AI-powered platform makes creating tailored resumes simple and efficient.
              </p>
            </AnimatedContainer>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <AnimatedContainer animation="slide-up" delay={100} className="bg-background rounded-lg p-6 shadow-sm border hover-lift">
                <div className="rounded-full bg-primary/10 w-14 h-14 flex items-center justify-center mb-6">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Input Your Details</h3>
                <p className="text-muted-foreground">
                  Enter your personal information, work experience, education, and other credentials just once.
                </p>
              </AnimatedContainer>

              <AnimatedContainer animation="slide-up" delay={200} className="bg-background rounded-lg p-6 shadow-sm border hover-lift">
                <div className="rounded-full bg-primary/10 w-14 h-14 flex items-center justify-center mb-6">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Add Job Description</h3>
                <p className="text-muted-foreground">
                  Upload or paste the job description to let our AI understand the role requirements.
                </p>
              </AnimatedContainer>

              <AnimatedContainer animation="slide-up" delay={300} className="bg-background rounded-lg p-6 shadow-sm border hover-lift">
                <div className="rounded-full bg-primary/10 w-14 h-14 flex items-center justify-center mb-6">
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Generate Your Resume</h3>
                <p className="text-muted-foreground">
                  Our AI tailors your resume to highlight relevant skills and experiences for the specific job.
                </p>
              </AnimatedContainer>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-primary/5 pointer-events-none" aria-hidden="true"></div>
          <div className="container px-6 mx-auto">
            <div className="max-w-3xl mx-auto text-center">
              <AnimatedContainer animation="scale" className="bg-background backdrop-blur-sm border rounded-2xl p-8 md:p-12 shadow-lg">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                  Ready to Land Your Dream Job?
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Start creating tailored resumes that get you noticed by hiring managers. No more generic applications.
                </p>
                <Button
                  size="lg"
                  className="text-base px-8"
                  onClick={() => navigate("/builder")}
                >
                  Create Your Resume <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </AnimatedContainer>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
