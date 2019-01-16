<template>
  <div class="question-with-answer">
    <h3 class="question-title">
      <router-link :to="questionUrl(question.id)">{{question.title}}</router-link>
    </h3>
    <question-details :question="question"></question-details>
    <div
      class="answer"
      :class="{expanded: expand === true, 'unexpanded-answer': expandableAnswer && !expand}"
    >
      <p class="answer-body" v-html="answer.body"></p>
    </div>
    <div class="text-center">
      <button
        v-if="expandableAnswer && !expand"
        class="btn btn-default btn-expand"
        @click="expand = true"
      >Read more</button>
    </div>

    <p class="answer-details">
      <span class="date">Answered {{formattedDate(answer.created_at)}}</span>
    </p>

    <div class="grid edit-buttons">
      <div class="col-3_md-6_sm-6">
        <p>
          <button
            class="btn btn-main btn-edit"
            data-toggle="modal"
            :data-target="'#editModal' + answer.id"
          >
            Edit
            <i class="fas fa-edit"></i>
          </button>
        </p>
      </div>
      <div class="col-3_md-6_sm-6">
        <p>
          <button
            class="btn btn-inverted btn-edit"
            data-toggle="modal"
            :data-target="'#deleteModal' + answer.id"
          >
            Delete
            <i class="fas fa-trash-alt"></i>
          </button>
        </p>
      </div>
      <div v-if="error != ''" class="alert alert-danger">
        <p>{{error}}</p>
      </div>

      <delete-modal :id="answer.id" :type="'answer'"></delete-modal>
      <edit-modal :initialContent="answer.body" :type="'answer'" :id="answer.id"></edit-modal>
    </div>
  </div>
</template>

<script>
import QuestionDetails from "./QuestionDetails";
import DeleteModal from "./../modals/DeleteModal";
import EditModal from "./../modals/EditModal";
export default {
  data() {
    return {
      error: "",
      expand: false
    };
  },
  props: {
    question: Object,
    answer: Object
  },
  components: {
    QuestionDetails,
    DeleteModal,
    EditModal
  },
  computed: {
    expandableAnswer() {
      if (this.answer.body.length > 400) {
        return true;
      }
      return false;
    },
    questionUrl(id) {
      return id => {
        return "/question-" + id;
      };
    },
    formattedDate(date) {
      return date => {
        let d = new Date(date);
        let options = {
          month: "short",
          day: "numeric",
          year: "numeric"
        };
        return d.toLocaleString("en-us", options);
      };
    },
    loading() {
      return this.$store.getters.loading;
    }
  }
};
</script>
