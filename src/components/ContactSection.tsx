import { Mail } from 'lucide-react';

export const ContactSection = () => {
  return (
    <section className="py-24 bg-background">
      <div className="max-w-4xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-primary-100 rounded-full border border-primary-200 mb-6">
            <Mail className="w-4 h-4 text-primary-700 mr-2" />
            <span className="text-sm font-medium text-secondary-700">Contact Us</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-secondary-900 mb-4">Get in touch</h2>
          <p className="text-lg text-secondary-600">
            We'd love to hear from you. Reach out using the details below.
          </p>
        </div>

        {/* Email Contact */}
        <div className="max-w-md mx-auto">
          <div className="border border-secondary-200 rounded-2xl p-6 bg-white">
            <div className="flex items-start">
              <div className="bg-primary-600 p-3 rounded-xl mr-4">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="text-secondary-900 font-semibold mb-1">Email</h4>
                <p className="text-secondary-700">hello@smarttagx.com</p>
                <p className="text-secondary-500 text-sm">We'll respond within 24 hours</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};