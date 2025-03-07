
// Resume parsing utility for extracting and processing resume content
export const extractTextFromResume = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      if (e.target?.result) {
        // For PDF and other complex formats, this is a simplified approach
        // In a production app, you'd want to use a dedicated PDF parsing library
        resolve(e.target.result.toString());
      } else {
        reject(new Error("Failed to read file"));
      }
    };
    
    reader.onerror = () => {
      reject(new Error("Error reading file"));
    };
    
    // Handle different file types
    if (file.type === 'application/pdf') {
      // For PDFs we're using a simple text extraction, but in production
      // you would use a PDF parsing library like pdf.js
      reader.readAsText(file);
    } else if (file.type === 'application/msword' || 
               file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      // For DOC/DOCX files, in production you would use a specific library
      // Here we're just doing basic text extraction
      reader.readAsText(file);
    } else {
      // For TXT and other simple formats
      reader.readAsText(file);
    }
  });
};

// Extract keywords from a job description for matching with a resume
export const extractKeywords = (text: string): string[] => {
  if (!text) return [];
  
  // A list of common skills and keywords found in job descriptions
  const commonKeywords = [
    "react", "javascript", "typescript", "node", "express", "html", "css",
    "python", "java", "c#", ".net", "aws", "azure", "gcp", "cloud",
    "developer", "engineer", "architect", "manager", "lead", "senior",
    "agile", "scrum", "kanban", "devops", "ci/cd", "git", "github",
    "database", "sql", "nosql", "mongodb", "postgresql", "mysql",
    "frontend", "backend", "fullstack", "mobile", "web", "app",
    "testing", "qa", "quality", "communication", "team", "leadership",
    "problem-solving", "analytical", "design", "ui/ux", "responsive",
    "performance", "optimization", "scalability", "security", "rest", "api",
    "microservices", "docker", "kubernetes", "jenkins", "terraform", "blockchain", 
    "machine learning", "ai", "data science", "analytics"
  ];
  
  // Extract words from job description and normalize
  const words = text.toLowerCase().match(/\b\w+\b/g) || [];
  
  // Find matching keywords
  return Array.from(new Set(
    words.filter(word => 
      commonKeywords.includes(word) || 
      commonKeywords.some(keyword => keyword.includes(word) && word.length > 3)
    )
  )).slice(0, 15); // Limit to top 15 matches
};

// Simple function to fine-tune a resume based on a job description
export const fineTuneResume = (resume: string, jobDescription: string): string => {
  // In a real implementation, this would use an AI service or more sophisticated logic
  // This is a simplified placeholder implementation
  
  const keywords = extractKeywords(jobDescription);
  
  // For demo purposes, we're just returning the original resume
  // In a real implementation, this would transform the resume to highlight relevant experiences
  return resume;
};
