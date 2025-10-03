import { Linkedin, Facebook, Twitter, Instagram } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-primary-700 text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          
          {/* Logo Section */}
          <div className="flex flex-col items-center md:items-start space-y-2">
          <img 
  src="/logos/Smarttagx.png" 
  alt="SmartTagX Logo" 
  className="h-16 w-auto object-contain bg-white/90 rounded-lg p-2 drop-shadow-md"
/>
            <p className="text-sm text-white/80 text-center md:text-left">
              The Future of Intelligent Content Tagging
            </p>
          </div>
          
          {/* Social Media Links */}
          <div className="flex flex-col gap-4">
            <div className="text-white/80">
              <p className="font-semibold mb-2">Follow Us!</p>
              <div className="flex space-x-4">
                <a href="https://www.linkedin.com/company/smarttagx/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="https://www.facebook.com/SmartTagX" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="https://x.com/SmartTagX" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="https://instagram.com/smarttagx" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>
            <div className="text-white/80">
              <p>Email: Support@Smarttagx.com</p>
            </div>
          </div>
        </div>
        
        {/* Footer Bottom */}
        <div className="border-t border-primary-800 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-white/80 text-sm">
              © {new Date().getFullYear()} SmartTagX. All rights reserved.
            </div>

            {/* Legal Links */}
            <div className="flex items-center space-x-6 text-sm">
              <a href="/terms" className="text-white/80 hover:text-white transition-colors">
                Terms & Conditions
              </a>
              <a href="/privacy" className="text-white/80 hover:text-white transition-colors">
                Privacy Policy
              </a>
            </div>

            <div className="flex items-center space-x-2 text-white/80 text-sm">
              <span>Powered by</span>
              <a href="https://thoughtiv.com" target="_blank" rel="noopener noreferrer">
                <img src="/logos/Thoughtiv.png" alt="Thoughtiv Logo" className="h-8 w-auto object-contain" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};