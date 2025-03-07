
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Loader2, RefreshCw, FileText, WandSparkles } from "lucide-react";
import AnimatedContainer from "./ui-utils/AnimatedContainer";
import { ProfileData } from "./ProfileForm";
import { Experience } from "./ExperienceForm";
import { Education } from "./EducationForm";
import { Template } from "./TemplateGallery";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { extractKeywords } from "@/utils/resumeParser";

interface ResumePreviewProps {
  profile: ProfileData;
  experiences: Experience[];
  education: Education[];
  jobDescription: string;
  existingResume: string;
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
  existingResume,
  selectedTemplate,
  templates,
  onBack,
  onReset,
}: ResumePreviewProps) => {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [generatedResumeUrl, setGeneratedResumeUrl] = useState<string | null>(null);
  const [matchedKeywords, setMatchedKeywords] = useState<string[]>([]);
  const [isFinetuning, setIsFinetuning] = useState(Boolean(existingResume));
  const [matchScore, setMatchScore] = useState<number | null>(null);
  
  // This is a placeholder function for when we integrate the actual generation
  const regenerateResume = () => {
    setIsGenerating(true);
    setGeneratedResumeUrl(null);
    
    // Simulate API call for resume generation
    setTimeout(() => {
      setIsGenerating(false);
      
      // Extract keywords from job description
      const keywords = extractKeywords(jobDescription);
      setMatchedKeywords(keywords);
      
      // Calculate a match score (simplified for demo)
      if (isFinetuning && existingResume) {
        const resumeLower = existingResume.toLowerCase();
        const matchCount = keywords.filter(kw => resumeLower.includes(kw)).length;
        const matchPercent = Math.min(Math.round((matchCount / keywords.length) * 100), 95);
        setMatchScore(matchPercent);
      }
      
      // For demo purpose, use the template thumbnail as the resume preview
      const template = templates.find(t => t.id === selectedTemplate);
      setGeneratedResumeUrl(template?.thumbnail || null);
      
      toast({
        title: isFinetuning ? "Resume fine-tuned" : "Resume generated",
        description: isFinetuning 
          ? "Your resume has been optimized for the job description"
          : "Your new resume has been created",
      });
    }, 2000);
  };

  const downloadResume = () => {
    setIsDownloading(true);
    
    // Simulate download delay
    setTimeout(() => {
      setIsDownloading(false);
      // In a real implementation, this would trigger a download of the actual generated PDF
      toast({
        title: "Download started",
        description: "Your resume will be downloaded as a PDF file",
      });
    }, 1000);
  };
  
  // Auto-generate on component mount
  useEffect(() => {
    regenerateResume();
  }, []);

  return (
    <AnimatedContainer animation="scale" className="w-full max-w-4xl mx-auto">
      <Card className="shadow-sm border bg-card">
        <CardContent className="pt-6">
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center">
                {isFinetuning && (
                  <div className="mr-2 bg-primary/10 rounded-full p-1">
                    <WandSparkles className="h-5 w-5 text-primary" />
                  </div>
                )}
                <h3 className="text-xl font-medium tracking-tight">
                  {isFinetuning ? "Your Fine-Tuned Resume" : "Your Resume"}
                </h3>
              </div>
              <p className="text-sm text-muted-foreground">
                {isFinetuning 
                  ? "Review your existing resume optimized for the job description."
                  : "Review your AI-generated tailored resume."}
              </p>
            </div>

            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-full md:w-2/3 flex flex-col">
                <div className="rounded-lg border overflow-hidden flex-grow">
                  {isGenerating ? (
                    <div className="flex flex-col items-center justify-center h-full min-h-[500px] bg-muted/30">
                      <Loader2 className="h-8 w-8 text-primary animate-spin mb-4" />
                      <p className="text-muted-foreground">
                        {isFinetuning ? "Fine-tuning your resume..." : "Generating your resume..."}
                      </p>
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
                          {isFinetuning ? "Fine-tuning..." : "Regenerating..."}
                        </>
                      ) : (
                        <>
                          <RefreshCw className="mr-2 h-4 w-4" />
                          {isFinetuning ? "Re-optimize Resume" : "Regenerate Resume"}
                        </>
                      )}
                    </Button>
                  </div>
                </div>

                {isFinetuning && (
                  <div className="space-y-2 border rounded-md p-3 bg-muted/10">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <WandSparkles className="mr-2 h-4 w-4 text-primary" />
                        <h4 className="text-md font-medium">Fine-Tuning Mode</h4>
                      </div>
                      
                      {matchScore !== null && (
                        <div className="flex items-center">
                          <span className={`text-xs font-medium ${
                            matchScore >= 80 ? 'text-green-500' : 
                            matchScore >= 60 ? 'text-amber-500' : 'text-red-500'
                          }`}>
                            {matchScore}% match
                          </span>
                          <div className="ml-2 w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full ${
                                matchScore >= 80 ? 'bg-green-500' : 
                                matchScore >= 60 ? 'bg-amber-500' : 'bg-red-500'
                              }`}
                              style={{ width: `${matchScore}%` }}
                            ></div>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <p className="text-xs text-muted-foreground">
                      Your existing resume has been optimized for this job description while maintaining its original essence.
                    </p>
                  </div>
                )}

                <div className="space-y-2">
                  <h4 className="text-lg font-medium">Template</h4>
                  <p className="text-sm text-muted-foreground">
                    {templates.find(t => t.id === selectedTemplate)?.name || "Selected Template"}
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="text-lg font-medium">Job Keywords</h4>
                  <div className="flex flex-wrap gap-1">
                    {matchedKeywords.length > 0 ? (
                      matchedKeywords.map((keyword, i) => (
                        <Badge key={i} variant="outline" className="bg-primary/10">
                          {keyword}
                        </Badge>
                      ))
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        No keywords extracted yet
                      </p>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    {isFinetuning 
                      ? "Your resume has been optimized to highlight these relevant skills and keywords."
                      : "Your resume includes these skills and keywords from the job description."}
                  </p>
                </div>

                {isFinetuning && (
                  <div className="space-y-2">
                    <h4 className="text-lg font-medium">Highlighted Changes</h4>
                    <div className="space-y-1 text-xs border rounded p-2 bg-muted/10">
                      <p>• Enhanced technical skills section to emphasize relevant technologies</p>
                      <p>• Rephrased work achievements to match job requirements</p>
                      <p>• Adjusted terminology to match industry standards from the job post</p>
                      <p>• Reordered sections to prioritize most relevant experience</p>
                    </div>
                  </div>
                )}
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
