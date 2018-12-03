 <template>
  <div>
    <Navbar></Navbar>
    <main>
      <div class="container">
        <router-view></router-view>
      </div>
    </main>
  </div>
</template>

<script>
const moment = require("moment");
import Navbar from "./components/Navbar";
export default {
  components: {
    Navbar
  }
};
</script>