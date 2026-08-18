import star from "../assets/star.png";
import type { CardProps } from "../types/card";

function Card({
  coverImg,
  stats,
  location,
  title,
  price,
  openSpots,
}: CardProps) {
  // Function to determine the badge text and color based on openSpots and location
  function getBadgeText() {
    if (openSpots === 0) {
      return { badgeText: "SOLD OUT", textColor: "text-red-500" };
    } else if (location === "Online") {
      return { badgeText: "ONLINE", textColor: "text-blue-500" };
    }
    return { badgeText: "", textColor: "" };
  }

  return (
    <div className="card max-w-43.75 bg-white rounded-lg ring-1 ring-gray-200 shadow-md p-2 shrink-0">
      {getBadgeText().badgeText && (
        <div
          className={`card-badge absolute bg-white ${getBadgeText().textColor} font-bold text-xs px-2 py-1 rounded-md mt-1 ml-0.75 shadow-md`}
        >
          {getBadgeText().badgeText}
        </div>
      )}
      <img
        src={coverImg}
        alt={title}
        className="card-img h-62.5 w-full rounded-lg object-cover"
      />
      <div className="card-info space-y-2 mt-2.25">
        <div className="flex items-center">
          <img src={star} alt="Star" className="card-star h-3.5" />
          <span className="card-rating ml-1">{stats.rating}</span>
          <span className="card-reviewCount text-[#918E9B]">
            ({stats.reviewCount}) •{" "}
          </span>
          <span className="card-location ml-1 text-[#918E9B]">{location}</span>
        </div>
        <p className="card-title text-sm">{title}</p>
        <p className="card-price">
          <span className="font-bold">From ${price}</span> / person
        </p>
      </div>
    </div>
  );
}

export default Card;
