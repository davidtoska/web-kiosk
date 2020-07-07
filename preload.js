console.log("preload script is running.");
const argsUrls = [...process.argv].filter((a) => a.includes("url="));
if (argsUrls.length === 1) {
  const url = argsUrls[0].split("=")[1].trim();
  console.log(url);
}
console.log(argsUrls);
console.log(process.argv);
