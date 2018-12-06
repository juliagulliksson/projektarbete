<template>
  <!-- Modal -->
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
          <button type="button" class="btn btn-main" data-dismiss="modal">No</button>
          <button
            type="button"
            class="btn btn-inverted"
            data-dismiss="modal"
            @click="$emit('clicked')"
          >Yes, delete</button>
        </div>
      </div>
    </div>
  </div>
  <!-- Modal  -->
</template>

<script>
export default {
  props: {
    id: Number
  }
};
</script>
