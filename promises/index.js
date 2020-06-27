const call = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve({ id: 1, company: "SEAT", model: "Panda" });
    //reject(new Error("An error has ocurred while reading the database."));
  }, 2000);
});

call
  .then(result => console.log(result))
  .catch(err => console.log(err.message));