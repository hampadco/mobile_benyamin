document.addEventListener("DOMContentLoaded", function () {
  /* ========= Reusable Functions Start =========== */
  //  modal toggle function

  function modalToggle(modalName, modalBox, open, close) {
    modalName.addEventListener("click", () => {
      if (modalBox.classList.contains(open)) {
        modalBox.classList.remove(open);
        modalBox.classList.add(close);
        document.removeEventListener("click", closeDropdownOutside);
      } else {
        modalBox.classList.add(open);
        modalBox.classList.remove(close);
        document.addEventListener("click", closeDropdownOutside);
      }

      function closeDropdownOutside(event) {
        const isClickedInsideDropdown = modalBox.contains(event.target);
        const isClickedOnDropdownBtn = modalName.contains(event.target);

        if (!isClickedInsideDropdown && !isClickedOnDropdownBtn) {
          modalBox.classList.add(close);
          modalBox.classList.remove(open);
          document.removeEventListener("click", closeDropdownOutside);
        }
      }
    });
  }

  //create tab resubale function
  function createTab(tabName, activeButtonClassList, inactiveButtonClassList) {
    const tabButtons = tabName?.querySelectorAll(".tab-item");

    if (tabButtons) {
      tabButtons.forEach((button) => {
        button.addEventListener("click", () => {
          const tabNameText = button.innerText
            .toLowerCase()
            .replace(/\s+/g, "-")
            .trim();
          tabButtons.forEach((otherButton) => {
            const otherTabName = otherButton.innerText
              .toLowerCase()
              .replace(/\s+/g, "-")
              .trim();

            activeButtonClassList.forEach((className) => {
              otherButton.classList.toggle(
                className,
                tabNameText === otherTabName,
              );
            });

            inactiveButtonClassList.forEach((className) => {
              otherButton.classList.toggle(
                className,
                tabNameText !== otherTabName,
              );
            });

            const otherTabContent = tabName.querySelector(`#${otherTabName}`);

            otherTabContent.classList.toggle(
              "animationOne",
              tabNameText === otherTabName,
            );
            otherTabContent.classList.toggle(
              "hidden",
              tabNameText !== otherTabName,
            );
            otherTabContent.classList.toggle(
              "animationTwo",
              tabNameText !== otherTabName,
            );
          });
        });
      });
    }
  }

  //create dropdown resubale function and select item
  function dropdownModalAndSelect(
    dropDown,
    dropDownModal,
    openDropDownClasses,
    closeDropDownClasses,
  ) {
    if (dropDown) {
      dropDown.addEventListener("click", () => {
        if (dropDownModal.classList.contains("visible")) {
          dropDownModal.classList.add(...closeDropDownClasses);
          dropDownModal.classList.remove(...openDropDownClasses);
        } else {
          dropDownModal.classList.remove(...closeDropDownClasses);
          dropDownModal.classList.add(...openDropDownClasses);
        }
      });

      const itemList = dropDownModal.querySelectorAll(".item");

      const selectedItem = dropDown.querySelector(".selectedItem");
      itemList.forEach((item) => {
        item.addEventListener("click", () => {
          selectedItem.textContent = item.textContent;
          dropDownModal.classList.add(...closeDropDownClasses);
          dropDownModal.classList.remove(...openDropDownClasses);
        });
      });

      document.addEventListener("click", (e) => {
        if (!dropDown.contains(e.target) && !dropDownModal.contains(e.target)) {
          dropDownModal.classList.add(...closeDropDownClasses);
          dropDownModal.classList.remove(...openDropDownClasses);
        }
      });
    }
  }

  /* ========= Reusable Functions End =========== */

  //preloader
  const preloader = document.querySelector(".preloader");

  if (preloader) {
    preloader.classList.add("fixed");
    preloader.classList.remove("hidden");

    setTimeout(() => {
      preloader.classList.add("hidden");
      preloader.classList.remove("fixed");
    }, 1000);
  }

  //home tab
  const hotelTab = document.querySelector(".hotelTab");
  createTab(
    hotelTab,
    ["border-p1", "bg-p1", "text-white"],
    [
      "bg-b50",
      "text-p1",
      "border-b75",
      "dark:text-white",
      "dark:bg-n75",
      "dark:border-n70",
    ],
  );

  //check local storage
  const localStorageMode = localStorage.getItem("mode");
  const chooseModeButton = document.querySelector(".choose-mode");

  function changeMode(mode) {
    const icon = chooseModeButton?.querySelector(".ph");
    if (mode === "dark") {
      document.querySelector("body").classList?.remove("white");
      document.querySelector("body").classList.add("dark");
      icon?.classList.remove("ph-sun");
      icon?.classList.add("ph-moon");
    } else {
      document.querySelector("body").classList?.remove("dark");
      document.querySelector("body").classList.add("white");
    }
  }

  if (localStorageMode === "dark") {
    changeMode(localStorageMode);

    if (chooseModeButton) {
      const icon = chooseModeButton.querySelector(".ph");
      chooseModeButton.classList.add("active");
      icon.classList.remove("ph-sun");
      icon.classList.add("ph-moon");
    }
  }

  // Light Mode Dark Mode

  chooseModeButton?.addEventListener("click", () => {
    const icon = chooseModeButton.querySelector(".ph");
    if (localStorage.getItem("mode") === "dark") {
      localStorage.setItem("mode", "white");
      changeMode("white");
      icon.classList.add("ph-sun");
      icon.classList.remove("ph-moon");
    } else {
      localStorage.setItem("mode", "dark");
      changeMode("dark");
      chooseModeButton.classList.add("active");
      icon.classList.remove("ph-sun");
      icon.classList.add("ph-moon");
    }
  });

  //select country
  const countryList = document.querySelector(".countryList");

  if (countryList) {
    const items = countryList.querySelectorAll(".item");

    items.forEach((item) => {
      const circle = item.querySelector(".check-circle");
      item.addEventListener("click", () => {
        items.forEach((otherItem) => {
          if (otherItem !== item) {
            otherItem.classList.remove("active");
            const otherCircle = otherItem.querySelector(".check-circle");
            otherCircle.classList.remove("ph-fill");
            otherCircle.classList.add("ph");
          }
        });

        const isActive = item.classList.toggle("active");
        circle.classList.toggle("ph-fill", isActive);
        circle.classList.toggle("ph", !isActive);
      });
    });
  }

  //age confirm modal
  const ageConfirmModal = document.querySelector(".ageConfirmModal");
  const ageConfirmModalOpenButton = document.querySelector(
    ".ageConfirmModalOpenButton",
  );
  const ageConfirmModalCloseButton = document.querySelector(
    ".ageConfirmModalCloseButton",
  );

  if (ageConfirmModal) {
    ageConfirmModalOpenButton.addEventListener("click", () => {
      ageConfirmModal.classList.add("active");
    });

    ageConfirmModalCloseButton.addEventListener("click", () => {
      ageConfirmModal.classList.remove("active");
    });
  }

  //sign in loading modal
  const signInLoadingModalOpenButton = document.querySelector(
    ".signInLoadingModalOpenButton",
  );
  const signInLoadingModal = document.querySelector(".signInLoadingModal");

  if (signInLoadingModal) {
    signInLoadingModalOpenButton.addEventListener("click", () => {
      signInLoadingModal.classList.add("active");

      setTimeout(() => {
        signInLoadingModal.classList.remove("active");
        window.location.href = "/home.html";
      }, 1000);
    });
  }

  //search flight more button
  const moreOption = document.querySelector("#moreOption");
  const moreOptionModal = document.querySelector("#moreOptionModal");

  moreOption &&
    modalToggle(moreOption, moreOptionModal, "modalOpen", "modalClose");

  //select payment method
  const paymentMethodItems = document.querySelectorAll(".paymentMethods .item");

  paymentMethodItems.forEach((item) => {
    const radioButton = item.querySelector(".radioButton");

    item.addEventListener("click", () => {
      paymentMethodItems.forEach((otherItem) => {
        if (otherItem !== item) {
          const otherRadioButton = otherItem.querySelector(".radioButton");
          otherItem.classList.remove(
            "border-x",
            "border-b-2",
            "border-t",
            "border-p1",
          );
          otherItem.classList.add("dark:border-n0", "border-white");

          otherRadioButton.classList.remove("ph-fill", "text-p1");
          otherRadioButton.classList.add("ph");
        }
      });

      item.classList.remove("dark:border-n0", "border-white");
      item.classList.add("border-x", "border-b-2", "border-t", "border-p1");

      radioButton.classList.remove("ph");
      radioButton.classList.add("ph-fill", "text-p1");
    });
  });

  //Money load successfully
  const moneyAddModal = document.querySelector(".moneyAddModal");
  const moneyAddModalOpenButton = document.querySelector(
    ".moneyAddModalOpenButton",
  );
  const moneyAddModalCloseButton = document.querySelector(
    ".moneyAddModalCloseButton",
  );

  if (moneyAddModal) {
    moneyAddModalOpenButton.addEventListener("click", () => {
      moneyAddModal.classList.add("active");
    });

    moneyAddModalCloseButton.addEventListener("click", () => {
      moneyAddModal.classList.remove("active");
    });
  }

  //notifications settings
  const notificationsSettings = document.querySelector(
    ".notificationsSettings",
  );

  if (notificationsSettings) {
    const items = notificationsSettings.querySelectorAll(".item");

    items.forEach((item) => {
      const checkBox = item.querySelector(".checkBox");
      const checkBoxCircle = item.querySelector(".checkBoxCircle");
      item.addEventListener("click", () => {
        checkBox.classList.toggle("bg-n100");
        checkBox.classList.toggle("bg-p1");
        checkBoxCircle.classList.toggle("left-0.5");
        checkBoxCircle.classList.toggle("left-[22px]");
        checkBox.classList.toggle("dark:bg-n0");
        checkBox.classList.toggle("dark:bg-p1");
      });
    });
  }

  //help center tab
  const helpCenterTab = document.querySelector(".helpCenterTab");
  createTab(
    helpCenterTab,
    ["text-p1", "dark:text-white", "bg-white", "dark:bg-n0"],
    ["text-white", "bg-b200"],
  );

  //faq category select
  const faqCategory = document.querySelector(".faqCategory");

  if (faqCategory) {
    const items = faqCategory.querySelectorAll(".item");
    items.forEach((item) => {
      item.addEventListener("click", () => {
        items.forEach((otherItem) => {
          const activeClass = ["bg-p1", "text-white"];
          const inactiveClass = ["bg-white", "dark:bg-n0"];

          activeClass.forEach((className) => {
            otherItem.classList.toggle(className, otherItem === item);
          });

          inactiveClass.forEach((className) => {
            otherItem.classList.toggle(className, otherItem !== item);
          });
        });
      });
    });
  }

  // FAQ Item Toggle
  let accordion = document.querySelectorAll(".faq-accordion");

  accordion.forEach((item, index) => {
    accordion[index].addEventListener("click", function () {
      let faqAnswer = this.nextElementSibling;
      let parent = accordion[index].parentElement;

      // Close all other accordions
      accordion.forEach((otherAccordion, otherIndex) => {
        if (otherIndex !== index) {
          let otherFaqAnswer = otherAccordion.nextElementSibling;
          otherFaqAnswer.style.height = null;
          otherAccordion.querySelector("i").classList.remove("text-p1");
          otherAccordion.parentElement.classList.remove("!border-p1");
        }
      });

      // Toggle open/close for the clicked accordion
      if (faqAnswer.style.height) {
        faqAnswer.style.height = null;
      } else {
        faqAnswer.style.height = faqAnswer.scrollHeight + "px";
      }

      accordion[index].parentElement.classList.add("!border-p1");

      // Toggle classes for the clicked accordion
      accordion[index].querySelector("i").classList.toggle("ph-caret-down");
      accordion[index].querySelector("i").classList.toggle("ph-caret-up");
      accordion[index].querySelector("i").classList.add("text-p1");
    });
  });

  //share modal
  const shareModal = document.querySelector(".shareModal");
  const shareModalOpenButton = document.querySelector(".shareModalOpenButton");
  const shareModalCloseButton = document.querySelector(
    ".shareModalCloseButton",
  );

  if (shareModal) {
    shareModalOpenButton.addEventListener("click", () => {
      shareModal.classList.add("active");
    });

    shareModalCloseButton.addEventListener("click", () => {
      shareModal.classList.remove("active");
    });
  }
  //price alert modal
  const priceAlertModal = document.querySelector(".priceAlertModal");
  const priceAlertModalOpenButton = document.querySelector(
    ".priceAlertModalOpenButton",
  );
  const priceAlertModalCloseButton = document.querySelector(
    ".priceAlertModalCloseButton",
  );

  if (priceAlertModal) {
    priceAlertModalOpenButton.addEventListener("click", () => {
      priceAlertModal.classList.add("active");
    });

    priceAlertModalCloseButton.addEventListener("click", () => {
      priceAlertModal.classList.remove("active");
    });
  }

  //direct flight toggle
  const directFlightToggle = document.querySelector(".directFlightToggle");

  if (directFlightToggle) {
    const checkBoxCircle = directFlightToggle.querySelector(".checkBoxCircle");
    const checkBox = directFlightToggle.querySelector(".checkBox");
    directFlightToggle.addEventListener("click", () => {
      checkBox.classList.toggle("bg-n100");
      checkBox.classList.toggle("bg-p1");
      checkBoxCircle.classList.toggle("left-0.5");
      checkBoxCircle.classList.toggle("left-[22px]");
      checkBox.classList.toggle("dark:bg-n0");
      checkBox.classList.toggle("dark:bg-p1");
    });
  }

  //price alert modal
  const sortModal = document.querySelector(".sortModal");
  const sortModalOpenButton = document.querySelector(".sortModalOpenButton");
  const sortModalCloseButton = document.querySelector(".sortModalCloseButton");

  if (sortModal) {
    sortModalOpenButton.addEventListener("click", () => {
      sortModal.classList.add("active");
    });

    sortModalCloseButton.addEventListener("click", () => {
      sortModal.classList.remove("active");
    });
  }

  // Select Sort By
  const sortByItems = document.querySelector(".sortByItems");

  if (sortByItems) {
    const items = sortByItems.querySelectorAll(".item");

    items.forEach((item) => {
      const circle = item.querySelector(".ph-radio-button");
      item.addEventListener("click", () => {
        items.forEach((otherItem) => {
          if (otherItem !== item) {
            const otherCircle = otherItem.querySelector(".ph-radio-button");
            otherCircle.classList.remove("ph-fill");
            otherCircle.classList.add("ph");
            otherCircle.classList.add("text-n100");
            otherCircle.classList.remove("text-p1");
          }
        });

        circle.classList.remove("ph");
        circle.classList.add("ph-fill");
        circle.classList.add("text-p1");
        circle.classList.remove("text-n100");
      });
    });
  }

  //price filter modal
  const filterModal = document.querySelector(".filterModal");
  const filterModalOpenButton = document.querySelector(
    ".filterModalOpenButton",
  );
  const filterModalCloseButton = document.querySelector(
    ".filterModalCloseButton",
  );

  if (filterModal) {
    filterModalOpenButton.addEventListener("click", () => {
      filterModal.classList.add("active");
    });

    filterModalCloseButton.addEventListener("click", () => {
      filterModal.classList.remove("active");
    });
  }

  // filter airlines
  const filterAirlines = document.querySelector(".filterAirlines");

  if (filterAirlines) {
    const items = filterAirlines.querySelectorAll(".item");

    items.forEach((item) => {
      const circle = item.querySelector(".ph-radio-button");
      item.addEventListener("click", () => {
        circle.classList.toggle("ph");
        circle.classList.toggle("ph-fill");
        circle.classList.toggle("text-p1");
        circle.classList.toggle("text-n100");
      });
    });
  }
  // filter amenities
  const filterAmenities = document.querySelector(".filterAmenities");

  if (filterAmenities) {
    const items = filterAmenities.querySelectorAll(".item");

    items.forEach((item) => {
      const circle = item.querySelector(".ph-radio-button");
      item.addEventListener("click", () => {
        circle.classList.toggle("ph");
        circle.classList.toggle("ph-fill");
        circle.classList.toggle("text-p1");
        circle.classList.toggle("text-n100");
      });
    });
  }
  // filter filterFlightPreference
  const filterFlightPreference = document.querySelector(
    ".filterFlightPreference",
  );

  if (filterFlightPreference) {
    const items = filterFlightPreference.querySelectorAll(".item");

    items.forEach((item) => {
      const circle = item.querySelector(".ph-radio-button");
      item.addEventListener("click", () => {
        circle.classList.toggle("ph");
        circle.classList.toggle("ph-fill");
        circle.classList.toggle("text-p1");
        circle.classList.toggle("text-n100");
      });
    });
  }
  // filter filterRefuntReschedule
  const filterRefuntReschedule = document.querySelector(
    ".filterRefuntReschedule",
  );

  if (filterRefuntReschedule) {
    const items = filterRefuntReschedule.querySelectorAll(".item");

    items.forEach((item) => {
      const circle = item.querySelector(".ph-radio-button");
      item.addEventListener("click", () => {
        circle.classList.toggle("ph");
        circle.classList.toggle("ph-fill");
        circle.classList.toggle("text-p1");
        circle.classList.toggle("text-n100");
      });
    });
  }
  // filter filterSeats
  const filterSeats = document.querySelector(".filterSeats");

  if (filterSeats) {
    const items = filterSeats.querySelectorAll(".item");

    items.forEach((item) => {
      const circle = item.querySelector(".ph-radio-button");
      item.addEventListener("click", () => {
        circle.classList.toggle("ph");
        circle.classList.toggle("ph-fill");
        circle.classList.toggle("text-p1");
        circle.classList.toggle("text-n100");
      });
    });
  }

  //select country modal
  const selectCountry = document.querySelector(".selectCountry");
  const selectCountryModal = document.querySelector(".selectCountryModal");
  const activeModalClasses = ["visible", "opacity-100", "z-20", "scale-100"];
  const inactiveClasses = ["invisible", "opacity-0", "scale-0"];

  dropdownModalAndSelect(
    selectCountry,
    selectCountryModal,
    activeModalClasses,
    inactiveClasses,
  );

  //home page tab
  const homeTab = document.querySelector(".homeTab");

  if (homeTab) {
    const tabButtons = homeTab?.querySelectorAll(".home-tab-item");

    tabButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const tabNameText = button
          .querySelector(".tab-item-text")
          .innerText.toLowerCase()
          .replace(/\s+/g, "-")
          .trim();

        tabButtons.forEach((otherButton) => {
          const otherTabName = otherButton
            .querySelector(".tab-item-text")
            .innerText.toLowerCase()
            .replace(/\s+/g, "-")
            .trim();

          ["bg-p1"].forEach((className) => {
            otherButton
              .querySelector(".activeBar")
              .classList.toggle(className, tabNameText === otherTabName);
          });

          ["bg-b50", "dark:bg-n50"].forEach((className) => {
            otherButton
              .querySelector(".activeBar")
              .classList.toggle(className, tabNameText !== otherTabName);
          });

          const otherTabContent = homeTab.querySelector(`#${otherTabName}`);

          otherTabContent.classList.toggle(
            "animationOne",
            tabNameText === otherTabName,
          );
          otherTabContent.classList.toggle(
            "hidden",
            tabNameText !== otherTabName,
          );
          otherTabContent.classList.toggle(
            "animationTwo",
            tabNameText !== otherTabName,
          );
        });
      });
    });
  }

  //passenger select modal
  const passengerModal = document.querySelector(".passengerModal");
  const passengerModalOpenButton = document.querySelector(
    ".passengerModalOpenButton",
  );
  const passengerModalCloseButton = document.querySelector(
    ".passengerModalCloseButton",
  );

  if (passengerModal) {
    passengerModalOpenButton.addEventListener("click", () => {
      passengerModal.classList.add("active");
    });

    passengerModalCloseButton.addEventListener("click", () => {
      passengerModal.classList.remove("active");
    });
  }

  //seat class modal
  const seatClassModal = document.querySelector(".seatClassModal");
  const seatClassModalOpenButton = document.querySelector(
    ".seatClassModalOpenButton",
  );
  const seatClassModalCloseButton = document.querySelector(
    ".seatClassModalCloseButton",
  );

  if (seatClassModal) {
    seatClassModalOpenButton.addEventListener("click", () => {
      seatClassModal.classList.add("active");
    });

    seatClassModalCloseButton.addEventListener("click", () => {
      seatClassModal.classList.remove("active");
    });
  }
  //seat class modal select item
  const seatClassItems = document.querySelectorAll(".seatClassModal .item");
  console.log(seatClassItems);
  seatClassItems.forEach((item) => {
    const radioButton = item.querySelector(".radioButton");

    item.addEventListener("click", () => {
      seatClassItems.forEach((otherItem) => {
        if (otherItem !== item) {
          const otherRadioButton = otherItem.querySelector(".radioButton");

          otherRadioButton.classList.remove("ph-fill", "text-p1");
          otherRadioButton.classList.add("ph", "text-n400", "dark:text-n500");
        }
      });

      radioButton.classList.remove("ph");
      radioButton.classList.add("ph-fill", "text-p1");
    });
  });

  //booking confirmation modal
  const bookingConfirmationModal = document.querySelector(
    ".bookingConfirmationModal",
  );
  const bookingConfirmationModalOpenButton = document.querySelector(
    ".bookingConfirmationModalOpenButton",
  );
  const bookingConfirmationModalCloseButton = document.querySelector(
    ".bookingConfirmationModalCloseButton",
  );

  if (bookingConfirmationModal) {
    bookingConfirmationModalOpenButton.addEventListener("click", () => {
      bookingConfirmationModal.classList.add("active");
    });

    bookingConfirmationModalCloseButton.addEventListener("click", () => {
      bookingConfirmationModal.classList.remove("active");
    });
  }

  //bookign page more oprion button
  //flight booking
  const moreOption1 = document.querySelector("#moreOption1");
  const moreOptionModal1 = document.querySelector("#moreOptionModal1");

  moreOption1 &&
    modalToggle(moreOption1, moreOptionModal1, "modalOpen", "modalClose");

  //car booking
  const moreOption2 = document.querySelector("#moreOption2");
  const moreOptionModal2 = document.querySelector("#moreOptionModal2");

  moreOption2 &&
    modalToggle(moreOption2, moreOptionModal2, "modalOpen", "modalClose");
  //hotel booking
  const moreOption3 = document.querySelector("#moreOption3");
  const moreOptionModal3 = document.querySelector("#moreOptionModal3");

  moreOption3 &&
    modalToggle(moreOption3, moreOptionModal3, "modalOpen", "modalClose");

  //cancel booking modal
  const cancelModal = document.querySelector(".cancelModal");
  const cancelModalOpenButtons = document.querySelectorAll(
    ".cancelModalOpenButtons",
  );
  const cancelModalCloseButton = document.querySelector(
    ".cancelModalCloseButton",
  );

  if (cancelModal) {
    cancelModalOpenButtons.forEach((item) => {
      item.addEventListener("click", () => {
        cancelModal.classList.add("active");
      });
    });

    cancelModalCloseButton.addEventListener("click", () => {
      cancelModal.classList.remove("active");
    });
  }

  // Logout modal
  const logoutModal = document.querySelector(".logoutModal");
  const logoutModalOpenButton = document.querySelector(
    ".logoutModalOpenButton",
  );
  const logoutModalCloseButton = document.querySelector(
    ".logoutModalCloseButton",
  );

  if (logoutModal) {
    logoutModalOpenButton.addEventListener("click", () => {
      logoutModal.classList.add("active");
    });

    logoutModalCloseButton.addEventListener("click", () => {
      logoutModal.classList.remove("active");
    });
  }
});
