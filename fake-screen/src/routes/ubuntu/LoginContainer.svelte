<script>
  import Login from "./Login.svelte";
  import { genID } from "$lib/utils";

  let { onPasswordChange, password, hint, onSubmit, onPasswordClear } =
    $props();

  const genOptionId = genID();
  const initOptions = [
    { id: genOptionId(), text: "Ubuntu", selected: true },
    {
      id: genOptionId(),
      text: "Ubuntu with communitheme snap",
      selected: false,
    },
    { id: genOptionId(), text: "Ubuntu on Wayland", selected: false },
    { id: genOptionId(), text: "Ubuntu on Xorg", selected: false },
    { id: genOptionId(), text: "Unity", selected: false },
  ];

  let popupOpen = $state(false);
  let options = $state(initOptions);

  function onOptionClick(id) {
    if (options.find((option) => option.selected).id === id) return;
    options = options.map((option) =>
      option.id === id
        ? { ...option, selected: true }
        : { ...option, selected: false },
    );
  }

  function openPopup() {
    popupOpen = true;
  }

  function closePopup() {
    popupOpen = false;
  }
</script>

<Login
  {onPasswordChange}
  {password}
  {hint}
  {onSubmit}
  {onPasswordClear}
  {options}
  bind:showPopup={popupOpen}
  {onOptionClick}
  {openPopup}
  {closePopup}
/>
