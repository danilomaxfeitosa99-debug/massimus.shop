(() => {
  const timeKey = "atlas-north-deadline";
  const spotsKey = "atlas-north-spots";
  const savedDeadline = Number(sessionStorage.getItem(timeKey));
  const deadline = savedDeadline > Date.now() - 60000 ? savedDeadline : Date.now() + 18 * 60000;
  let spots = Number(sessionStorage.getItem(spotsKey)) || 17;
  sessionStorage.setItem(timeKey, String(deadline));

  const paintUrgency = () => {
    const left = Math.max(0, Math.floor((deadline - Date.now()) / 1000));
    const time = `${String(Math.floor(left / 60)).padStart(2, "0")}:${String(left % 60).padStart(2, "0")}`;
    document.querySelectorAll("[data-time]").forEach((node) => { node.textContent = time; });
    document.querySelectorAll("[data-spots]").forEach((node) => { node.textContent = String(spots); });
  };

  paintUrgency();
  setInterval(paintUrgency, 1000);
  setInterval(() => {
    if (spots <= 4) return;
    spots -= 1;
    sessionStorage.setItem(spotsKey, String(spots));
    paintUrgency();
  }, 48000);

  const phone = document.querySelector('[name="phone"]');
  phone.addEventListener("input", () => {
    const digits = phone.value.replace(/\D/g, "").slice(0, 10);
    if (digits.length <= 3) phone.value = digits;
    else if (digits.length <= 6) phone.value = `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    else phone.value = `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  });

  const form = document.querySelector("#apply");
  const errors = {
    name: "Enter your full name.",
    phone: "Enter a valid U.S. mobile number.",
    email: "Enter a valid email."
  };

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const values = Object.fromEntries(new FormData(form).entries());
    const valid = {
      name: String(values.name).trim().length >= 3,
      phone: String(values.phone).replace(/\D/g, "").length === 10,
      email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(values.email))
    };

    Object.entries(valid).forEach(([name, ok]) => {
      const input = form.elements[name];
      input.parentElement.classList.toggle("field-error", !ok);
      input.parentElement.querySelector("small").textContent = ok ? "" : errors[name];
    });
    if (!Object.values(valid).every(Boolean)) return;

    localStorage.setItem("atlas-north-lead", JSON.stringify({
      ...values,
      phone: String(values.phone).replace(/\D/g, ""),
      at: new Date().toISOString()
    }));
    location.hash = "applied";
  });

  const route = () => {
    const applied = location.hash === "#applied";
    document.querySelector("#home-page").hidden = applied;
    const thanks = document.querySelector("#thanks-page");
    thanks.hidden = !applied;
    thanks.style.display = applied ? "grid" : "none";
    if (applied) scrollTo(0, 0);
  };

  addEventListener("hashchange", route);
  route();
})();
