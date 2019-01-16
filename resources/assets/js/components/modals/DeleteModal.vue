<template>
  <div
    class="modal fade"
    :id="'deleteModal' + id"
    tabindex="-1"
    role="dialog"
    aria-labelledby="deleteModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <div class="grid">
            <div class="col-2"></div>
            <div class="col-8">
              <h4 class="modal-title text-center" id="deleteModalLabel">Are you sure?</h4>
            </div>
            <div class="col-2">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          </div>
        </div>
        <div class="modal-body text-center">
          <p class="text-center">This can not be undone.</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-main" data-dismiss="modal">Cancel</button>
          <button
            type="button"
            class="btn btn-inverted"
            data-dismiss="modal"
            @click="functionCall"
          >Yes</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: Number,
    type: String
  },
  methods: {
    functionCall() {
      if (this.type === "answer") {
        this.deleteAnswer();
      } else {
        this.deleteQuestion();
      }
    },
    deleteAnswer() {
      this.$store.dispatch("deleteAnswer", { id: this.id });
    },
    deleteQuestion() {
      this.$store.dispatch("deleteQuestion", { id: this.id });
    }
  }
};
</script>
