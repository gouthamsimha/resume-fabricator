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
  if (!resume || !jobDescription) return resume;
  
  // Extract keywords from job description
  const keywords = extractKeywords(jobDescription);
  
  // In a real implementation, this would use an AI service or more sophisticated logic
  // For this demo, we'll implement a simple keyword-based enhancement
  
  // Split resume into sections
  const sections = resume.split(/\n\n+/);
  
  // Process each section to potentially enhance it with keywords
  const enhancedSections = sections.map(section => {
    // Skip enhancing contact info section
    if (section.includes('@') && section.includes('.com')) {
      return section;
    }
    
    // For skills section, ensure all relevant keywords are included
    if (section.toLowerCase().includes('skills') || 
        section.toLowerCase().includes('expertise') || 
        section.toLowerCase().includes('technical')) {
      
      // Find which keywords from job description are missing in this section
      const sectionLower = section.toLowerCase();
      const missingKeywords = keywords.filter(kw => !sectionLower.includes(kw));
      
      // If there are missing relevant keywords, add them
      if (missingKeywords.length > 0) {
        const keywordsToAdd = missingKeywords.slice(0, 3).join(', '); // Limit to 3 additions
        if (section.includes(':')) {
          // If section has a format like "Skills: x, y, z"
          return section.replace(/:(.*)/s, `: $1, ${keywordsToAdd}`);
        } else {
          // Otherwise just append
          return `${section}, ${keywordsToAdd}`;
        }
      }
    }
    
    return section;
  });
  
  // Join the sections back together
  return enhancedSections.join('\n\n');
};
