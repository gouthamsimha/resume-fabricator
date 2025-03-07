
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import AnimatedContainer from "./ui-utils/AnimatedContainer";

export interface Template {
  id: string;
  name: string;
  thumbnail: string;
}

interface TemplateGalleryProps {
  templates: Template[];
  selectedTemplate: string;
  onTemplateSelect: (templateId: string) => void;
  onNext: () => void;
  onBack: () => void;
}

const TemplateGallery = ({
  templates,
  selectedTemplate,
  onTemplateSelect,
  onNext,
  onBack,
}: TemplateGalleryProps) => {
  return (
    <AnimatedContainer animation="slide-up" className="w-full max-w-4xl mx-auto">
      <Card className="shadow-sm border bg-card">
        <CardContent className="pt-6">
          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-xl font-medium tracking-tight">Choose a Template</h3>
              <p className="text-sm text-muted-foreground">
                Select a professional template for your resume.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {templates.map((template) => (
                <div
                  key={template.id}
                  className={`relative rounded-lg overflow-hidden border-2 transition-all duration-200 hover-lift ${
                    selectedTemplate === template.id
                      ? "border-primary ring-2 ring-primary/20"
                      : "border-border hover:border-primary/50"
                  }`}
                  onClick={() => onTemplateSelect(template.id)}
                >
                  <div className="aspect-[3/4] bg-muted">
                    <img
                      src={template.thumbnail}
                      alt={template.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="p-2 text-center text-sm font-medium">
                    {template.name}
                  </div>

                  {selectedTemplate === template.id && (
                    <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full p-1">
                      <Check className="h-4 w-4" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="flex justify-between">
              <Button type="button" variant="outline" onClick={onBack}>
                Back
              </Button>
              <Button onClick={onNext} disabled={!selectedTemplate}>
                Generate Resume
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </AnimatedContainer>
  );
};

export default TemplateGallery;
