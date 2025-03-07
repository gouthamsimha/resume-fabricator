
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Upload, FileText, WandSparkles } from "lucide-react";
import AnimatedContainer from "./ui-utils/AnimatedContainer";
import { extractTextFromResume } from "@/utils/resumeParser";
import { useToast } from "@/components/ui/use-toast";

interface JobDescriptionInputProps {
  jobDescription: string;
  onJobDescriptionChange: (description: string) => void;
  existingResume: string;
  onExistingResumeChange: (resumeText: string) => void;
  onNext: () => void;
  onBack: () => void;
}

const JobDescriptionInput = ({
  jobDescription,
  onJobDescriptionChange,
  existingResume,
  onExistingResumeChange,
  onNext,
  onBack,
}: JobDescriptionInputProps) => {
  const { toast } = useToast();
  const [description, setDescription] = useState(jobDescription);
  const [resumeText, setResumeText] = useState(existingResume);
  const [resumeFileName, setResumeFileName] = useState<string | null>(null);
  const [isFineTuning, setIsFineTuning] = useState(false);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
    onJobDescriptionChange(e.target.value);
  };

  const handleResumeTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setResumeText(e.target.value);
    onExistingResumeChange(e.target.value);
  };

  const handleJobDescFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      setDescription(content);
      onJobDescriptionChange(content);
      
      toast({
        title: "Job description uploaded",
        description: `Successfully loaded: ${file.name}`,
      });
    };
    reader.readAsText(file);
  };

  const handleResumeFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const content = await extractTextFromResume(file);
      setResumeText(content);
      setResumeFileName(file.name);
      onExistingResumeChange(content);
      
      toast({
        title: "Resume uploaded",
        description: `Successfully parsed resume: ${file.name}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to parse resume. Please try a different file format.",
        variant: "destructive",
      });
      console.error("Resume parse error:", error);
    }
  };

  const handleFineTune = () => {
    if (!description || !resumeText) {
      toast({
        title: "Missing information",
        description: "Please provide both a job description and your resume to fine-tune.",
        variant: "destructive",
      });
      return;
    }
    
    setIsFineTuning(true);
    
    // Simulate the fine-tuning process
    setTimeout(() => {
      setIsFineTuning(false);
      toast({
        title: "Resume fine-tuned",
        description: "Your resume has been optimized for this job description.",
      });
      onNext(); // Move to next step after fine-tuning
    }, 1500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  const canFineTune = description.trim().length > 0 && resumeText.trim().length > 0;

  return (
    <AnimatedContainer animation="slide-up" className="w-full max-w-4xl mx-auto">
      <form onSubmit={handleSubmit}>
        <Card className="shadow-sm border bg-card">
          <CardContent className="pt-6">
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-xl font-medium tracking-tight">Resume Fine-Tuner</h3>
                <p className="text-sm text-muted-foreground">
                  Optimize your existing resume for a specific job or create a new resume from scratch.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Column - Job Description */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <FileText className="h-5 w-5 text-primary" />
                    <h4 className="font-medium">Job Description</h4>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="jobDescription">Paste job description</Label>
                    <textarea
                      id="jobDescription"
                      value={description}
                      onChange={handleTextChange}
                      placeholder="Paste the job description here..."
                      className="w-full min-h-[250px] px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/25"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="jobDescriptionFile">Or upload job description</Label>
                    <div className="flex items-center justify-center w-full">
                      <label
                        htmlFor="jobDescriptionFile"
                        className="flex flex-col items-center justify-center w-full h-20 border-2 border-dashed rounded-lg cursor-pointer bg-muted/30 hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex flex-col items-center justify-center pt-3 pb-3">
                          <Upload className="w-5 h-5 mb-1 text-muted-foreground" />
                          <p className="text-sm text-muted-foreground">
                            <span className="font-medium">Upload</span> or drag and drop
                          </p>
                        </div>
                        <input
                          id="jobDescriptionFile"
                          type="file"
                          accept=".txt,.pdf,.doc,.docx"
                          className="hidden"
                          onChange={handleJobDescFileUpload}
                        />
                      </label>
                    </div>
                  </div>
                </div>

                {/* Right Column - Resume */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <FileText className="h-5 w-5 text-primary" />
                    <h4 className="font-medium">Your Resume</h4>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="existingResume">Paste your resume</Label>
                    <textarea
                      id="existingResume"
                      value={resumeText}
                      onChange={handleResumeTextChange}
                      placeholder="Paste your existing resume text here..."
                      className="w-full min-h-[250px] px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/25"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="resumeFile">Or upload your resume</Label>
                    <div className="flex items-center justify-center w-full">
                      <label
                        htmlFor="resumeFile"
                        className="flex flex-col items-center justify-center w-full h-20 border-2 border-dashed rounded-lg cursor-pointer bg-muted/30 hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex flex-col items-center justify-center pt-3 pb-3">
                          <Upload className="w-5 h-5 mb-1 text-muted-foreground" />
                          <p className="text-sm text-muted-foreground">
                            <span className="font-medium">Upload</span> or drag and drop
                          </p>
                        </div>
                        <input
                          id="resumeFile"
                          type="file"
                          accept=".txt,.pdf,.doc,.docx"
                          className="hidden"
                          onChange={handleResumeFileUpload}
                        />
                      </label>
                    </div>
                  </div>
                  
                  {resumeFileName && (
                    <p className="text-xs text-muted-foreground">
                      Uploaded resume: {resumeFileName}
                    </p>
                  )}
                </div>
              </div>

              {/* Fine-tune button */}
              <div className="flex flex-col items-center justify-center pt-4">
                <Button 
                  type="button" 
                  size="lg"
                  className="w-full md:w-auto"
                  disabled={!canFineTune || isFineTuning}
                  onClick={handleFineTune}
                >
                  {isFineTuning ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Fine-tuning...
                    </>
                  ) : (
                    <>
                      <WandSparkles className="mr-2 h-5 w-5" />
                      Fine-tune my resume for this job
                    </>
                  )}
                </Button>
                <p className="text-xs text-muted-foreground mt-2 text-center">
                  This will optimize your resume to match keywords from the job description while maintaining its essence.
                </p>
              </div>

              <div className="flex justify-between mt-6">
                <Button type="button" variant="outline" onClick={onBack}>
                  Back
                </Button>
                <Button type="submit">
                  Next: Choose Template
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </form>
    </AnimatedContainer>
  );
};

export default JobDescriptionInput;
