import { Badge } from "@/components/ui/badge";

export default function Footer() {
  return (
    <footer className="border-t py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="#features" 
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  data-testid="link-features"
                >
                  Features
                </a>
              </li>
              <li>
                <a 
                  href="#how-it-works" 
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  data-testid="link-how-it-works"
                >
                  How It Works
                </a>
              </li>
              <li>
                <a 
                  href="#api" 
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  data-testid="link-api"
                >
                  API Documentation
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="#privacy" 
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  data-testid="link-privacy"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a 
                  href="#terms" 
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  data-testid="link-terms"
                >
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Stats</h3>
            <Badge variant="secondary" className="text-base px-4 py-2" data-testid="badge-stats">
              50,000+ images analyzed
            </Badge>
          </div>
        </div>

        <div className="border-t pt-8 text-center text-sm text-muted-foreground">
          <p>© 2024 Deepfake Detector. Powered by Sightengine AI Technology.</p>
        </div>
      </div>
    </footer>
  );
}
