// // src/pages/Marketplace/Marketplace.jsx
// export default function Marketplace() {
//   return (
//     <div className="p-10 text-center">
//       <h1 className="text-3xl font-bold">Marketplace Content Will Go Here</h1>
//     </div>
//   );
// }



// src/pages/Marketplace/Marketplace.jsx
import Hero from '../../components/specific/Hero';
import EventCard from '../../components/specific/EventCard';


// THE DATA CONTRACT:
// This represents exactly what the backend API will send us later via JSON.
const mockEvents = [
  {
    id: "evt_001",
    title: "Neon Nights Festival",
    category: "Music",
    statusBadge: "Trending",
    formattedDate: "Jul 12, 2026",
    location: "Madison Square Garden, NYC",
    startingPrice: 89,
    rating: 4.9,
    capacity: 10000,
    ticketsSold: 8400, // 84%
    // imageUrl: "https://images.unsplash.com/photo-1540039155732-680854537c5e?w=800&q=80"
    imageUrl:
"https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: "evt_002",
    title: "AI Summit 2026",
    category: "Tech",
    statusBadge: "New",
    formattedDate: "Aug 3, 2026",
    location: "Moscone Center, San Francisco",
    startingPrice: 299,
    rating: 4.7,
    capacity: 5000,
    ticketsSold: 3050, // 61%
    imageUrl: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&q=80"
  },
  {
    id: "evt_003",
    title: "Jazz & Blues Night",
    category: "Music",
    statusBadge: "Selling Fast",
    formattedDate: "Sep 5, 2026",
    location: "The Fillmore, Chicago",
    startingPrice: 45,
    rating: 4.8,
    capacity: 800,
    ticketsSold: 728, // 91%
    imageUrl: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=800&q=80"
  }
];

export default function Marketplace() {
  return (
    <div className="w-full pb-20">
      <Hero />
      
      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 mt-12">
        
        {/* Filter & Sort Bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          
          {/* Categories */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 w-full no-scrollbar">
            {/* Filter Icon */}
            <div className="text-gray-400 mr-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg>
            </div>
            {/* Active Pill */}
            <button className="bg-orange-500 text-white px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap">
              All
            </button>
            {/* Inactive Pills */}
            {['Music', 'Tech', 'Sports', 'Design', 'Food'].map(category => (
              <button key={category} className="bg-white border border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50 px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors">
                {category}
              </button>
            ))}
          </div>

        </div>

        {/* Results Count & Sort */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold text-gray-900">{mockEvents.length} events found</h2>
          <button className="text-sm text-gray-500 hover:text-gray-900 flex items-center gap-1">
            Sort: Date
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
          </button>
        </div>

        {/* Event Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* We map over the data contract to render the cards dynamically */}
          {mockEvents.map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>

      </div>
    </div>
  );
}

// export default function Marketplace() {
//   console.log("neon image =", neonNight);

//   return (
//     <div className="w-full pb-20">

//       <img
//         src={neonNight}
//         alt="test"
//         className="w-64 border-4 border-red-500"
//       />

//       <Hero />
//     </div>
//   );
// }