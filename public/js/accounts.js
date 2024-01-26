// "use strict";

// const inpUsername = document.querySelector(".username-inp");
// const inpPassword = document.querySelector(".password-inp");
// const btnModalLogin = document.querySelector(".btn-modal-Login");
// const navItemSingup = document.querySelector(".sing-up-btn-cont");
// const shoingItems = document.querySelector(".shoping-items");

// /////
// const account1 = {
//   name: "Ayan Ghanta",
//   password: 1111,
//   cakes: [],
//   prices: [],
//   mail: "ayan@gmail.com",
// };

// const account2 = {
//   name: "Wrishita Mal",
//   password: 2222,
//   cakes: [],
//   prices: [],
//   mail: "Wrishita@mail.com",
// };
// const account3 = {
//   name: "Jecika Devis",
//   password: 3333,
//   cakes: [],
//   prices: [],
//   mail: "imjecika@mail.com",
// };
// const accounts = [account1, account2, account3];

// // ------------------------------------

// //GLOBAL VARIABLES
// let ValidUser;
// //--
// const createUserName = function (accs) {
//   accs.forEach((acc) => {
//     const userName = acc.name
//       .toLowerCase()
//       .split(" ")
//       .map((name) => name[0])
//       .join("");
//     //add to each accounts
//     acc.username = userName;
//   });
// };
// createUserName(accounts);

// const formatPrice = function (price) {
//   return new Intl.NumberFormat("en-US", {
//     style: "currency",
//     currency: "INR",
//   }).format(price);
// };
// const displayUserIcon = function (acc) {
//   singUpBtn.classList.add("hide");
//   const UserIconHtml = ` <li class="nav-item user-icon-cont">
//   <div>
//   <ion-icon name="person-circle-outline" class="user-icon"></ion-icon>
//   <p class="account-name">${acc.name.split(" ")[0]}</p>
//   </div>
//   <div >
//   <ion-icon name="cart" class="icon-cart"></ion-icon>
//   </div>
// </li>`;
//   navItemSingup.insertAdjacentHTML("beforeend", UserIconHtml);
// };
// const login = function (accs) {
//   ValidUser = accs.find(
//     (acc) => acc.username === inpUsername.value.toLowerCase()
//   );
//   if (ValidUser?.password === Number(inpPassword.value)) {
//     console.log("LOGIN !");

//     displayUserIcon(ValidUser);
//     closeModal();
//     inpUsername.value = "";
//     inpPassword.value = "";
//   } else console.log("NOT VALID USER !");
// };
// const AddToCart = function (event) {
//   const CakeName =
//     event.target.parentElement.parentElement.querySelector(
//       ".cake-title"
//     ).textContent;
//   const cakePrice =
//     event.target.parentElement.parentElement.querySelector(
//       ".cakePrice-value"
//     ).textContent;
//   if (singUpBtn.classList.contains("hide")) {
//     ValidUser.cakes.push(CakeName);
//     ValidUser.prices.push(+cakePrice);
//   } else alert("Login to Add items in cart 🛒");
// };
// // display shoing items list function
// const displayCart = function (acc) {
//   const cakes = acc.cakes;
//   const cakesPrices = acc.prices;
//   cakes.forEach((cake, i) => {
//     const shopListHtml = `<li class="shoping-item">${cake} <span class="shoping-item-price"> ${formatPrice(
//       cakesPrices[i]
//     )}</span></li>`;
//     shoingItems.insertAdjacentHTML("beforeend", shopListHtml);
//   });
//   document.querySelector(".total-price").textContent = formatPrice(
//     cakesPrices.reduce((acc, curr) => acc + curr, 0)
//   );
// };
// ////
// // //Fake login !!
// // displayUserIcon(account1);
// // ValidUser = account1;
// /////////////////////
// btnModalLogin.addEventListener("click", function (e) {
//   e.preventDefault();
//   login(accounts);
// });

// //implimenting add to cart functionality

// document
//   .querySelector(".all-flavour-carts")
//   .addEventListener("click", function (e) {
//     if (e.target.classList.contains("add-to-cart")) AddToCart(e);
//   });

// navItems.addEventListener("click", function (e) {
//   if (e.target.classList.contains("icon-cart")) {
//     displayCart(ValidUser);
//     headerEl.classList.add("shop-cart-open");
//   }
// });
// btnClosecart.addEventListener("click", function () {
//   headerEl.classList.remove("shop-cart-open");
//   // remove 0.5s
//   setTimeout(() => (shoingItems.innerHTML = ""), 500);
// });
