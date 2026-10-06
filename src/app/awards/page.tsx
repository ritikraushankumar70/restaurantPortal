import CustomerLayout from "@/components/layout/CustomerLayout";
import { Star, Trophy, Medal, Award } from 'lucide-react';

export default function AwardsPage() {
  return (
    <CustomerLayout>
      <div className="min-h-screen bg-gray-50 pt-20 pb-24">
        {/* Header Section */}
        <div className="bg-gray-900 text-white py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-500/20 text-blue-500 mb-6">
              <Star size={40} />
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">Award-winning Taste</h1>
            <p className="text-gray-300 text-xl font-medium max-w-2xl mx-auto">
              Our passion for flavor hasn't gone unnoticed. Explore the culinary awards and recognition we have earned.
            </p>
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-10 rounded-3xl shadow-lg border border-gray-100 flex flex-col items-center text-center hover:-translate-y-2 transition-transform duration-300">
              <div className="w-16 h-16 bg-yellow-100 text-yellow-600 rounded-2xl flex items-center justify-center mb-6">
                <Trophy size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Best Cloud Kitchen</h3>
              <p className="text-gray-600 leading-relaxed font-medium mb-2">Indore Food Awards 2025</p>
              <p className="text-gray-500 text-sm">
                Awarded for exceptional food quality, hygiene standards, and consistent customer satisfaction across the city.
              </p>
            </div>

            <div className="bg-white p-10 rounded-3xl shadow-lg border border-gray-100 flex flex-col items-center text-center hover:-translate-y-2 transition-transform duration-300">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
                <Medal size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Fastest Delivery</h3>
              <p className="text-gray-600 leading-relaxed font-medium mb-2">Logistics Excellence</p>
              <p className="text-gray-500 text-sm">
                Recognized for our innovative routing system and maintaining a 98% on-time delivery record.
              </p>
            </div>

            <div className="bg-white p-10 rounded-3xl shadow-lg border border-gray-100 flex flex-col items-center text-center hover:-translate-y-2 transition-transform duration-300">
              <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mb-6">
                <Award size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Chef of the Year</h3>
              <p className="text-gray-600 leading-relaxed font-medium mb-2">Culinary Guild</p>
              <p className="text-gray-500 text-sm">
                Our Executive Chef was honored for innovative recipe design and preserving authentic regional flavors.
              </p>
            </div>
          </div>
          
          <div className="mt-16 bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-12 text-center">
            <h2 className="text-3xl font-black text-gray-900 mb-6">What The Critics Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mt-8 text-left">
              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                <div className="flex text-yellow-400 mb-3">
                  <Star size={16} className="fill-yellow-400" /><Star size={16} className="fill-yellow-400" /><Star size={16} className="fill-yellow-400" /><Star size={16} className="fill-yellow-400" /><Star size={16} className="fill-yellow-400" />
                </div>
                <p className="text-gray-700 italic mb-4">"A masterclass in cloud kitchen operations. Eatery manages to deliver restaurant-quality fine dining straight to your living room without compromising on temperature or presentation."</p>
                <p className="text-sm font-bold text-gray-900">— The Daily Foodie</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                <div className="flex text-yellow-400 mb-3">
                  <Star size={16} className="fill-yellow-400" /><Star size={16} className="fill-yellow-400" /><Star size={16} className="fill-yellow-400" /><Star size={16} className="fill-yellow-400" /><Star size={16} className="fill-yellow-400" />
                </div>
                <p className="text-gray-700 italic mb-4">"Their commitment to hygiene and fresh ingredients is evident in every bite. Easily the most reliable and delicious delivery service operating in Indore right now."</p>
                <p className="text-sm font-bold text-gray-900">— Indore Times Food Review</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CustomerLayout>
  );
}
