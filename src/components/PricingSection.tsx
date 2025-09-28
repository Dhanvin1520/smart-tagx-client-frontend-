import { Clock } from 'lucide-react';

export const PricingSection = () => {
  return (
    <div className="py-24 bg-white">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-slate-100 mb-6">
          <Clock className="w-8 h-8 text-slate-600" />
        </div>
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Pricing is coming soon</h2>
        <p className="text-lg text-gray-600 mb-8">
          We’re refining plans that match how you actually use SmartTagX. Until then, enjoy generating smart, contextual tags.
        </p>

      </div>
    </div>
  );
};