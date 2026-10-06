"use client";

import { useState, useEffect } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Star, Search, Filter, MessageSquareReply, X, LayoutDashboard, ChevronRight } from "lucide-react";
import Link from "next/link";

const initialReviews = [
  { id: 1, customer: "Anjali Gupta", rating: 5, date: "2 days ago", comment: "The Butter Chicken was absolutely divine! Best in town.", reply: "Thank you for the wonderful feedback Anjali! We hope to serve you again soon." },
  { id: 2, customer: "Vikram Singh", rating: 4, date: "3 days ago", comment: "Good food but delivery was a bit late.", reply: null },
  { id: 3, customer: "Neha", rating: 2, date: "1 week ago", comment: "Paneer was too salty. Very disappointed.", reply: "Hi Neha, we apologize for the experience. Please share your order ID so we can make it up to you." },
];

export default function Reviews() {
  const [reviews, setReviews] = useState<any[]>(initialReviews);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedReviews = localStorage.getItem('myReviews');
      if (storedReviews) {
        try {
          const parsed = JSON.parse(storedReviews);
          const formatted = parsed.map((r: any) => ({
            id: r.id,
            customer: "Online Customer",
            rating: r.rating,
            date: r.date,
            comment: `[${r.title}] ${r.comment}`,
            reply: r.reply || null
          }));
          setReviews([...formatted, ...initialReviews]);
        } catch (e) {
          console.error(e);
        }
      }
    }
  }, []);

  const [searchQuery, setSearchQuery] = useState("");
  const [filterRating, setFilterRating] = useState<number | null>(null);

  const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);
  const [replyingTo, setReplyingTo] = useState<any>(null);
  const [replyText, setReplyText] = useState("");

  const filteredReviews = reviews.filter(r => {
    const matchesSearch = r.customer.toLowerCase().includes(searchQuery.toLowerCase()) || r.comment.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterRating === null ? true : r.rating === filterRating;
    return matchesSearch && matchesFilter;
  });

  const openReplyModal = (review: any) => {
    setReplyingTo(review);
    setReplyText(review.reply || "");
    setIsReplyModalOpen(true);
  };

  const handleReplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedReviews = reviews.map(r => r.id === replyingTo.id ? { ...r, reply: replyText } : r);
    setReviews(updatedReviews);

    if (typeof window !== 'undefined') {
      const storedReviews = localStorage.getItem('myReviews');
      if (storedReviews) {
        try {
          let parsed = JSON.parse(storedReviews);
          parsed = parsed.map((pr: any) => pr.id === replyingTo.id ? { ...pr, reply: replyText } : pr);
          localStorage.setItem('myReviews', JSON.stringify(parsed));
        } catch (e) { }
      }
    }

    setIsReplyModalOpen(false);
  };

  const averageRating = reviews.length > 0
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
    : "0.0";

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8 pb-12 max-w-7xl mx-auto">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
            <Link href="/" className="hover:text-orange-600 transition-colors flex items-center gap-1">
              <LayoutDashboard size={14} /> Dashboard
            </Link>
            <ChevronRight size={14} />
            <span className="text-gray-900 font-medium">Reviews</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Customer Reviews</h1>
              <p className="text-sm text-gray-500">View and respond to customer feedback.</p>
            </div>

            <div className="flex items-center gap-4 bg-white px-6 py-3 rounded-2xl border border-gray-100 shadow-sm">
              <div className="text-center">
                <span className="block text-2xl font-bold text-gray-900">{averageRating}</span>
                <span className="block text-xs text-gray-500">Average</span>
              </div>
              <div className="w-px h-8 bg-gray-200"></div>
              <div className="text-center">
                <span className="block text-2xl font-bold text-gray-900">{reviews.length}</span>
                <span className="block text-xs text-gray-500">Total Reviews</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-100 flex items-center justify-between">
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Search reviews..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-2 bg-gray-50 border-none rounded-xl outline-none focus:ring-1 focus:ring-orange-500 text-sm w-full transition-all text-black placeholder-gray-500"
              />
            </div>
            <select
              className="flex items-center gap-2 text-black bg-white px-3 py-1.5 rounded-lg hover:bg-gray-50 text-sm font-medium transition-colors border-none outline-none cursor-pointer"
              value={filterRating || ""}
              onChange={e => setFilterRating(e.target.value ? Number(e.target.value) : null)}
            >
              <option value="">All Ratings</option>
              <option value="5">5 Stars</option>
              <option value="4">4 Stars</option>
              <option value="3">3 Stars</option>
              <option value="2">2 Stars</option>
              <option value="1">1 Star</option>
            </select>
          </div>

          <div className="divide-y divide-gray-100">
            {filteredReviews.length === 0 ? (
              <div className="p-8 text-center text-gray-500">No reviews found matching your search.</div>
            ) : filteredReviews.map((review) => (
              <div key={review.id} className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-bold text-gray-900">{review.customer}</h3>
                    <span className="text-xs text-gray-400">{review.date}</span>
                  </div>
                  <div className="flex text-orange-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} fill={i < review.rating ? "currentColor" : "none"} className={i >= review.rating ? "text-gray-300" : ""} />
                    ))}
                  </div>
                </div>

                <p className="text-gray-700 text-sm mb-4">{review.comment}</p>

                {review.reply ? (
                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 ml-4 relative group">
                    <div className="absolute -left-2 top-4 w-4 h-4 bg-gray-50 border-l border-b border-gray-100 transform rotate-45"></div>
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-xs font-bold text-gray-900 block mb-1">Your Reply</span>
                        <p className="text-sm text-gray-600">{review.reply}</p>
                      </div>
                      <button onClick={() => openReplyModal(review)} className="text-xs text-orange-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                        Edit Reply
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <button onClick={() => openReplyModal(review)} className="flex items-center gap-1.5 text-orange-600 text-sm font-medium hover:bg-orange-50 px-3 py-1.5 rounded-lg transition-colors">
                      <MessageSquareReply size={16} /> Reply
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {isReplyModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Reply to {replyingTo?.customer}</h2>
              <button onClick={() => setIsReplyModalOpen(false)} className="text-gray-400 hover:text-gray-900 transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="p-6 bg-gray-50 text-sm text-gray-700 italic border-b border-gray-100">
              "{replyingTo?.comment}"
            </div>

            <form onSubmit={handleReplySubmit} className="p-6 flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Your Message</label>
                <textarea
                  required
                  rows={4}
                  value={replyText}
                  onChange={e => setReplyText(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 resize-none text-gray-900 bg-white"
                  placeholder="Type your reply here..."
                />
              </div>

              <div className="mt-2 flex gap-3">
                <button type="button" onClick={() => setIsReplyModalOpen(false)} className="flex-1 px-4 py-2 rounded-xl border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition-colors">
                  Cancel
                </button>
                <button type="submit" className="flex-1 px-4 py-2 rounded-xl bg-orange-600 text-white font-medium hover:bg-orange-700 transition-colors">
                  Send Reply
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
