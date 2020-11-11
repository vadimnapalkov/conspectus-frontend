<script>
  export let label;
  export let type;
  export let name;
  export let value;
  export let placeholder;
  export let onBlur;
  export let onFocus;
  export let onChange;
  export let className = '';
</script>

<style src="./style.scss"></style>

<div class="text-field d-flex flex-column w-100 {className}">
  {#if label}
    <span class="text-field-label text-muted">
      {label}
    </span>
  {/if}
  <input
    class="text-field form-control"
    autoComplete="new-password"
    type={type}
    name={name}
    value={value}
    placeholder={placeholder}
    on:blur={onBlur}
    on:focus={onFocus}
    on:input={onChange}
  />
</div>