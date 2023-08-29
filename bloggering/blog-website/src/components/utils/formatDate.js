
function formatDate(timestamp) {
    const currentDate = new Date();
    const date = new Date(timestamp);
  
    const timeDifference = currentDate - date;
    const seconds = Math.floor(timeDifference / 1000);
  
    if (seconds < 60) {
      return `${seconds} sec ago`;
    } else if (seconds < 3600) {
      const minutes = Math.floor(seconds / 60);
      return `${minutes} min ago`;
    } else if (seconds < 86400) {
      const hours = Math.floor(seconds / 3600);
      return `${hours} hours ago`;
    } else if (seconds < 604800) {
      const days = Math.floor(seconds / 86400);
      return `${days} day(s) ago`;
    } else if (seconds < 2592000) {
      const weeks = Math.floor(seconds / 604800);
      return `${weeks} weeks ago`;
    } else {
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const hour = date.getHours();
      const minute = date.getMinutes();
      return `${year}/${month}/${day} ${hour}:${minute}`;
    }
  }

export default formatDate;