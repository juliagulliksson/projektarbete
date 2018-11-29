<template>
  <div>
    <h4>Post a new question</h4>
    <form method="post" @submit.prevent="onSubmit(data)">
      <div class="form-group">
        <input type="text" class="form-control" placeholder="Ask away" required>
      </div>
      <div class="text-center">
        <button type="submit" class="btn btn-main">Submit</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    onSubmit: Function
  }
};
</script>
