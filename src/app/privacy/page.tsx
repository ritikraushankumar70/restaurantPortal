import CustomerLayout from "@/components/layout/CustomerLayout";
import { Lock, Eye, Database, Cookie, UserCheck, Clock } from 'lucide-react';

export default function PrivacyPolicy() {
  const lastUpdated = "October 1, 2026";

  return (
    <CustomerLayout>
      <div className="min-h-screen bg-gray-50 pt-20 pb-24">
        {/* Header Section */}
        <div className="bg-gray-900 text-white py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-500/20 text-blue-500 mb-6">
              <Lock size={32} />
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">Privacy Policy</h1>
            <p className="text-gray-400 text-lg">
              We value your privacy and are committed to protecting your personal data.
            </p>
            <div className="mt-8 inline-flex items-center gap-2 bg-gray-800 rounded-full px-4 py-2 text-sm text-gray-300">
              <Clock size={16} className="text-blue-500" />
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
                  <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                    <Database size={20} />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">1. Information We Collect</h2>
                </div>
                <div className="prose prose-gray max-w-none text-gray-600 space-y-4">
                  <p>
                    When you use Eatery, we may collect the following types of information to provide and improve our services:
                  </p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li><strong>Personal Data:</strong> Name, email address, phone number, and delivery address.</li>
                    <li><strong>Usage Data:</strong> Information on how you interact with our website, including IP addresses, browser types, and pages visited.</li>
                    <li><strong>Transaction Data:</strong> Details about payments and orders you have placed with us.</li>
                  </ul>
                </div>
              </section>

              {/* Section 2 */}
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                    <Eye size={20} />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">2. How We Use Your Data</h2>
                </div>
                <div className="prose prose-gray max-w-none text-gray-600 space-y-4">
                  <p>We use your personal data for the following purposes:</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>To process and deliver your food orders accurately.</li>
                    <li>To communicate with you regarding your order status or customer support inquiries.</li>
                    <li>To send promotional offers and updates (only if you have opted in).</li>
                    <li>To improve our website's functionality and user experience.</li>
                  </ul>
                </div>
              </section>

              {/* Section 3 */}
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                    <Cookie size={20} />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">3. Cookies & Tracking</h2>
                </div>
                <div className="prose prose-gray max-w-none text-gray-600 space-y-4">
                  <p>
                    We use cookies and similar tracking technologies to track activity on our service and hold certain information. Cookies are files with a small amount of data which may include an anonymous unique identifier.
                  </p>
                  <p>
                    You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our service (like keeping items in your cart).
                  </p>
                </div>
              </section>

              {/* Section 4 */}
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                    <UserCheck size={20} />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">4. Data Sharing & Security</h2>
                </div>
                <div className="prose prose-gray max-w-none text-gray-600 space-y-4">
                  <p>
                    We do not sell your personal data to third parties. We only share information with trusted third-party service providers (like payment processors and delivery partners) necessary to fulfill your order.
                  </p>
                  <p>
                    The security of your data is important to us, but remember that no method of transmission over the Internet is 100% secure. We strive to use commercially acceptable means to protect your personal data.
                  </p>
                </div>
              </section>

            </div>

            <div className="mt-16 pt-8 border-t border-gray-100">
              <p className="text-gray-500 text-sm text-center">
                For any privacy-related concerns or to request data deletion, please contact us at <a href="mailto:privacy@eatery.in" className="text-blue-600 font-medium hover:underline">privacy@eatery.in</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </CustomerLayout>
  );
}
