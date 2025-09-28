import { Linkedin, Facebook, Twitter, Instagram } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-primary-700 text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          <div className="flex items-center space-x-3">
            <div className="p-2">
              <img src="/logos/Smarttagx.png" alt="SmartTagX Logo" className="h-12 w-auto object-contain" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">SmartTagX</h3>
              <p className="text-sm text-white/80">SmartTagX AI — The Future of Intelligent Content Tagging</p>
            </div>
          </div>
          
          {/* Social Media Links */}
          <div className="flex flex-col gap-4">
            <div className="text-white/80">
              <p className="font-semibold mb-2">Social Media</p>
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
        
        <div className="border-t border-primary-800 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-white/80 text-sm">
            © 2025 SmartTagX. All rights reserved.
          </div>
          <div className="flex items-center space-x-2 text-white/80 text-sm">
            <span>Powered by</span>
            <a href="https://thoughtiv.com" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-1 text-white hover:text-primary-200 transition-colors font-semibold">
              <img src="/logos/Thoughtiv.png" alt="Thoughtiv Logo" className="h-5 w-auto object-contain" />
              <span>Thoughtiv</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
;
