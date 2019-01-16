 <template>
  <div>
    <Navbar></Navbar>
    <main>
      <div class="container">
        <router-view></router-view>
      </div>
    </main>
    <transition name="cookie">
      <div v-if="!agreed && show" class="cookie-consent">
        <div class="grid-center-middle-noGutter">
          <div class="col-2_md-3_sm-6">
            <p class="text-center">This page uses cookies</p>
          </div>
          <div class="col-2_md-3_sm-6 text-center">
            <button @click="agree" class="btn btn-inverted">OK</button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
const moment = require("moment");
import Navbar from "./components/Navbar";
export default {
  data() {
    return {
      show: false,
      agreed: localStorage.getItem("agreed_to_cookie") || false
    };
  },
  components: {
    Navbar
  },
  methods: {
    agree() {
      this.show = false;
      this.agreed = true;
      localStorage.setItem("agreed_to_cookie", "true");
    }
  },
  mounted() {
    this.show = true;
  }
};
</script>