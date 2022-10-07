document.addEventListener("DOMContentLoaded", function() {
  const menuElement = document.querySelector("#norainventoryHOMEPAGE_PACK");
  const optionElement = document.querySelector(
    "#norainventoryHOMEPAGE_PACK_OPTION"
  );

  const { norainventoryData } = window;
  const { menus } = norainventoryData;

  menuElement.addEventListener("change", e => {
    const menuId = Number(e.target.value);

    const options = menus.find(m => m.id === menuId).options;

    optionElement.innerHTML = "";
    options.forEach(o => {
      const option = document.createElement("option");
      option.value = o.id;
      option.text = o.label;

      optionElement.appendChild(option);
    });
  });
});
