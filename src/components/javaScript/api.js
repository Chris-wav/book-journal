const apiKey = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY;

export async function getBookData() {
  try {
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=SEARCH_TERM&key=${apiKey}`
    );
    if (!response.ok) {
      throw new Error("Network error: " + response.status);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Something went wrong");
  }
}

function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
}

export async function searchBook(input) {
  try {
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${input}&key=${apiKey}`
    );
    if (!response.ok) {
      throw new Error("Network problem:" + response.status);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Something went wrong ", error.message);
  }
}
