import React, { useState } from 'react';

const blogsData = [
  {
    id: 1,
    category: "Buying Guide",
    title: "5 Essential Things to Check Before Buying a Used Laptop",
    date: "Oct 20, 2026",
    readTime: "5 min read",
    snippet: "Don't fall for cosmetic looks alone. Inspecting display panels, thermal throttling, and battery cycles can save you from a bad deal...",
    content: `When purchasing a pre-owned laptop, physical appearance is only 20% of the story. Here is a checklist to follow before paying:
    
    1. Display Test: Open a pure black and pure white background to check for dead pixels and backlight bleeding.
    2. Battery Cycle Count: Run 'powercfg /batteryreport' in Command Prompt (Windows) to check battery wear.
    3. Thermal & Stress Test: Run a 5-minute video render or heavy benchmark to listen for abnormal fan noises and thermal shutdowns.
    4. Port Verification: Test every USB port, HDMI jack, 3.5mm audio jack, and charging slot with a pen drive or cable.
    5. Keyboard & Trackpad: Use an online keyboard tester to confirm every single key operates smoothly.`
  },
  {
    id: 2,
    category: "Upgrades",
    title: "SSD vs HDD: How to Revival Speed on an Older Laptop",
    date: "Oct 18, 2026",
    readTime: "4 min read",
    snippet: "Replacing an outdated spinning mechanical hard drive with an M.2 NVMe or SATA SSD is the single best performance upgrade...",
    content: `If a 7th or 8th gen Intel laptop feels slow, the bottleneck is almost always the mechanical HDD rather than the processor.
    
    - Speed Difference: Standard HDDs read/write around 100 MB/s, while SATA SSDs reach 550 MB/s and NVMe SSDs hit 2000-3500 MB/s.
    - Battery Savings: SSDs have no moving parts, consuming significantly less power and running cooler.
    - Longevity: Drops and vibrations will ruin an active HDD platter, but SSDs survive bumps easily.`
  },
  {
    id: 3,
    category: "Battery & Care",
    title: "How to Measure Used Laptop Battery Health Correctly",
    date: "Oct 15, 2026",
    readTime: "3 min read",
    snippet: "A battery indicating 100% charge doesn't mean it retains full factory capacity. Here is how to check actual health...",
    content: `Lithium-ion batteries degrade over time through charge cycles. 
    
    - Full Charge Capacity vs. Design Capacity: Compare these two numbers in the battery report. If Design Capacity is 50,000 mWh but Full Charge Capacity is 25,000 mWh, the battery has degraded by 50%.
    - Charge Limiting: Use manufacturer software (like Lenovo Vantage, MyASUS, or Dell Power Manager) to cap maximum charge at 80% when plugged in continuously.`
  },
  {
    id: 4,
    category: "Buying Guide",
    title: "Processor Selection: Intel Core i5 vs i7 for Budget Shoppers",
    date: "Oct 10, 2026",
    readTime: "6 min read",
    snippet: "Is an older i7 always better than a newer i5? Demystifying CPU generations and model numbers for used laptops...",
    content: `A common myth is that an Intel Core i7 is always faster than a Core i5.
    
    - Generation Matters: A 10th Gen Core i5 processor easily outperforms an 7th Gen Core i7 in both single-core speed and multi-core productivity.
    - U vs H Series: 'U' series processors (e.g., i5-1135G7) prioritize battery saving, while 'H' series (e.g., i5-11400H) deliver high performance for gaming and high-end video editing.`
  }
];

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeBlog, setActiveBlog] = useState(null);

  const categories = ["All", "Buying Guide", "Upgrades", "Battery & Care"];

  const filteredBlogs = selectedCategory === "All" 
    ? blogsData 
    : blogsData.filter(blog => blog.category === selectedCategory);

  return (
    <div className="min-h-screen py-10 px-4 md:px-8 max-w-6xl mx-auto">
      
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-3 tracking-tight">
          Laptop Buying & <span className="text-cyan-400">Tech Guides</span>
        </h1>
        <p className="text-slate-400 text-sm md:text-base max-w-xl mx-auto">
          Expert recommendations, hardware upgrade advice, and inspection checklists for second-hand laptops.
        </p>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mt-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs md:text-sm font-medium transition-all duration-200 ${
                selectedCategory === cat
                  ? "bg-cyan-500 text-slate-950 font-bold shadow-lg shadow-cyan-500/20"
                  : "bg-slate-800/80 text-slate-300 hover:bg-slate-700 border border-slate-700/60"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Blog Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredBlogs.map((blog) => (
          <article 
            key={blog.id} 
            className="bg-slate-800/80 border border-slate-700/80 hover:border-cyan-500/50 rounded-2xl p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-500/10 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
                <span className="bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 px-3 py-1 rounded-full font-medium">
                  {blog.category}
                </span>
                <span>{blog.readTime}</span>
              </div>

              <h2 className="text-xl font-bold text-slate-100 mb-3 hover:text-cyan-400 transition-colors">
                {blog.title}
              </h2>

              <p className="text-slate-400 text-sm leading-relaxed mb-4">
                {blog.snippet}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-700/50 flex items-center justify-between text-xs text-slate-400">
              <span>{blog.date}</span>
              <button 
                onClick={() => setActiveBlog(blog)}
                className="text-cyan-400 font-semibold hover:underline flex items-center gap-1 cursor-pointer"
              >
                Read Article &rarr;
              </button>
            </div>
          </article>
        ))}
      </div>

      {/* Article Detail Modal */}
      {activeBlog && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex justify-center items-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 md:p-8 max-w-2xl w-full max-h-[85vh] overflow-y-auto text-slate-100 shadow-2xl relative">
            
            <button 
              onClick={() => setActiveBlog(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white bg-slate-800 rounded-full w-8 h-8 flex items-center justify-center border border-slate-700"
            >
              ✕
            </button>

            <span className="bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 px-3 py-1 rounded-full text-xs font-medium">
              {activeBlog?.category}
            </span>

            <h2 className="text-2xl md:text-3xl font-bold mt-4 mb-2 text-white">
              {activeBlog?.title}
            </h2>

            <div className="text-xs text-slate-400 mb-6 flex gap-4 border-b border-slate-800 pb-4">
              <span>{activeBlog?.date}</span>
              <span>•</span>
              <span>{activeBlog?.readTime}</span>
            </div>

            <div className="text-slate-300 text-sm md:text-base leading-relaxed whitespace-pre-line space-y-4">
              {activeBlog?.content}
            </div>

            <div className="mt-8 pt-4 border-t border-slate-800 flex justify-end">
              <button 
                onClick={() => setActiveBlog(null)}
                className="btn bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold border-none px-6 rounded-lg text-sm"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default Blog;