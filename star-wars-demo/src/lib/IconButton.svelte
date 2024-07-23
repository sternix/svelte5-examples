<script>
    let {label, disabled = false, children, onClick = () => {}} = $props();
  </script>
  
  <button onclick={onClick} aria-label={label} {disabled}>
    {@render children() }
  </button>
  
  <style>
    button {
      background-color: var(--background, cornflowerblue);
      color: white;
      border-radius: 50%;
      width: 1.8rem;
      height: 1.8rem;
      padding: 3px;
    }
  
    button:disabled {
      filter: grayscale(60%);
      cursor: not-allowed;
    }
  </style>