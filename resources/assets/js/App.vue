 <template>
  <div>
    <Navbar></Navbar>
    <main>
      <router-view></router-view>
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