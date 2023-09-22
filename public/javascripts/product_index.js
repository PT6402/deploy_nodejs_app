console.log("product_index");
const block_filter = document.querySelector(".index_product_block_filter");
const inputFilter = block_filter.querySelectorAll(".inputFilter");
// inputFilter.forEach()
const formFilter = document.querySelector(".formFilter");
const btnClearFilter = formFilter.querySelector(".clearFilter");
const btnAllProduct = document.querySelector(".btn_allProduct");
const checkSearch = document.querySelector("div.search");
const data_search = checkSearch.dataset.search;
console.log(data_search);
if (data_search == undefined) {
  btnAllProduct.style.display = "none";
}
console.log(checkSearch);
const dataFilter = block_filter.dataset.filter;
if (dataFilter !== "") {
  inputFilter.forEach((item) => {
    if (item.value == dataFilter) {
      item.checked = true;
      item.parentElement.classList.add("checkedInput");
    }
  });
} else {
  btnClearFilter.style.display = "none";
}
console.log(dataFilter);
block_filter.addEventListener("click", (e) => {
  const inputFilterElement = e.target.querySelector(".inputFilter");
  inputFilterElement.checked = true;
  const parentInputFilterElement = inputFilterElement.parentElement;
  formFilter.submit();

  inputFilter.forEach((item) => {
    item.parentElement.classList.remove("checkedInput");
  });
  parentInputFilterElement.classList.add("checkedInput");
});
