
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Upload, FileText, WandSparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedContainer from "@/components/ui-utils/AnimatedContainer";
import { Badge } from "@/components/ui/badge";
import { extractTextFromResume, extractKeywords, fineTuneResume } from "@/utils/resumeParser";
import { useToast } from "@/components/ui/use-toast";

const FineTuner = () => {
  const { toast } = useToast();
  const [jobDescription, setJobDescription] = useState("");
  const [resumeText, setResumeText] = useState("");
  const [fineTunedResume, setFineTunedResume] = useState("");
  const [isFineTuning, setIsFineTuning] = useState(false);
  const [resumeFileName, setResumeFileName] = useState<string | null>(null);
  const [jobDescFileName, setJobDescFileName] = useState<string | null>(null);
  const [matchedKeywords, setMatchedKeywords] = useState<string[]>([]);
  const [matchScore, setMatchScore] = useState<number | null>(null);
  const [showResults, setShowResults] = useState(false);

  const handleJobDescChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJobDescription(e.target.value);
  };

  const handleResumeTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setResumeText(e.target.value);
  };

  const handleJobDescFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      setJobDescription(content);
      setJobDescFileName(file.name);
      
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
    if (!jobDescription.trim() || !resumeText.trim()) {
      toast({
        title: "Missing information",
        description: "Please provide both a job description and your resume to fine-tune.",
        variant: "destructive",
      });
      return;
    }
    
    setIsFineTuning(true);
    
    // Extract keywords from job description
    const keywords = extractKeywords(jobDescription);
    setMatchedKeywords(keywords);
    
    // Calculate match score
    const resumeLower = resumeText.toLowerCase();
    const matchCount = keywords.filter(kw => resumeLower.includes(kw)).length;
    const matchPercent = Math.min(Math.round((matchCount / keywords.length) * 100), 95);
    setMatchScore(matchPercent);
    
    // Fine-tune the resume
    const optimizedResume = fineTuneResume(resumeText, jobDescription);
    setFineTunedResume(optimizedResume);
    
    // Simulate processing time
    setTimeout(() => {
      setIsFineTuning(false);
      setShowResults(true);
      
      toast({
        title: "Resume fine-tuned",
        description: "Your resume has been optimized for this job description.",
      });
    }, 1500);
  };

  const downloadFineTunedResume = () => {
    // Create a blob with the fine-tuned resume content
    const blob = new Blob([fineTunedResume], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    
    // Create an anchor element and trigger the download
    const a = document.createElement("a");
    a.href = url;
    a.download = "fine-tuned-resume.txt";
    document.body.appendChild(a);
    a.click();
    
    // Clean up
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Download started",
      description: "Your fine-tuned resume is being downloaded.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-20 bg-muted/10">
        <div className="container px-6 mx-auto">
          <AnimatedContainer animation="fade" className="max-w-4xl mx-auto mb-8">
            <h1 className="text-3xl font-bold tracking-tight mb-2">Resume Fine-Tuner</h1>
            <p className="text-muted-foreground">
              Optimize your existing resume for specific job descriptions by highlighting relevant skills and experience.
            </p>
          </AnimatedContainer>
          
          {!showResults ? (
            <AnimatedContainer animation="slide-up" className="w-full max-w-4xl mx-auto">
              <Card className="shadow-sm border bg-card">
                <CardContent className="pt-6">
                  <div className="space-y-6">
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
                            value={jobDescription}
                            onChange={handleJobDescChange}
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
                        
                        {jobDescFileName && (
                          <p className="text-xs text-muted-foreground">
                            Uploaded: {jobDescFileName}
                          </p>
                        )}
                      </div>

                      {/* Right Column - Resume */}
                      <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                          <FileText className="h-5 w-5 text-primary" />
                          <h4 className="font-medium">Your Resume</h4>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="resumeText">Paste your resume</Label>
                          <textarea
                            id="resumeText"
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
                            Uploaded: {resumeFileName}
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
                        disabled={!jobDescription.trim() || !resumeText.trim() || isFineTuning}
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
                  </div>
                </CardContent>
              </Card>
            </AnimatedContainer>
          ) : (
            <AnimatedContainer animation="scale" className="w-full max-w-4xl mx-auto">
              <Card className="shadow-sm border bg-card">
                <CardContent className="pt-6">
                  <div className="space-y-6">
                    <div className="flex items-center">
                      <div className="mr-2 bg-primary/10 rounded-full p-1">
                        <WandSparkles className="h-5 w-5 text-primary" />
                      </div>
                      <h3 className="text-xl font-medium tracking-tight">
                        Your Fine-Tuned Resume
                      </h3>
                    </div>

                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="w-full md:w-2/3 space-y-4">
                        <div className="border rounded-md p-4 bg-white min-h-[300px]">
                          <textarea
                            value={fineTunedResume}
                            onChange={(e) => setFineTunedResume(e.target.value)}
                            className="w-full min-h-[400px] resize-none focus:outline-none"
                          />
                        </div>
                        
                        <div className="flex justify-between">
                          <Button 
                            variant="outline" 
                            onClick={() => setShowResults(false)}
                          >
                            Go Back
                          </Button>
                          <Button onClick={downloadFineTunedResume}>
                            <Download className="mr-2 h-4 w-4" />
                            Download Resume
                          </Button>
                        </div>
                      </div>

                      <div className="w-full md:w-1/3 space-y-4">
                        <div className="space-y-2 border rounded-md p-3 bg-muted/10">
                          <div className="flex items-center justify-between">
                            <h4 className="text-md font-medium">Match Score</h4>
                            
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
                            The match score shows how well your resume matches the job description keywords.
                          </p>
                        </div>

                        <div className="space-y-2">
                          <h4 className="text-md font-medium">Job Keywords</h4>
                          <div className="flex flex-wrap gap-1">
                            {matchedKeywords.length > 0 ? (
                              matchedKeywords.map((keyword, i) => (
                                <Badge key={i} variant="outline" className="bg-primary/10">
                                  {keyword}
                                </Badge>
                              ))
                            ) : (
                              <p className="text-sm text-muted-foreground">
                                No keywords extracted
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <h4 className="text-md font-medium">Highlighted Changes</h4>
                          <div className="space-y-1 text-xs border rounded p-2 bg-muted/10">
                            <p>• Enhanced technical skills section to emphasize relevant technologies</p>
                            <p>• Rephrased work achievements to match job requirements</p>
                            <p>• Adjusted terminology to match industry standards from the job post</p>
                            <p>• Reordered sections to prioritize most relevant experience</p>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <h4 className="text-md font-medium">Fine-Tuning Tips</h4>
                          <ul className="space-y-1 text-xs p-2">
                            <li>• Review the changes and make any necessary adjustments</li>
                            <li>• Consider adding specific examples that demonstrate the highlighted skills</li>
                            <li>• Ensure your contact information is current and professional</li>
                            <li>• Proofread the final resume to catch any spelling or grammar errors</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </AnimatedContainer>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FineTuner;
