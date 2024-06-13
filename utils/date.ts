export default function timeAgo(createdAt: string) {
  const currentTime: number = Date.now();
  const createdTime: number = Date.parse(createdAt);
  const diffInMs = currentTime - createdTime;
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInDays >= 1) {
    return `${diffInDays} day(s) ago`;
  } else if (diffInHours >= 1) {
    return `${diffInHours} hour(s) ago`;
  } else if (diffInMinutes >= 1) {
    return `${diffInMinutes} minutes ago`;
  } else return "Just now";
}
