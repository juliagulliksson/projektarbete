<template>
  <div class="question">
    <h3 class="question-title">
      <router-link :to="questionUrl(question.id)">{{question.title}}</router-link>
    </h3>
    <question-details :question="question"></question-details>
    <div class="grid edit-buttons">
      <div class="col-3_md-6_sm-6">
        <p>
          <button
            class="btn btn-main btn-edit"
            data-toggle="modal"
            :data-target="'#editModal' + question.id"
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
            :data-target="'#deleteModal' + question.id"
          >
            Delete
            <i class="fas fa-trash-alt"></i>
          </button>
        </p>
      </div>
      <div v-if="error != ''" class="alert alert-danger">
        <p>{{error}}</p>
      </div>
    </div>
    <delete-modal @clicked="deleteQuestion" :id="question.id"></delete-modal>
    <edit-modal :initialContent="question.title" :type="'question'" :id="question.id"></edit-modal>
  </div>
</template>

<script>
import QuestionDetails from "./QuestionDetails";
import DeleteModal from "./../modals/DeleteModal";
import EditModal from "./../modals/EditModal";
export default {
  props: {
    question: Object
  },
  data() {
    return {
      error: ""
    };
  },
  components: {
    QuestionDetails,
    EditModal,
    DeleteModal
  },
  computed: {
    questionUrl(id) {
      return id => {
        return "/question-" + id;
      };
    }
  },
  methods: {
    deleteQuestion() {
      // IF the queston has no answers yet
    }
    /*  editQuestion(content) {
      console.log(content);
      this.$store
        .dispatch("editQuestion", {
          title: content,
          id: this.question.id
        })
        .catch(error => {
          if (error === 401) {
            this.$router.push({
              name: "login",
              query: { sessionError: "Session expired" }
            });
          }
        });
    } */
  }
};
</script>
