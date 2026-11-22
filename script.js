const orderForm = document.querySelector("#order-form");
const productSelect = document.querySelector("#product");
const formNote = document.querySelector("#form-note");
const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector("#site-nav");

document.querySelectorAll(".order-trigger").forEach((button) => {
  button.addEventListener("click", () => {
    productSelect.value = button.dataset.product;
    document.querySelector("#order").scrollIntoView({ behavior: "smooth" });
    window.setTimeout(() => document.querySelector("#name").focus(), 450);
  });
});

menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  siteNav.classList.toggle("is-open", !isOpen);
});

siteNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuToggle.setAttribute("aria-expanded", "false");
    siteNav.classList.remove("is-open");
  });
});

orderForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!orderForm.reportValidity()) {
    return;
  }

  const data = new FormData(orderForm);
  const subject = `Заказ: ${data.get("product")}`;
  const message = [
    `Блокнот: ${data.get("product")}`,
    `Количество: ${data.get("quantity")}`,
    `Имя: ${data.get("name")}`,
    `Контакт: ${data.get("contact")}`,
    `Комментарий: ${data.get("note") || "нет"}`,
  ].join("\n");
  const mailto = `mailto:bloknot_dosug_avtor@mail.ru?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;

  formNote.textContent =
    "Открываем письмо. Проверьте данные и нажмите «Отправить» в почтовой программе — только после этого заказ будет отправлен.";
  window.location.href = mailto;
});

document.querySelector("#year").textContent = String(new Date().getFullYear());
