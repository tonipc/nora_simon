<template>
  <div class="form-group">
    <label v-if="inputLabel" :for="inputName">{{ inputLabel }}</label>
    <input
      :type="inputType"
      class="form-control"
      :id="inputName"
      :aria-describedby="inputDescription ? helpName : ''"
      :value="value"
      @input="$emit('input', $event.target.value)"
    />
    <small
      v-if="inputDescription"
      :id="helpName"
      class="form-text text-muted"
      >{{ inputDescription }}</small
    >
  </div>
</template>

<script>
export default {
  name: "InputField",
  props: {
    inputName: {
      type: String,
      default: "input"
    },
    inputLabel: {
      type: String,
      default: ""
    },
    inputType: {
      type: String,
      default: "text"
    },
    inputDescription: {
      type: String,
      default: ""
    },
    value: {
      type: String,
      default: ""
    }
  },
  computed: {
    helpName() {
      return this.inputName + "Help";
    }
  }
};
</script>
