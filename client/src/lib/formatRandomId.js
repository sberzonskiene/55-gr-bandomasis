export function formatRandomId() {
    const chars = "0123456789";
    const randomLength = 7;
    let random = "";
    for ( let i = 0; i < randomLength; i++ ) {
      const randomNum = Math.floor(Math.random()*chars.length);
      random += chars.charAt(randomNum);
    }
    return random;
}
console.log(formatRandomId(7));