import CustomerLayout from "@/components/layout/CustomerLayout";
import { ChefHat, Truck, Utensils, Star, Heart } from 'lucide-react';
import Link from 'next/link';

export default function About() {
  return (
    <CustomerLayout>
      <div className="min-h-screen bg-gray-50 pt-20">
        {/* Hero Section */}
        <div className="relative bg-gray-900 text-white py-24 overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-20">
             <div className="w-full h-full bg-gradient-to-r from-gray-800 to-gray-900" />
          </div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tight">
              More Than Just <span className="text-orange-500">Food</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto font-medium">
              We are on a mission to deliver happiness to your doorstep with every single bite. Discover the story behind Indore's favorite eatery.
            </p>
          </div>
        </div>

        {/* Our Story */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl font-black text-gray-900 tracking-tight">Our Story</h2>
              <div className="w-20 h-1.5 bg-orange-500 rounded-full"></div>
              <p className="text-lg text-gray-600 leading-relaxed">
                Born out of a passion for authentic flavors and a desire to bring people together, Eatery started as a small kitchen with a big dream. We noticed that finding food that is both delicious and delivered piping hot was a challenge.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Today, we have grown into one of the most loved food delivery and dining experiences in the city. We believe that good food is the foundation of genuine happiness, and our chefs pour their hearts into every dish they create.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-orange-100 p-8 rounded-3xl flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-16 h-16 bg-orange-500 text-white rounded-full flex items-center justify-center">
                  <ChefHat size={32} />
                </div>
                <div>
                  <h3 className="text-3xl font-black text-gray-900">50+</h3>
                  <p className="text-orange-800 font-medium">Master Chefs</p>
                </div>
              </div>
              <div className="bg-gray-900 p-8 rounded-3xl flex flex-col items-center justify-center text-center space-y-4 mt-8">
                <div className="w-16 h-16 bg-gray-800 text-orange-500 rounded-full flex items-center justify-center">
                  <Heart size={32} />
                </div>
                <div>
                  <h3 className="text-3xl font-black text-white">1M+</h3>
                  <p className="text-gray-400 font-medium">Happy Customers</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="bg-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-black text-gray-900 tracking-tight mb-4">Why Choose Eatery?</h2>
              <p className="text-xl text-gray-500 max-w-2xl mx-auto">We don't just cook food; we craft experiences. Click below to learn more about our pillars of excellence.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Utensils size={32} className="text-white" />,
                  title: 'Premium Ingredients',
                  desc: 'We source only the freshest, highest quality ingredients from local farmers and trusted suppliers.',
                  color: 'bg-emerald-500',
                  href: '/quality'
                },
                {
                  icon: <Truck size={32} className="text-white" />,
                  title: 'Lightning Fast Delivery',
                  desc: 'Our advanced logistics ensure your food arrives piping hot and exactly when you expect it.',
                  color: 'bg-orange-500',
                  href: '/delivery'
                },
                {
                  icon: <Star size={32} className="text-white" />,
                  title: 'Award-winning Taste',
                  desc: 'Our recipes have been perfected over years, earning us numerous culinary awards in the region.',
                  color: 'bg-blue-600',
                  href: '/awards'
                }
              ].map((feature, idx) => (
                <Link href={feature.href} key={idx} className="block bg-gray-50 rounded-3xl p-8 hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-1 transform cursor-pointer group">
                  <div className={`w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-orange-500 transition-colors">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
                  <div className="mt-6 flex items-center text-sm font-bold text-orange-500 opacity-0 group-hover:opacity-100 transition-opacity">
                    Learn more <span className="ml-2">→</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </CustomerLayout>
  );
}
