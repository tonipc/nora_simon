document.addEventListener("DOMContentLoaded", function() {
  const selection = document.querySelector('select[name="type"]');
  const inputGroups = document.querySelectorAll(".only-for-product-pack");

  const checkValue = function(e) {
    if (e.value === "cart_rule") {
      inputGroups.forEach(group => (group.style.display = "none"));
    } else {
      inputGroups.forEach(group => group.removeAttribute("style"));
    }
  };

  checkValue(selection);

  selection.addEventListener("change", e => {
    checkValue(e.target);
  });
});
