window.addEventListener("load", function() {
  document.body.classList.add("all-loaded");
});

eventListeners();

function eventListeners() {
  const ui = new UI();

  document.querySelector(".navBtn").addEventListener("click", function() {
    ui.showNav();
  });

  document.querySelector(".drink-form").addEventListener("submit", function(event) {
    event.preventDefault();
    const name = document.querySelector(".input-name").value;
    const lastName = document.querySelector(".input-lastname").value;
    const email = document.querySelector(".input-email").value;

    let value = ui.checkEmpty(name, lastName, email);

    if (value) {
      let customer = new Customer(name, lastName, email);
      console.log(customer);
      ui.addCustomer(customer);
      ui.showFeedback("custumer added to the list", "success");
      ui.clearFields();
    } else {
      ui.showFeedback("some form values empty", "error");
    }
  });

  const links = document.querySelectorAll(".work-item__icon");

  links.forEach(function(item) {
    item.addEventListener("click", function(event) {
      ui.showModal(event);
    });
  });

  document.querySelector(".work-modal__close").addEventListener("click", function() {
    ui.closeModal();
  });
}

//constructor function

function UI() {}

UI.prototype.showNav = function() {
  document.querySelector(".nav").classList.toggle("nav--show");
};

UI.prototype.checkEmpty = function(name, lastname, email) {
  let result;
  if (name === "" || lastname === "" || email === "") {
    result = false;
  } else {
    result = true;
  }
  return result;
};

UI.prototype.showFeedback = function(text, type) {
  const feedback = document.querySelector(".drink-form__feedback");
  if (type === "success") {
    feedback.classList.add("success");
    feedback.innerText = text;
    this.removeAlert("success");
  } else if (type === "error") {
    feedback.classList.add("error");
    feedback.innerText = text;
    this.removeAlert("error");
  }
};

UI.prototype.removeAlert = function(type) {
  setTimeout(function() {
    document.querySelector(".drink-form__feedback").classList.remove(type);
  }, 3000);
};

UI.prototype.addCustomer = function(customer) {
  const images = [1, 2, 3, 4, 5];
  let random = Math.floor(Math.random() * images.length);
  const div = document.createElement("div");
  div.classList.add("person");
  div.innerHTML = `<img src="img/person-${random}.jpeg" alt="person" class="person__thumbnail">
            <h4 class="person__name">${customer.name}</h4>
            <h4 class="person__last-name">${customer.lastname}</h4>`;
  document.querySelector(".drink-card__list").appendChild(div);
};

UI.prototype.clearFields = function() {
  document.querySelector(".input-name").value = "";
  document.querySelector(".input-lastname").value = "";
  document.querySelector(".input-email").value = "";
};

UI.prototype.showModal = function(event) {
  event.preventDefault();
  if (event.target.parentElement.classList.contains("work-item__icon")) {
    let id = event.target.parentElement.dataset.id;
    const modal = document.querySelector(".work-modal");
    const modalItem = document.querySelector(".work-modal__item");
    modal.classList.add("work-modal--show");
    modalItem.style.backgroundImage = `url(img/work-${id}.jpeg)`;
  }
};

UI.prototype.closeModal = function() {
  document.querySelector(".work-modal").classList.remove("work-modal--show");
};

function Customer(name, lastname, email) {
  (this.name = name), (this.lastname = lastname), (this.email = email);
}
