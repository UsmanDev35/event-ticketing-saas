export default function EventCard({ event }) {
  const soldPercentage = Math.round(
    (event.ticketsSold / event.capacity) * 100
  );

  const progressBarColor =
    soldPercentage > 80 ? "bg-red-400" : "bg-teal-400";

  return (
    <div className="bg-white rounded-[24px] overflow-hidden shadow-sm hover:shadow-lg transition-all border border-gray-100 flex flex-col h-full">
      
      {/* Image */}
      <div className="relative h-[220px] w-full bg-gray-200">
        <img
          src={event.imageUrl}
          alt={event.title}
          className="w-full h-full object-cover"
        />

        {event.statusBadge && (
          <span className="absolute top-4 left-4 bg-orange-500 text-white text-xs font-bold px-4 py-2 rounded-full">
            {event.statusBadge}
          </span>
        )}

        <span className="absolute top-4 right-4 bg-slate-900 text-white text-xs font-bold px-4 py-2 rounded-full">
          {event.category}
        </span>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-[34px] font-bold text-gray-900 mb-3">
          {event.title}
        </h3>

        <div className="text-sm text-gray-500 mb-5 space-y-2">
          <div className="flex items-center gap-2">
            📅
            <span>{event.formattedDate}</span>
          </div>

          <div className="flex items-center gap-2">
            📍
            <span>{event.location}</span>
          </div>
        </div>

        <div className="flex-grow"></div>

        <div className="flex justify-between items-end mb-4">
          <div>
            <p className="text-xs text-gray-500">From</p>
            <p className="text-4xl font-extrabold text-gray-900">
              ${event.startingPrice}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="font-bold text-teal-400">
              ⭐ {event.rating}
            </div>

            <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-5 rounded-full text-sm">
              Buy Ticket
            </button>
          </div>
        </div>

        <div>
          <div className="w-full bg-gray-100 rounded-full h-2 mb-2">
            <div
              className={`${progressBarColor} h-2 rounded-full`}
              style={{ width: `${soldPercentage}%` }}
            />
          </div>

          <p className="text-xs text-gray-500">
            {soldPercentage}% sold
          </p>
        </div>
      </div>
    </div>
  );
}