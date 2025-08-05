const debounce = (fn, delay) => {
  let id;
  console.log(id);
  return(...args) => {
    console.log(`previous id: ${id}`);
    if (id) clearTimeout(id);
    id = setTimeout(() => {
      fn(...args);
    }, 2000);
  }
}