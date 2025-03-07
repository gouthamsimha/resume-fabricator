
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Loader2, RefreshCw } from "lucide-react";
import AnimatedContainer from "./ui-utils/AnimatedContainer";
import { ProfileData } from "./ProfileForm";
import { Experience } from "./ExperienceForm";
import { Education } from "./EducationForm";
import { Template } from "./TemplateGallery";

interface ResumePreviewProps {
  profile: ProfileData;
  experiences: Experience[];
  education: Education[];
  jobDescription: string;
  selectedTemplate: string;
  templates: Template[];
  onBack: () => void;
  onReset: () => void;
}

const ResumePreview = ({
  profile,
  experiences,
  education,
  jobDescription,
  selectedTemplate,
  templates,
  onBack,
  onReset,
}: ResumePreviewProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [generatedResumeUrl, setGeneratedResumeUrl] = useState<string | null>(null);

  // This is a placeholder function for when we integrate the actual generation
  const regenerateResume = () => {
    setIsGenerating(true);
    setGeneratedResumeUrl(null);
    
    // Simulating API call for resume generation
    setTimeout(() => {
      setIsGenerating(false);
      // For demo purpose, we'll use the template thumbnail as the resume preview
      const template = templates.find(t => t.id === selectedTemplate);
      setGeneratedResumeUrl(template?.thumbnail || null);
    }, 2000);
  };

  const downloadResume = () => {
    setIsDownloading(true);
    
    // Simulating download delay
    setTimeout(() => {
      setIsDownloading(false);
      // In a real implementation, this would trigger a download of the actual generated PDF
      alert("Resume download would start now in a real implementation.");
    }, 1000);
  };
  
  // Auto-generate on component mount
  useState(() => {
    regenerateResume();
  });

  return (
    <AnimatedContainer animation="scale" className="w-full max-w-4xl mx-auto">
      <Card className="shadow-sm border bg-card">
        <CardContent className="pt-6">
          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-xl font-medium tracking-tight">Your Resume</h3>
              <p className="text-sm text-muted-foreground">
                Review your AI-generated tailored resume.
              </p>
            </div>

            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-full md:w-2/3 flex flex-col">
                <div className="rounded-lg border overflow-hidden flex-grow">
                  {isGenerating ? (
                    <div className="flex flex-col items-center justify-center h-full min-h-[500px] bg-muted/30">
                      <Loader2 className="h-8 w-8 text-primary animate-spin mb-4" />
                      <p className="text-muted-foreground">Generating your resume...</p>
                    </div>
                  ) : generatedResumeUrl ? (
                    <div className="h-full bg-white">
                      <img
                        src={generatedResumeUrl}
                        alt="Generated Resume"
                        className="w-full h-full object-contain bg-white"
                      />
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full min-h-[500px] bg-muted/30">
                      <p className="text-muted-foreground">Failed to generate preview</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="w-full md:w-1/3 space-y-4">
                <div className="space-y-2">
                  <h4 className="text-lg font-medium">Actions</h4>
                  <div className="space-y-3">
                    <Button
                      className="w-full"
                      onClick={downloadResume}
                      disabled={isGenerating || !generatedResumeUrl || isDownloading}
                    >
                      {isDownloading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Downloading...
                        </>
                      ) : (
                        <>
                          <Download className="mr-2 h-4 w-4" />
                          Download PDF
                        </>
                      )}
                    </Button>
                    
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={regenerateResume}
                      disabled={isGenerating}
                    >
                      {isGenerating ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Regenerating...
                        </>
                      ) : (
                        <>
                          <RefreshCw className="mr-2 h-4 w-4" />
                          Regenerate
                        </>
                      )}
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-lg font-medium">Template</h4>
                  <p className="text-sm text-muted-foreground">
                    {templates.find(t => t.id === selectedTemplate)?.name || "Selected Template"}
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="text-lg font-medium">Optimization</h4>
                  <p className="text-sm text-muted-foreground">
                    Your resume has been optimized for the job description you provided, highlighting relevant skills and experiences.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-between">
              <Button type="button" variant="outline" onClick={onBack}>
                Back
              </Button>
              <Button variant="default" onClick={onReset}>
                Create New Resume
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </AnimatedContainer>
  );
};

export default ResumePreview;
