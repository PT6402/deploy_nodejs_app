const inputCheckbox = document.querySelector("#my-toggle");
const inputHiddenCheckbox = document.querySelector("#hiddenStatus_product");
inputCheckbox.onchange = () => {
  const check = inputCheckbox.checked;
  inputCheckbox.setAttribute("value", check);
  if (check) {
    inputHiddenCheckbox.disabled = true;
  } else {
    inputHiddenCheckbox.disabled = false;
  }
};
