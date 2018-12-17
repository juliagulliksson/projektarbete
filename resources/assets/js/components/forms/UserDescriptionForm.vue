<template>
  <!-- <form @submit.prevent="$emit('clicked', content, type)"> -->
  <div>
    <label for="description">{{label}}</label>
    <div class="grid">
      <div class="form-group col-8_sm-12 dashboard-input">
        <input
          type="text"
          v-model="content"
          :placeholder="placeholder"
          class="form-control"
          name="description"
        >
      </div>
      <div class="text-center col-4_sm-12">
        <button class="btn btn-default btn-main" @click="$emit('clicked', content, type)">Submit</button>
      </div>
    </div>
  </div>
  <!-- </form> -->
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
