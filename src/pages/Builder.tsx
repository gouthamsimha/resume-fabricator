
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import ProfileForm, { ProfileData } from "@/components/ProfileForm";
import ExperienceForm, { Experience } from "@/components/ExperienceForm";
import EducationForm, { Education } from "@/components/EducationForm";
import JobDescriptionInput from "@/components/JobDescriptionInput";
import TemplateGallery, { Template } from "@/components/TemplateGallery";
import ResumePreview from "@/components/ResumePreview";

// Define steps for the form process
type FormStep = "profile" | "experience" | "education" | "jobDescription" | "template" | "preview";

// Mock template data
const TEMPLATES: Template[] = [
  {
    id: "minimal",
    name: "Minimal",
    thumbnail: "https://images.unsplash.com/photo-1586339949916-3e9457bef6d3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80",
  },
  {
    id: "professional",
    name: "Professional",
    thumbnail: "https://images.unsplash.com/photo-1594063596316-47f20c828b5b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80",
  },
  {
    id: "modern",
    name: "Modern",
    thumbnail: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2274&q=80",
  },
  {
    id: "creative",
    name: "Creative",
    thumbnail: "https://images.unsplash.com/photo-1592992584424-bb6c1f4a7b03?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2274&q=80",
  },
  {
    id: "executive",
    name: "Executive",
    thumbnail: "https://images.unsplash.com/photo-1616531770192-6eaea74c2456?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
  },
  {
    id: "academic",
    name: "Academic",
    thumbnail: "https://images.unsplash.com/photo-1656337663912-1ca33ef4a754?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2272&q=80",
  },
];

const Builder = () => {
  // State for the current step
  const [currentStep, setCurrentStep] = useState<FormStep>("profile");

  // State for form data
  const [profile, setProfile] = useState<ProfileData>({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    github: "",
    website: "",
    summary: "",
  });

  const [experiences, setExperiences] = useState<Experience[]>([
    {
      id: "exp-1",
      title: "",
      company: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
    },
  ]);

  const [education, setEducation] = useState<Education[]>([
    {
      id: "edu-1",
      institution: "",
      degree: "",
      field: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
    },
  ]);

  const [jobDescription, setJobDescription] = useState("");
  const [existingResume, setExistingResume] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("");

  // Navigation functions
  const goToStep = (step: FormStep) => {
    setCurrentStep(step);
    window.scrollTo(0, 0);
  };

  const resetForm = () => {
    setProfile({
      fullName: "",
      email: "",
      phone: "",
      location: "",
      linkedin: "",
      github: "",
      website: "",
      summary: "",
    });
    setExperiences([
      {
        id: "exp-1",
        title: "",
        company: "",
        location: "",
        startDate: "",
        endDate: "",
        current: false,
        description: "",
      },
    ]);
    setEducation([
      {
        id: "edu-1",
        institution: "",
        degree: "",
        field: "",
        location: "",
        startDate: "",
        endDate: "",
        current: false,
        description: "",
      },
    ]);
    setJobDescription("");
    setExistingResume("");
    setSelectedTemplate("");
    goToStep("profile");
  };

  // Render the appropriate form based on the current step
  const renderCurrentStep = () => {
    switch (currentStep) {
      case "profile":
        return (
          <ProfileForm
            profile={profile}
            onProfileChange={setProfile}
            onNext={() => goToStep("experience")}
          />
        );
      case "experience":
        return (
          <ExperienceForm
            experiences={experiences}
            onExperiencesChange={setExperiences}
            onNext={() => goToStep("education")}
            onBack={() => goToStep("profile")}
          />
        );
      case "education":
        return (
          <EducationForm
            education={education}
            onEducationChange={setEducation}
            onNext={() => goToStep("jobDescription")}
            onBack={() => goToStep("experience")}
          />
        );
      case "jobDescription":
        return (
          <JobDescriptionInput
            jobDescription={jobDescription}
            onJobDescriptionChange={setJobDescription}
            existingResume={existingResume}
            onExistingResumeChange={setExistingResume}
            onNext={() => goToStep("template")}
            onBack={() => goToStep("education")}
          />
        );
      case "template":
        return (
          <TemplateGallery
            templates={TEMPLATES}
            selectedTemplate={selectedTemplate}
            onTemplateSelect={setSelectedTemplate}
            onNext={() => goToStep("preview")}
            onBack={() => goToStep("jobDescription")}
          />
        );
      case "preview":
        return (
          <ResumePreview
            profile={profile}
            experiences={experiences}
            education={education}
            jobDescription={jobDescription}
            existingResume={existingResume}
            selectedTemplate={selectedTemplate}
            templates={TEMPLATES}
            onBack={() => goToStep("template")}
            onReset={resetForm}
          />
        );
      default:
        return <div>Unknown step</div>;
    }
  };

  // Progress indicators
  const steps = [
    { id: "profile", label: "Profile" },
    { id: "experience", label: "Experience" },
    { id: "education", label: "Education" },
    { id: "jobDescription", label: "Job Description" },
    { id: "template", label: "Template" },
    { id: "preview", label: "Preview" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow pt-24 pb-20 bg-muted/10">
        <div className="container px-6 mx-auto">
          {/* Progress Bar */}
          <div className="mb-8 max-w-4xl mx-auto">
            <div className="hidden md:flex justify-between items-center mb-4">
              {steps.map((step, index) => (
                <div
                  key={step.id}
                  className="flex flex-col items-center"
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                      currentStep === step.id
                        ? "bg-primary text-primary-foreground"
                        : steps.findIndex(s => s.id === currentStep) > index
                        ? "bg-primary/20 text-primary"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {index + 1}
                  </div>
                  <span
                    className={`text-xs font-medium ${
                      currentStep === step.id
                        ? "text-primary"
                        : "text-muted-foreground"
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
              ))}
            </div>
            <div className="w-full bg-muted rounded-full h-2 mb-2 md:hidden">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${((steps.findIndex(s => s.id === currentStep) + 1) / steps.length) * 100}%`,
                }}
              ></div>
            </div>
            <div className="flex justify-between md:hidden">
              <span className="text-xs text-muted-foreground">Profile</span>
              <span className="text-xs text-muted-foreground">Preview</span>
            </div>
          </div>

          {/* Form Steps */}
          {renderCurrentStep()}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Builder;
