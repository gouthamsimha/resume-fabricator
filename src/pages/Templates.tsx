
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import AnimatedContainer from "@/components/ui-utils/AnimatedContainer";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

// Template interface
interface Template {
  id: string;
  name: string;
  thumbnail: string;
  category: string;
  popular?: boolean;
}

// Sample templates data
const templates: Template[] = [
  {
    id: "minimal",
    name: "Minimal",
    thumbnail: "https://images.unsplash.com/photo-1586339949916-3e9457bef6d3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80",
    category: "Professional",
    popular: true,
  },
  {
    id: "professional",
    name: "Professional",
    thumbnail: "https://images.unsplash.com/photo-1594063596316-47f20c828b5b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80",
    category: "Professional",
    popular: true,
  },
  {
    id: "modern",
    name: "Modern",
    thumbnail: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2274&q=80",
    category: "Creative",
  },
  {
    id: "creative",
    name: "Creative",
    thumbnail: "https://images.unsplash.com/photo-1592992584424-bb6c1f4a7b03?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2274&q=80",
    category: "Creative",
    popular: true,
  },
  {
    id: "executive",
    name: "Executive",
    thumbnail: "https://images.unsplash.com/photo-1616531770192-6eaea74c2456?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
    category: "Professional",
  },
  {
    id: "academic",
    name: "Academic",
    thumbnail: "https://images.unsplash.com/photo-1656337663912-1ca33ef4a754?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2272&q=80",
    category: "Academic",
  },
  {
    id: "minimalist",
    name: "Minimalist",
    thumbnail: "https://images.unsplash.com/photo-1594063596316-47f20c828b5b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80",
    category: "Simple",
  },
  {
    id: "elegant",
    name: "Elegant",
    thumbnail: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2274&q=80",
    category: "Professional",
  },
  {
    id: "technical",
    name: "Technical",
    thumbnail: "https://images.unsplash.com/photo-1616531770192-6eaea74c2456?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
    category: "Technical",
  },
];

const Templates = () => {
  const navigate = useNavigate();
  
  // Get unique categories
  const categories = ["All", ...Array.from(new Set(templates.map(t => t.category)))];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow pt-24 pb-20">
        <div className="container px-6 mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <AnimatedContainer animation="slide-up" className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                Resume Templates
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Choose from our collection of professionally designed resume templates to make your application stand out.
              </p>
            </AnimatedContainer>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                className="px-4 py-2 rounded-full text-sm font-medium bg-muted hover:bg-muted/80 transition-colors"
              >
                {category}
              </button>
            ))}
          </div>

          {/* Popular Templates Section */}
          <section className="mb-16">
            <h2 className="text-2xl font-semibold mb-6">Popular Templates</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {templates
                .filter(t => t.popular)
                .map((template, index) => (
                  <AnimatedContainer
                    key={template.id}
                    animation="scale"
                    delay={index * 100}
                    className="group cursor-pointer"
                    onClick={() => navigate("/builder")}
                  >
                    <div className="rounded-lg overflow-hidden border hover-lift transition-all duration-300 h-full flex flex-col">
                      <div className="aspect-[3/4] bg-muted relative overflow-hidden">
                        <img
                          src={template.thumbnail}
                          alt={template.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
                      </div>
                      <div className="p-4 flex-grow">
                        <h3 className="font-medium">{template.name}</h3>
                        <p className="text-sm text-muted-foreground">{template.category}</p>
                      </div>
                      <div className="p-4 pt-0">
                        <Button size="sm" className="w-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          Use Template
                        </Button>
                      </div>
                    </div>
                  </AnimatedContainer>
                ))}
            </div>
          </section>

          {/* All Templates */}
          <section>
            <h2 className="text-2xl font-semibold mb-6">All Templates</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {templates.map((template, index) => (
                <AnimatedContainer
                  key={template.id}
                  animation="fade"
                  delay={index * 50}
                  className="group cursor-pointer"
                  onClick={() => navigate("/builder")}
                >
                  <div className="rounded-lg overflow-hidden border hover-lift transition-all duration-300 h-full flex flex-col">
                    <div className="aspect-[3/4] bg-muted relative overflow-hidden">
                      <img
                        src={template.thumbnail}
                        alt={template.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
                    </div>
                    <div className="p-4 flex-grow">
                      <h3 className="font-medium">{template.name}</h3>
                      <p className="text-sm text-muted-foreground">{template.category}</p>
                    </div>
                  </div>
                </AnimatedContainer>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="mt-20">
            <div className="bg-muted/30 rounded-2xl p-8 md:p-12 text-center max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Ready to create your resume?
              </h2>
              <p className="text-muted-foreground mb-8">
                Choose a template and let our AI help you create a tailored resume that gets you noticed.
              </p>
              <Button
                size="lg"
                onClick={() => navigate("/builder")}
              >
                Start Building <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Templates;
