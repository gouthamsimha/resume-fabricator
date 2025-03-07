
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { X, Plus } from "lucide-react";
import AnimatedContainer from "./ui-utils/AnimatedContainer";

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

interface EducationFormProps {
  education: Education[];
  onEducationChange: (education: Education[]) => void;
  onNext: () => void;
  onBack: () => void;
}

const EducationForm = ({
  education,
  onEducationChange,
  onNext,
  onBack,
}: EducationFormProps) => {
  const [formData, setFormData] = useState<Education[]>(education);

  const handleChange = (id: string, field: keyof Education, value: string | boolean) => {
    const updatedEducation = formData.map((edu) =>
      edu.id === id ? { ...edu, [field]: value } : edu
    );
    setFormData(updatedEducation);
    onEducationChange(updatedEducation);
  };

  const handleAddEducation = () => {
    const newEducation: Education = {
      id: Date.now().toString(),
      institution: "",
      degree: "",
      field: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
    };
    const updatedEducation = [...formData, newEducation];
    setFormData(updatedEducation);
    onEducationChange(updatedEducation);
  };

  const handleRemoveEducation = (id: string) => {
    const updatedEducation = formData.filter((edu) => edu.id !== id);
    setFormData(updatedEducation);
    onEducationChange(updatedEducation);
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
                <h3 className="text-xl font-medium tracking-tight">Education</h3>
                <p className="text-sm text-muted-foreground">
                  Add your educational background to highlight your academic credentials.
                </p>
              </div>

              {formData.map((edu, index) => (
                <div key={edu.id} className="space-y-6 relative">
                  {index > 0 && <Separator className="my-8" />}
                  
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute -right-2 -top-2 h-8 w-8 rounded-full bg-muted hover:bg-muted/80"
                    onClick={() => handleRemoveEducation(edu.id)}
                  >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Remove</span>
                  </Button>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor={`institution-${edu.id}`}>Institution</Label>
                      <Input
                        id={`institution-${edu.id}`}
                        value={edu.institution}
                        onChange={(e) =>
                          handleChange(edu.id, "institution", e.target.value)
                        }
                        placeholder="Harvard University"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`degree-${edu.id}`}>Degree</Label>
                      <Input
                        id={`degree-${edu.id}`}
                        value={edu.degree}
                        onChange={(e) =>
                          handleChange(edu.id, "degree", e.target.value)
                        }
                        placeholder="Bachelor of Science"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`field-${edu.id}`}>Field of Study</Label>
                      <Input
                        id={`field-${edu.id}`}
                        value={edu.field}
                        onChange={(e) =>
                          handleChange(edu.id, "field", e.target.value)
                        }
                        placeholder="Computer Science"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`location-${edu.id}`}>Location</Label>
                      <Input
                        id={`location-${edu.id}`}
                        value={edu.location}
                        onChange={(e) =>
                          handleChange(edu.id, "location", e.target.value)
                        }
                        placeholder="Cambridge, MA"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`startDate-${edu.id}`}>Start Date</Label>
                        <Input
                          id={`startDate-${edu.id}`}
                          type="month"
                          value={edu.startDate}
                          onChange={(e) =>
                            handleChange(edu.id, "startDate", e.target.value)
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`endDate-${edu.id}`}>End Date</Label>
                        <Input
                          id={`endDate-${edu.id}`}
                          type="month"
                          value={edu.endDate}
                          onChange={(e) =>
                            handleChange(edu.id, "endDate", e.target.value)
                          }
                          disabled={edu.current}
                        />
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={`current-${edu.id}`}
                        checked={edu.current}
                        onChange={(e) =>
                          handleChange(edu.id, "current", e.target.checked)
                        }
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary/25"
                      />
                      <Label htmlFor={`current-${edu.id}`} className="text-sm">
                        I'm currently studying here
                      </Label>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`description-${edu.id}`}>Description</Label>
                    <textarea
                      id={`description-${edu.id}`}
                      value={edu.description}
                      onChange={(e) =>
                        handleChange(edu.id, "description", e.target.value)
                      }
                      placeholder="Additional information, achievements, GPA, etc..."
                      className="w-full min-h-[120px] px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/25"
                    />
                  </div>
                </div>
              ))}

              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={handleAddEducation}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Education
              </Button>

              <div className="flex justify-between">
                <Button type="button" variant="outline" onClick={onBack}>
                  Back
                </Button>
                <Button type="submit">
                  Next: Job Description
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </form>
    </AnimatedContainer>
  );
};

export default EducationForm;
