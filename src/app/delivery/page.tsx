import CustomerLayout from "@/components/layout/CustomerLayout";
import { Truck, Clock, Map, Package } from 'lucide-react';

export default function DeliveryPage() {
  return (
    <CustomerLayout>
      <div className="min-h-screen bg-gray-50 pt-20 pb-24">
        {/* Header Section */}
        <div className="bg-gray-900 text-white py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-orange-500/20 text-orange-500 mb-6">
              <Truck size={40} />
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">Lightning Fast Delivery</h1>
            <p className="text-gray-300 text-xl font-medium max-w-2xl mx-auto">
              Hot food, delivered exactly when you expect it. See how our advanced logistics make it happen.
            </p>
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-10 rounded-3xl shadow-lg border border-gray-100 flex flex-col items-center text-center hover:-translate-y-2 transition-transform duration-300">
              <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center mb-6">
                <Clock size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Under 30 Minutes</h3>
              <p className="text-gray-600 leading-relaxed">
                Our optimized routing algorithms and dedicated fleet ensure that 95% of our orders arrive well within our 30-minute promise.
              </p>
            </div>

            <div className="bg-white p-10 rounded-3xl shadow-lg border border-gray-100 flex flex-col items-center text-center hover:-translate-y-2 transition-transform duration-300">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
                <Map size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Wide Coverage</h3>
              <p className="text-gray-600 leading-relaxed">
                We cover the entire city of Indore. From Vijay Nagar to Rajwada, our delivery partners are always nearby.
              </p>
            </div>

            <div className="bg-white p-10 rounded-3xl shadow-lg border border-gray-100 flex flex-col items-center text-center hover:-translate-y-2 transition-transform duration-300">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-6">
                <Package size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Thermal Packaging</h3>
              <p className="text-gray-600 leading-relaxed">
                Your food stays piping hot or refreshingly cold thanks to our specialized thermal-sealed, spill-proof packaging technology.
              </p>
            </div>
          </div>
          
          <div className="mt-16 bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-12 text-center">
            <h2 className="text-3xl font-black text-gray-900 mb-6">Our Delivery Network</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed mb-6">
              Our delivery infrastructure is the backbone of our 30-minute promise. We operate a fleet of over 200 dedicated 
              delivery partners stationed strategically across Indore's major hubs. 
            </p>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Equipped with GPS-enabled routing software, our system automatically calculates the fastest path to your doorstep, 
              avoiding traffic bottlenecks. Combined with our heated thermal bags, we ensure your biryani arrives piping hot 
              and your cold beverages stay perfectly chilled, every single time.
            </p>
          </div>
        </div>
      </div>
    </CustomerLayout>
  );
}
