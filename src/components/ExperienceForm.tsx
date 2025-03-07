
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { X, Plus } from "lucide-react";
import AnimatedContainer from "./ui-utils/AnimatedContainer";

export interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

interface ExperienceFormProps {
  experiences: Experience[];
  onExperiencesChange: (experiences: Experience[]) => void;
  onNext: () => void;
  onBack: () => void;
}

const ExperienceForm = ({
  experiences,
  onExperiencesChange,
  onNext,
  onBack,
}: ExperienceFormProps) => {
  const [formData, setFormData] = useState<Experience[]>(experiences);

  const handleChange = (id: string, field: keyof Experience, value: string | boolean) => {
    const updatedExperiences = formData.map((exp) =>
      exp.id === id ? { ...exp, [field]: value } : exp
    );
    setFormData(updatedExperiences);
    onExperiencesChange(updatedExperiences);
  };

  const handleAddExperience = () => {
    const newExperience: Experience = {
      id: Date.now().toString(),
      title: "",
      company: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
    };
    const updatedExperiences = [...formData, newExperience];
    setFormData(updatedExperiences);
    onExperiencesChange(updatedExperiences);
  };

  const handleRemoveExperience = (id: string) => {
    const updatedExperiences = formData.filter((exp) => exp.id !== id);
    setFormData(updatedExperiences);
    onExperiencesChange(updatedExperiences);
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
                <h3 className="text-xl font-medium tracking-tight">Work Experience</h3>
                <p className="text-sm text-muted-foreground">
                  Add your relevant work experience to showcase your career journey.
                </p>
              </div>

              {formData.map((experience, index) => (
                <div key={experience.id} className="space-y-6 relative">
                  {index > 0 && <Separator className="my-8" />}
                  
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute -right-2 -top-2 h-8 w-8 rounded-full bg-muted hover:bg-muted/80"
                    onClick={() => handleRemoveExperience(experience.id)}
                  >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Remove</span>
                  </Button>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor={`title-${experience.id}`}>Job Title</Label>
                      <Input
                        id={`title-${experience.id}`}
                        value={experience.title}
                        onChange={(e) =>
                          handleChange(experience.id, "title", e.target.value)
                        }
                        placeholder="Software Engineer"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`company-${experience.id}`}>Company</Label>
                      <Input
                        id={`company-${experience.id}`}
                        value={experience.company}
                        onChange={(e) =>
                          handleChange(experience.id, "company", e.target.value)
                        }
                        placeholder="Acme Inc."
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`location-${experience.id}`}>Location</Label>
                      <Input
                        id={`location-${experience.id}`}
                        value={experience.location}
                        onChange={(e) =>
                          handleChange(experience.id, "location", e.target.value)
                        }
                        placeholder="San Francisco, CA"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`startDate-${experience.id}`}>Start Date</Label>
                        <Input
                          id={`startDate-${experience.id}`}
                          type="month"
                          value={experience.startDate}
                          onChange={(e) =>
                            handleChange(experience.id, "startDate", e.target.value)
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`endDate-${experience.id}`}>End Date</Label>
                        <Input
                          id={`endDate-${experience.id}`}
                          type="month"
                          value={experience.endDate}
                          onChange={(e) =>
                            handleChange(experience.id, "endDate", e.target.value)
                          }
                          disabled={experience.current}
                        />
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={`current-${experience.id}`}
                        checked={experience.current}
                        onChange={(e) =>
                          handleChange(experience.id, "current", e.target.checked)
                        }
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary/25"
                      />
                      <Label htmlFor={`current-${experience.id}`} className="text-sm">
                        I currently work here
                      </Label>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`description-${experience.id}`}>Description</Label>
                    <textarea
                      id={`description-${experience.id}`}
                      value={experience.description}
                      onChange={(e) =>
                        handleChange(experience.id, "description", e.target.value)
                      }
                      placeholder="Describe your responsibilities and achievements..."
                      className="w-full min-h-[120px] px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/25"
                    />
                  </div>
                </div>
              ))}

              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={handleAddExperience}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Experience
              </Button>

              <div className="flex justify-between">
                <Button type="button" variant="outline" onClick={onBack}>
                  Back
                </Button>
                <Button type="submit">
                  Next: Education
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </form>
    </AnimatedContainer>
  );
};

export default ExperienceForm;
