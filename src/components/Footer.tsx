
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t bg-background/80 backdrop-blur-sm">
      <div className="container px-6 py-12 mx-auto">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">ResumeFabricator</h3>
            <p className="text-sm text-muted-foreground">
              Create tailored, professional resumes in seconds with our AI-powered resume generator.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Features</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/builder" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">
                  Resume Builder
                </Link>
              </li>
              <li>
                <Link to="/templates" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">
                  Templates
                </Link>
              </li>
              <li>
                <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">
                  AI Integration
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Resources</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">
                  Resume Tips
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">
                  Career Advice
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Company</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">
                  Privacy
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">
                  Terms
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 mt-8 border-t">
          <p className="text-xs text-center text-muted-foreground">
            © {new Date().getFullYear()} ResumeFabricator. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
