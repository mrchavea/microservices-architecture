const timer = async (myFunction) =>
  setTimeout(() => {
    myFunction();
  }, 3000);

const myPromise = new Promise((resolve, reject) => {
  return timer(() => resolve("Promise resolved"));
});

async function example() {
  await timer(() => console.log("await resolved"));
  console.log("despues de await");
}

function main() {
  example();
  myPromise.then((res) => console.log(res));
  console.log("codigo no bloqueado");
  myPromise.then((res) => {
    console.log("Second then");
    console.log(res);
  });
  myPromise.then(console.log("3rd promise then"));
}

main();
