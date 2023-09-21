const inputFile = document.querySelector(".inputFile");
const imageShow = document.querySelector(".imageShow");
const inputPrice = document.querySelector(".inputPrice");
let Url;
let dataImageShow = imageShow.dataset.image;
let valueOld = inputPrice.value;
inputPrice.onchange = () => {
  if (isNaN(inputPrice.value)) {
    inputPrice.value = 0;
    alert("enter number");
    if (valueOld) {
      inputPrice.value = valueOld;
    }
  }
};
if (dataImageShow !== "") {
  imageShow.setAttribute("src", `/uploads/${dataImageShow}`);
} else {
  inputFile.setAttribute("required", true);
}
inputFile.onchange = () => {
  const file = inputFile.files[0];
  Url = URL.createObjectURL(file);
  imageShow.setAttribute("src", Url);
};
window.addEventListener("locationchange", () => {
  URL.revokeObjectURL(Url);
});
