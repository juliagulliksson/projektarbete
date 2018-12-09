<template>
  <!-- Modal -->
  <div
    class="modal fade"
    :id="'editModal' + id"
    tabindex="-1"
    role="dialog"
    aria-labelledby="editModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog" :class="{ 'modal-lg': type == 'answer' }" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <div class="grid">
            <div class="col-10">
              <h4 class="modal-title" id="editModalLabel">Edit {{type}}</h4>
            </div>
            <div class="col-2">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          </div>
        </div>
        <div class="modal-body">
          <vue-editor v-if="type === 'answer'" v-model="content"></vue-editor>
          <div v-else class="form-group grid-center">
            <div class="col-10">
              <input type="text" name="title" class="form-control" v-model="content">
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-main" data-dismiss="modal">Cancel</button>
          <button
            type="button"
            class="btn btn-inverted"
            data-dismiss="modal"
            @click="functionCall"
          >Submit</button>
        </div>
      </div>
    </div>
  </div>
  <!-- Modal  -->
</template>

<script>
import { VueEditor } from "vue2-editor";
// @click="$emit('clicked', content)"
export default {
  props: {
    id: Number,
    initialContent: String,
    type: String
  },
  data() {
    return {
      content: this.initialContent
    };
  },
  components: {
    VueEditor
  },
  methods: {
    functionCall() {
      if (this.type === "answer") {
        this.editAnswer();
      } else {
        this.editQuestion();
      }
    },
    editAnswer() {
      console.log("answer");
      this.$store
        .dispatch("editAnswer", { body: this.content, id: this.id })
        .then(response => {
          console.log(response);
        });
    },
    editQuestion() {
      this.$store
        .dispatch("editQuestion", {
          title: this.content,
          id: this.id
        })
        .catch(error => {
          if (error === 401) {
            this.$router.push({
              name: "login",
              query: { sessionError: "Session expired" }
            });
          }
        });
    }
  }
};
</script>
