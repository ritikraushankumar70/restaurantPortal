"use client";

import { useState } from "react";
import CustomerLayout from "@/components/layout/CustomerLayout";
import { 
  MapPin, 
  Phone, 
  Mail, 
  MessageCircle, 
  Clock, 
  Store, 
  Send,
  HelpCircle,
  ChevronDown,
  Users
} from "lucide-react";

export default function ContactPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const faqs = [
    { q: "How long does delivery take?", a: "We strive to deliver your food to your doorstep within 30 minutes." },
    { q: "How will I get a refund?", a: "If an order is cancelled or fails, the refund is processed to the original payment method within 24-48 hours." },
    { q: "How can I cancel a table booking?", a: "You can cancel your booking from the 'Bookings & Enquiries' section up to 1 hour before the scheduled time." }
  ];

  const handleFormSubmit = (e: React.FormEvent, formName: string) => {
    e.preventDefault();
    if (formName === "Catering Enquiry") {
      const formData = new FormData(e.target as HTMLFormElement);
      const name = formData.get("name");
      const phone = formData.get("phone");
      const guests = formData.get("guests");
      
      if (typeof window !== 'undefined') {
        const bookings = JSON.parse(localStorage.getItem('myBookings') || '[]');
        const newBooking = {
          id: Math.random(),
          restaurant: "Catering & Events",
          date: "Awaiting Call from Restaurant",
          details: `${guests} Guests • Contact: ${name} (${phone})`,
          status: "Enquiry Sent"
        };
        localStorage.setItem('myBookings', JSON.stringify([newBooking, ...bookings]));
      }
      
      alert(`Enquiry submitted, we will connect with you as soon as possible.`);
      (e.target as HTMLFormElement).reset();
    } else {
      alert(`Enquiry submitted, we will connect with you as soon as possible.`);
      (e.target as HTMLFormElement).reset();
    }
  };

  return (
    <CustomerLayout>
      <div className="flex flex-col gap-12 pb-12">
        
        {/* 1. Top Heading */}
        <section className="text-center pt-8">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-lg text-orange-600 font-medium">Any issues with your order? We reply in 10 mins!</p>
        </section>

        {/* 5. Direct Action Buttons (Top Priority) */}
        <section className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-3xl mx-auto w-full">
          <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" 
             className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-lg shadow-sm transition-colors">
            <MessageCircle size={24} /> Chat on WhatsApp
          </a>
          <a href="tel:+919876543210" 
             className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-lg shadow-sm transition-colors">
            <Phone size={24} /> Call Now
          </a>
        </section>

        {/* 2 & 3. Contact Info + Form */}
        <section className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto w-full">
          
          {/* Left Side - Info */}
          <div className="flex flex-col gap-6">
            <a href="https://maps.google.com/?q=Vijay+Nagar,+Indore,+Madhya+Pradesh" target="_blank" rel="noopener noreferrer" className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4 hover:shadow-md transition-shadow cursor-pointer group">
              <div className="bg-orange-50 text-orange-600 p-3 rounded-full group-hover:bg-orange-100 transition-colors"><MapPin size={24} /></div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg mb-1 group-hover:text-orange-600 transition-colors">Our Address</h3>
                <p className="text-gray-600">Shop No. 12, Vijay Nagar,<br/>Indore, MP 452010</p>
              </div>
            </a>
            
            <a href="tel:+919876543210" className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4 hover:shadow-md transition-shadow cursor-pointer group">
              <div className="bg-blue-50 text-blue-600 p-3 rounded-full group-hover:bg-blue-100 transition-colors"><Phone size={24} /></div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg mb-1 group-hover:text-blue-600 transition-colors">Phone & WhatsApp</h3>
                <p className="text-gray-600 font-medium">+91 98765 43210</p>
              </div>
            </a>

            <a href="mailto:support@aapkaportal.com" className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4 hover:shadow-md transition-shadow cursor-pointer group">
              <div className="bg-purple-50 text-purple-600 p-3 rounded-full group-hover:bg-purple-100 transition-colors"><Mail size={24} /></div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg mb-1 group-hover:text-purple-600 transition-colors">Email Support</h3>
                <p className="text-gray-600">support@aapkaportal.com</p>
              </div>
            </a>

            {/* 6. Business Hours */}
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
              <h3 className="font-bold text-gray-900 flex items-center gap-2 mb-4">
                <Clock className="text-orange-500" size={20} /> Business Hours
              </h3>
              <div className="space-y-2 text-sm text-gray-700">
                <div className="flex justify-between border-b pb-2">
                  <span>Customer Support:</span>
                  <span className="font-bold">10 AM - 11 PM (Daily)</span>
                </div>
                <div className="flex justify-between pt-2">
                  <span>Delivery Hours:</span>
                  <span className="font-bold">11 AM - 11 PM</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Us A Message</h2>
            <form onSubmit={(e) => handleFormSubmit(e, "Customer Contact")} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                  <input required type="text" className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-orange-500" placeholder="Rahul Sharma" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mobile No. *</label>
                  <input required type="tel" className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-orange-500" placeholder="9876543210" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input type="email" className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-orange-500" placeholder="rahul@example.com" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject *</label>
                <div className="relative">
                  <select required className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-gray-900 focus:outline-none focus:border-orange-500 appearance-none">
                    <option value="" className="text-gray-400">Select an option</option>
                    <option value="Order Issue">Order Issue</option>
                    <option value="General Enquiry">General Enquiry</option>
                    <option value="Feedback/Complaint">Feedback/Complaint</option>
                    <option value="Tiffin Enquiry">Tiffin Enquiry</option>
                    <option value="Other">Other</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={16} />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message *</label>
                <textarea required rows={4} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-orange-500 resize-none" placeholder="Describe your query or issue here..."></textarea>
              </div>

              <button type="submit" className="w-full flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-lg font-bold transition-colors">
                <Send size={18} /> Submit Request
              </button>
            </form>
          </div>
        </section>

        {/* 4. Google Map Embed */}
        <section className="max-w-6xl mx-auto w-full">
          <div className="bg-white p-2 rounded-2xl shadow-sm border border-gray-100 h-96 overflow-hidden">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117763.55657421869!2d75.86472480000001!3d22.7195687!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962fcad1b410ddb%3A0x96ec4da356240f4!2sVijay%20Nagar%2C%20Indore%2C%20Madhya%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
              className="w-full h-full rounded-xl border-0" 
              allowFullScreen={false} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade">
            </iframe>
          </div>
        </section>

        {/* 7. For Catering & Events */}
        <section className="bg-orange-50 rounded-2xl p-8 max-w-4xl mx-auto w-full border border-orange-100 text-center">
          <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users size={32} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Book Catering & Events</h2>
          <p className="text-gray-600 mb-8 max-w-lg mx-auto">Experience our premium catering service for your weddings, parties, or corporate events!</p>
          
          <form onSubmit={(e) => handleFormSubmit(e, "Catering Enquiry")} className="flex flex-col md:flex-row gap-4 max-w-4xl mx-auto w-full">
            <div className="flex-1">
              <input name="name" required type="text" placeholder="Your Name" className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-orange-500 shadow-sm" />
            </div>
            <div className="flex-1">
              <input name="phone" required type="tel" placeholder="Phone No." className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-orange-500 shadow-sm" />
            </div>
            <div className="flex-1">
              <input name="guests" required type="number" placeholder="No. of Guests" className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-orange-500 shadow-sm" min="10" />
            </div>
            <button type="submit" className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-xl font-bold transition-colors whitespace-nowrap shadow-md flex items-center justify-center gap-2">
              Enquire Now
            </button>
          </form>
        </section>

        {/* 8. FAQ */}
        <section className="max-w-3xl mx-auto w-full pb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center justify-center gap-2">
            <HelpCircle className="text-orange-500" /> Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                <button 
                  className="w-full text-left px-6 py-4 font-bold text-gray-900 flex justify-between items-center bg-gray-50 hover:bg-gray-100 transition-colors"
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                >
                  {faq.q}
                  <ChevronDown className={`transition-transform ${activeFaq === index ? 'rotate-180' : ''}`} size={20} />
                </button>
                {activeFaq === index && (
                  <div className="px-6 py-4 text-gray-600 border-t border-gray-100">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

      </div>

      {/* Live Chat Button (WhatsApp) */}
      <div className="fixed bottom-6 right-6 z-50">
        <a 
          href="https://wa.me/919876543210"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 hover:bg-green-600 text-white w-14 h-14 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform relative group">
          <MessageCircle size={28} />
          <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>
          
          <div className="absolute right-full mr-4 bg-gray-900 text-white text-sm px-3 py-1.5 rounded shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            Chat on WhatsApp
          </div>
        </a>
      </div>
    </CustomerLayout>
  );
}
