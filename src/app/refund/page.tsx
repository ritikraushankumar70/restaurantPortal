import CustomerLayout from "@/components/layout/CustomerLayout";
import { Banknote, RefreshCcw, XCircle, Clock, CheckCircle2 } from 'lucide-react';

export default function RefundPolicy() {
  const lastUpdated = "October 1, 2026";

  return (
    <CustomerLayout>
      <div className="min-h-screen bg-gray-50 pt-20 pb-24">
        {/* Header Section */}
        <div className="bg-gray-900 text-white py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-500 mb-6">
              <Banknote size={32} />
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">Refund Policy</h1>
            <p className="text-gray-400 text-lg">
              We want you to be completely satisfied with your Eatery experience.
            </p>
            <div className="mt-8 inline-flex items-center gap-2 bg-gray-800 rounded-full px-4 py-2 text-sm text-gray-300">
              <Clock size={16} className="text-emerald-500" />
              <span>Last Updated: {lastUpdated}</span>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-12">
            
            <div className="space-y-12">
              {/* Section 1 */}
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                    <XCircle size={20} />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">1. Order Cancellations</h2>
                </div>
                <div className="prose prose-gray max-w-none text-gray-600 space-y-4">
                  <p>
                    We understand that plans change. Here is how our cancellation process works:
                  </p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li><strong>Before Preparation:</strong> You may cancel your order for a full refund at any time before the restaurant has accepted and started preparing your food.</li>
                    <li><strong>After Preparation Begins:</strong> Once the kitchen has started preparing your order, we can no longer accept cancellations or provide refunds.</li>
                  </ul>
                </div>
              </section>

              {/* Section 2 */}
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                    <RefreshCcw size={20} />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">2. Eligible Refunds</h2>
                </div>
                <div className="prose prose-gray max-w-none text-gray-600 space-y-4">
                  <p>You may be eligible for a full or partial refund in the following scenarios:</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li><strong>Missing Items:</strong> If an item from your order is missing, we will refund the exact amount of the missing item.</li>
                    <li><strong>Incorrect Orders:</strong> If you receive an entirely wrong order, we will issue a full refund or send a replacement order immediately.</li>
                    <li><strong>Food Quality Issues:</strong> If the food is spoiled, burnt, or severely mishandled, please contact us within 30 minutes with a photo for a resolution.</li>
                  </ul>
                </div>
              </section>

              {/* Section 3 */}
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                    <CheckCircle2 size={20} />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">3. Processing Time</h2>
                </div>
                <div className="prose prose-gray max-w-none text-gray-600 space-y-4">
                  <p>
                    Once a refund is approved by our support team, it will be processed back to your original method of payment.
                  </p>
                  <p>
                    Please note that while we process refunds immediately on our end, it may take <strong>3 to 5 business days</strong> for the funds to appear in your bank account or on your credit card statement, depending on your financial institution.
                  </p>
                </div>
              </section>
            </div>

            <div className="mt-16 pt-8 border-t border-gray-100">
              <p className="text-gray-500 text-sm text-center">
                Need to request a refund? Contact our support team immediately at <a href="mailto:support@eatery.in" className="text-emerald-600 font-medium hover:underline">support@eatery.in</a> or via the app.
              </p>
            </div>
          </div>
        </div>
      </div>
    </CustomerLayout>
  );
}
