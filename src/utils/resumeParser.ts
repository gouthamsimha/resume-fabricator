
// Simple utility to extract text content from uploaded resume files
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
    
    reader.readAsText(file);
  });
};
