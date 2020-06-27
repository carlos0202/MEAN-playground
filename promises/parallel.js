const firstPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve({friends: 500, likes: 1200});
  }, 1500);
});

const secondPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve({friends: 134, likes: 450});
  }, 2500);
});

Promise.race([firstPromise, secondPromise])
  .then(result => console.log(result))
  .catch(err => console.log(err.message));