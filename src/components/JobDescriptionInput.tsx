
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Upload } from "lucide-react";
import AnimatedContainer from "./ui-utils/AnimatedContainer";

interface JobDescriptionInputProps {
  jobDescription: string;
  onJobDescriptionChange: (description: string) => void;
  onNext: () => void;
  onBack: () => void;
}

const JobDescriptionInput = ({
  jobDescription,
  onJobDescriptionChange,
  onNext,
  onBack,
}: JobDescriptionInputProps) => {
  const [description, setDescription] = useState(jobDescription);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
    onJobDescriptionChange(e.target.value);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
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
                <h3 className="text-xl font-medium tracking-tight">Job Description</h3>
                <p className="text-sm text-muted-foreground">
                  Paste the job description or upload a file to tailor your resume to the specific role.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="jobDescription">Job Description</Label>
                <textarea
                  id="jobDescription"
                  value={description}
                  onChange={handleTextChange}
                  placeholder="Paste the job description here..."
                  className="w-full min-h-[300px] px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/25"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="jobDescriptionFile">Or upload a file</Label>
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="jobDescriptionFile"
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted/30 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        <span className="font-medium">Click to upload</span> or
                        drag and drop
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
                      onChange={handleFileUpload}
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
