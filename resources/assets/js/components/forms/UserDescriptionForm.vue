<template>
  <form @submit.prevent="$emit('clicked', content, type)">
    <div class="form-group">
      <label for="description">{{label}}</label>
      <input
        type="text"
        v-model="content"
        :placeholder="placeholder"
        class="form-control"
        name="description"
      >
    </div>
    <button class="btn btn-default btn-main">Submit</button>
  </form>
</template>

<script>
export default {
  props: {
    initialValue: String,
    type: String
  },
  data() {
    return {
      content: this.initialValue
    };
  },
  computed: {
    placeholder() {
      return this.type === "add" ? "Write something about yourself" : "";
    },
    label() {
      return this.type === "add" ? "Add a description" : "Edit description";
    }
  }
};
</script>
