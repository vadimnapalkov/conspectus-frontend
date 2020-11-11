<script>
  import cn from 'classnames';

  export let id = null
  export let name = ''
  export let checked
  export let value  = null
  export let onChange
  export let bigSize = true
  export let className = ''
  export let active = true
  export let onFocus = null
  export let onBlur = null

  const handleChange = e => onChange(value || e);

</script>

<style src="./style.scss"></style>

<div class={`styled-checkbox-container position-relative d-flex pl-3 ${className}`}>
  <input
    type="checkbox"
    class={cn('styled-checkbox-container-input position-absolute w-0 h-0 mt-1', {
      'cursor-pointer': active,
      'styled-checkbox-container-input--big-size': bigSize,
    })}
    id={id}
    name={name}
    checked={checked}
    on:change={handleChange}
    disabled={!active}
    on:focus={onFocus}
    on:blur={onBlur}
  />
  <span
    class={cn('styled-checkbox-checkmark position-absolute', {
      'disabled-pointer': !active,
      'styled-checkbox-checkmark--big-size': bigSize,
    })}
  />
</div>
