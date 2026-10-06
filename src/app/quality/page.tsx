import CustomerLayout from "@/components/layout/CustomerLayout";
import { Utensils, Leaf, ShieldCheck, HeartPulse } from 'lucide-react';

export default function QualityPage() {
  return (
    <CustomerLayout>
      <div className="min-h-screen bg-gray-50 pt-20 pb-24">
        {/* Header Section */}
        <div className="bg-gray-900 text-white py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-500/20 text-emerald-500 mb-6">
              <Utensils size={40} />
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">Premium Ingredients</h1>
            <p className="text-gray-300 text-xl font-medium max-w-2xl mx-auto">
              We believe that exceptional food starts with exceptional ingredients. 
              Discover our commitment to quality, sourcing, and hygiene.
            </p>
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-10 rounded-3xl shadow-lg border border-gray-100 flex flex-col items-center text-center hover:-translate-y-2 transition-transform duration-300">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-6">
                <Leaf size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Farm to Table</h3>
              <p className="text-gray-600 leading-relaxed">
                We partner with local organic farmers to bring you the freshest vegetables and ethically sourced meats directly to our kitchens daily.
              </p>
            </div>

            <div className="bg-white p-10 rounded-3xl shadow-lg border border-gray-100 flex flex-col items-center text-center hover:-translate-y-2 transition-transform duration-300">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
                <ShieldCheck size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Hygiene First</h3>
              <p className="text-gray-600 leading-relaxed">
                Our state-of-the-art kitchens maintain the highest international standards of cleanliness. We are certified 5-star for food safety.
              </p>
            </div>

            <div className="bg-white p-10 rounded-3xl shadow-lg border border-gray-100 flex flex-col items-center text-center hover:-translate-y-2 transition-transform duration-300">
              <div className="w-16 h-16 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center mb-6">
                <HeartPulse size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Healthy Choices</h3>
              <p className="text-gray-600 leading-relaxed">
                No artificial preservatives, no hidden MSG. Just pure, nutritious ingredients cooked perfectly to support your healthy lifestyle.
              </p>
            </div>
          </div>
          
          <div className="mt-16 bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-12 text-center">
            <h2 className="text-3xl font-black text-gray-900 mb-6">Our Sourcing Philosophy</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed mb-6">
              Great food begins at the source. At Eatery, we are relentlessly committed to finding the best ingredients. 
              We work closely with a handpicked network of local farmers, artisanal bakers, and trusted dairy producers 
              who share our passion for excellence. 
            </p>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Every morning, our chefs hand-select fresh produce to ensure vibrant flavors and optimal nutrition. 
              By prioritizing seasonal, organic ingredients and maintaining rigorous quality control at every step, 
              we guarantee that every dish we serve is not just a meal, but a masterpiece.
            </p>
          </div>
        </div>
      </div>
    </CustomerLayout>
  );
}
