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
            @click="$emit('clicked', content)"
          >Submit</button>
        </div>
      </div>
    </div>
  </div>
  <!-- Modal  -->
</template>

<script>
import { VueEditor } from "vue2-editor";

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
  }
};
</script>
