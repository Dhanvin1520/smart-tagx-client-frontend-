import Navigation from './Navigation';
import { Footer } from './Footer';

const PrivacyPolicy = () => {
  return (
    <>
      <Navigation />
      <div className="pt-20 min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <div className="mb-8">
              <img src="/logos/Smarttagx.png" alt="SmartTagX Logo" className="h-12 w-auto mb-6" />
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                SmartTagX AI – Privacy Policy
              </h1>
              <p className="text-gray-600">Effective Date: 01-10-2025</p>
            </div>

            <div className="prose prose-lg max-w-none text-gray-800">
              <p className="lead text-xl text-gray-700 mb-8">
                At SmartTagX AI, your privacy is important to us. This Privacy Policy explains how
                we collect, use, and protect your information when you use our platform. By using
                SmartTagX AI, you agree to the terms of this policy.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">1. Information We Collect</h2>
              <p>When you use SmartTagX AI, we may collect:</p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li><strong>Account Information:</strong> Name, email, company details, login credentials.</li>
                <li><strong>Usage Data:</strong> How you use our platform, tools accessed, and preferences.</li>
                <li><strong>Content Data:</strong> Keywords, website URLs, and other data you provide for SEO optimization.</li>
                <li><strong>Payment Information:</strong> Billing details for subscription or paid features.</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">2. How We Use Your Information</h2>
              <p>We use your information to:</p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>Provide and improve our AI tagging and SEO services.</li>
                <li>Customize and enhance your user experience.</li>
                <li>Send important updates, notifications, and promotional messages (you can opt out).</li>
                <li>Process payments and manage subscriptions.</li>
                <li>Comply with legal obligations.</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">3. Data Sharing</h2>
              <p>We do not sell your personal data. We may share information:</p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>With trusted service providers who help operate our platform.</li>
                <li>When required by law or legal processes.</li>
                <li>To protect our rights or safety of users.</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">4. Cookies and Tracking</h2>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>We use cookies and similar technologies to improve your experience.</li>
                <li>Cookies help us remember your preferences and usage patterns.</li>
                <li>You can manage or disable cookies through your browser settings.</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">5. Data Security</h2>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>We implement reasonable security measures to protect your data from unauthorized access or disclosure.</li>
                <li>However, no system is 100% secure, and we cannot guarantee absolute security.</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">6. Your Rights</h2>
              <p>You have the right to:</p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>Access, update, or correct your personal data.</li>
                <li>Request deletion of your account and data.</li>
                <li>Opt out of marketing communications.</li>
              </ul>
              <p className="mb-6">To exercise these rights, contact us at <a href="mailto:Support@thoughtiv.com" className="text-blue-600 hover:text-blue-800">Support@thoughtiv.com</a>.</p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">7. Retention of Data</h2>
              <p className="mb-6">We retain your data only as long as necessary to provide services or meet legal requirements.</p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">8. Third-Party Services</h2>
              <p className="mb-6">
                SmartTagX AI may integrate with third-party platforms (WordPress, Shopify, social media).
              </p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>We are not responsible for the privacy practices of these third parties.</li>
                <li>Please review their policies separately.</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">9. Children's Privacy</h2>
              <p className="mb-6">
                SmartTagX AI is not intended for children under 13. We do not knowingly collect data from children.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">10. Changes to This Policy</h2>
              <p className="mb-6">
                We may update this Privacy Policy from time to time. Major changes will be communicated via email or on our website.
                Continued use of SmartTagX AI constitutes acceptance of updated policies.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">11. Contact Us</h2>
              <p className="mb-6">
                If you have questions or concerns about your privacy, contact:
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

export default PrivacyPolicy;
