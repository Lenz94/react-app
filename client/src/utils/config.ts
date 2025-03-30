export const API_URL = import.meta.env.VITE_API_URL;


export const formatMatchDate = (utcDate: string): string => {
    const matchDate = new Date(utcDate);
    const now = new Date();
  
    // Remove time part for accurate day comparisons
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const matchDay = new Date(matchDate.getFullYear(), matchDate.getMonth(), matchDate.getDate());
  
    const dayDifference = (matchDay.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);
  
    // Format time as HH:MM (24-hour format)
    const hours = matchDate.getHours().toString().padStart(2, "0");
    const minutes = matchDate.getMinutes().toString().padStart(2, "0");
    const timeString = `, ${hours}:${minutes}`;
  
    if (dayDifference === 0) {
      return `Today${timeString}`;
    } else if (dayDifference === 1) {
      return `Tomorrow${timeString}`;
    } else if (dayDifference === -1) {
      return `Yesterday${timeString}`;
    } else {
      // Format: "Mon, 7 Apr, 21:00"
      const options: Intl.DateTimeFormatOptions = {
        weekday: "short", // Mon, Tue, etc.
        day: "numeric", // 7, 15, etc.
        month: "short", // Apr, May, etc.
      };
      const formattedDate = matchDate
        .toLocaleDateString("en-GB", options)
        .replace(",", ""); // Remove comma from date format
  
      return `${formattedDate}${timeString}`;
    }
  };
  