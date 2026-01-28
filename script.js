// 名前をあとからJSで変えたい時用（デモ）
const nameElement = document.getElementById("name");

if (nameElement) {
  console.log("Welcome to", nameElement.textContent);
}
