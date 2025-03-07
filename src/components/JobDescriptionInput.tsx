
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Upload } from "lucide-react";
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <AnimatedContainer animation="slide-up" className="w-full max-w-4xl mx-auto">
      <form onSubmit={handleSubmit}>
        <Card className="shadow-sm border bg-card">
          <CardContent className="pt-6">
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-xl font-medium tracking-tight">Fine-Tune Your Resume</h3>
                <p className="text-sm text-muted-foreground">
                  Upload your existing resume and a job description to tailor your resume for the specific role.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="existingResume">Your Existing Resume</Label>
                <div className="flex flex-col space-y-2">
                  <textarea
                    id="existingResume"
                    value={resumeText}
                    onChange={handleResumeTextChange}
                    placeholder="Paste your existing resume text here..."
                    className="w-full min-h-[200px] px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/25"
                  />
                  
                  <div className="flex items-center justify-center w-full">
                    <label
                      htmlFor="resumeFile"
                      className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed rounded-lg cursor-pointer bg-muted/30 hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex flex-col items-center justify-center pt-3 pb-3">
                        <Upload className="w-6 h-6 mb-1 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">
                          <span className="font-medium">Upload resume</span> or drag and drop
                        </p>
                        <p className="text-xs text-muted-foreground">
                          PDF, TXT, DOC, or DOCX (max. 2MB)
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
                  
                  {resumeFileName && (
                    <p className="text-xs text-muted-foreground">
                      Uploaded resume: {resumeFileName}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="jobDescription">Job Description</Label>
                <textarea
                  id="jobDescription"
                  value={description}
                  onChange={handleTextChange}
                  placeholder="Paste the job description here..."
                  className="w-full min-h-[200px] px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/25"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="jobDescriptionFile">Or upload job description</Label>
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="jobDescriptionFile"
                    className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed rounded-lg cursor-pointer bg-muted/30 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex flex-col items-center justify-center pt-3 pb-3">
                      <Upload className="w-6 h-6 mb-1 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        <span className="font-medium">Upload job description</span> or drag and drop
                      </p>
                      <p className="text-xs text-muted-foreground">
                        PDF, TXT, DOC, or DOCX (max. 2MB)
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

              <div className="flex justify-between">
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
