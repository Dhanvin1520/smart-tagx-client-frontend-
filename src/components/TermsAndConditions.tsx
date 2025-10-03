import Navigation from './Navigation';
import { Footer } from './Footer';

const TermsAndConditions = () => {
  return (
    <>
      <Navigation />
      <div className="pt-20 min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <div className="mb-8">
              <img src="/logos/Smarttagx.png" alt="SmartTagX Logo" className="h-12 w-auto mb-6" />
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                SmartTagX AI – Terms and Conditions
              </h1>
              <p className="text-gray-600">Effective Date: 01-10-2025</p>
            </div>

            <div className="prose prose-lg max-w-none text-gray-800">
              <p className="lead text-xl text-gray-700 mb-8">
                Welcome to SmartTagX AI. By accessing or using our platform, you agree to be
                bound by the following terms and conditions. Please read them carefully.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">1. Acceptance of Terms</h2>
              <p className="mb-6">
                By using SmartTagX AI, you confirm that you have read, understood, and agreed to
                these Terms and Conditions, as well as our Privacy Policy. If you do not agree, you
                must not use our services.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">2. Description of Services</h2>
              <p className="mb-6">SmartTagX AI provides an AI-powered platform for:</p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>Intelligent keyword tagging and SEO optimization across websites and digital platforms.</li>
                <li>Integration with multiple frameworks including WordPress, HTML, Shopify, WhatsApp, Telegram, Facebook, Instagram, and X (formerly Twitter).</li>
                <li>Automation of tagging, meta descriptions, and SEO recommendations.</li>
              </ul>
              <p className="mb-6">
                <strong>Note:</strong> Traditional hashtag tools may not support all the platforms and features that SmartTagX AI does.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">3. User Responsibilities</h2>
              <p className="mb-6">By using SmartTagX AI, you agree to:</p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>Provide accurate and up-to-date information.</li>
                <li>Not misuse the platform or interfere with its operation.</li>
                <li>Comply with all applicable laws and regulations related to content tagging, SEO, and data usage.</li>
              </ul>
              <p className="mb-6">
                You acknowledge that misuse may result in suspension or termination of your account.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">4. Intellectual Property</h2>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>All content, algorithms, and technology used by SmartTagX AI are owned by Thoughtiv and are protected under copyright, trademark, and other intellectual property laws.</li>
                <li>Users may not reproduce, distribute, modify, or create derivative works from our platform without explicit written permission.</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">5. Limitations and Disclaimers</h2>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>SmartTagX AI strives to provide accurate SEO recommendations, but we cannot guarantee specific results.</li>
                <li>The platform currently does not support certain regional languages fully.</li>
                <li>Social media integrations may be limited until full implementation is complete.</li>
                <li>Users are responsible for compliance with third-party platform policies.</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">6. Privacy</h2>
              <p className="mb-6">
                Your data is governed by our Privacy Policy. By using SmartTagX AI, you consent to
                the collection, processing, and storage of your data as outlined in the Privacy Policy.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">7. Subscription and Payments</h2>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>Access to SmartTagX AI may require a subscription or payment plan.</li>
                <li>All payments are non-refundable unless otherwise stated.</li>
                <li>Thoughtiv reserves the right to modify pricing and payment terms with prior notice.</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">8. Termination</h2>
              <p className="mb-6">
                Thoughtiv reserves the right to suspend or terminate your access at any time,
                without notice, if:
              </p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>You violate these Terms and Conditions.</li>
                <li>Your use of the platform interferes with other users or platform operations.</li>
                <li>Legal obligations require termination.</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">9. Limitation of Liability</h2>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>SmartTagX AI is provided "as-is."</li>
                <li>Thoughtiv shall not be liable for any indirect, incidental, or consequential damages resulting from use or inability to use the platform.</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">10. Governing Law</h2>
              <p className="mb-6">
                These Terms and Conditions are governed by the laws of India/Telangana. Any
                disputes will be resolved in the competent courts of Hyderabad.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">11. Changes to Terms</h2>
              <p className="mb-6">
                Thoughtiv may update these Terms and Conditions periodically. Users will be notified
                of major changes, and continued use constitutes acceptance of updated terms.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">12. Contact</h2>
              <p className="mb-6">
                For questions or concerns regarding these Terms and Conditions, please contact:
              </p>
              <div className="bg-gray-50 rounded-lg p-6 mb-8">
                <p className="font-semibold text-gray-900 mb-2">Thoughtiv</p>
                <p>Email: <a href="mailto:Support@thoughtiv.com" className="text-blue-600 hover:text-blue-800">Support@thoughtiv.com</a></p>
                <p>Website: <a href="https://www.thoughtiv.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">www.thoughtiv.com</a></p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TermsAndConditions;
