import CustomerLayout from "@/components/layout/CustomerLayout";
import { Shield, FileText, CheckCircle2, AlertCircle, Clock } from 'lucide-react';

export default function Terms() {
  const lastUpdated = "October 1, 2026";

  return (
    <CustomerLayout>
      <div className="min-h-screen bg-gray-50 pt-20 pb-24">
        {/* Header Section */}
        <div className="bg-gray-900 text-white py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-orange-500/20 text-orange-500 mb-6">
              <Shield size={32} />
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">Terms & Conditions</h1>
            <p className="text-gray-400 text-lg">
              Please read these terms carefully before using our services.
            </p>
            <div className="mt-8 inline-flex items-center gap-2 bg-gray-800 rounded-full px-4 py-2 text-sm text-gray-300">
              <Clock size={16} className="text-orange-500" />
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
                  <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
                    <FileText size={20} />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">1. Agreement to Terms</h2>
                </div>
                <div className="prose prose-gray max-w-none text-gray-600 space-y-4">
                  <p>
                    By accessing or using Eatery's website, mobile application, or services, you agree to be bound by these Terms and Conditions. If you disagree with any part of the terms, then you may not access the service.
                  </p>
                  <p>
                    These Terms apply to all visitors, users, and others who access or use the Service.
                  </p>
                </div>
              </section>

              {/* Section 2 */}
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
                    <CheckCircle2 size={20} />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">2. Ordering and Delivery</h2>
                </div>
                <div className="prose prose-gray max-w-none text-gray-600 space-y-4">
                  <ul className="list-disc pl-5 space-y-2">
                    <li>All orders are subject to availability and confirmation of the order price.</li>
                    <li>Delivery times are estimates and may vary depending on traffic, weather, and restaurant preparation times.</li>
                    <li>You must provide a valid delivery address and contact number. We are not responsible for failed deliveries due to incorrect information.</li>
                  </ul>
                </div>
              </section>

              {/* Section 3 */}
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
                    <AlertCircle size={20} />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">3. Cancellations & Refunds</h2>
                </div>
                <div className="prose prose-gray max-w-none text-gray-600 space-y-4">
                  <p>
                    Orders can only be cancelled before the restaurant begins preparation. Once food preparation has started, cancellations are not permitted and no refunds will be issued.
                  </p>
                  <p>
                    If you receive incorrect or unsatisfactory food, please contact our support team within 30 minutes of delivery with photographic evidence for a resolution.
                  </p>
                </div>
              </section>

            </div>

            <div className="mt-16 pt-8 border-t border-gray-100">
              <p className="text-gray-500 text-sm text-center">
                For any questions regarding these terms, please contact us at <a href="mailto:support@eatery.in" className="text-orange-500 font-medium hover:underline">support@eatery.in</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </CustomerLayout>
  );
}
