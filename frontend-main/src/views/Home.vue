<template>
  <div v-if="state?.user?.isLoggedIn() || DEVMODE">
    <HomeNavBar />
    <div>
      <component :is="inscopeComponent"></component>
    </div>
  </div>
  <div v-else>
    <img alt="Vue logo" src="../assets/philipp.jpg" />
    <h1>Junge, du bist nicht angemeldet</h1>
    <h2>Willkommen auf der Startseite der HtW Saar Coding Plattform</h2>
  </div>
</template>

<script>
import HomeNavBar from "./HomeNavBar";
import { useState } from "../store/store";
import { ref, onMounted, defineAsyncComponent, watch } from "vue";
import { getBackendRequest } from "../helper/requests";
export default {
  name: "home",
  components: {
    HomeNavBar,
  },
  setup() {
    const DEVMODE = process.env.NODE_ENV === "development";

    const inscopeComponent = ref(
      defineAsyncComponent(() => import("@/" + state.component))
    );
    let state = useState();

    onMounted(getUserAndSetState(), loadPluginLocation());

    watch(state, (component) => {
      inscopeComponent.value = defineAsyncComponent(() => import("@/" + state.component));
    });

    async function getUserAndSetState() {
      try {
        state.user = await getBackendRequest("user");
      } catch (e) {
        console.log(e);
      }
    }

    function loadPluginLocation() {
      try {
        const URL_PARAMS = new URLSearchParams(window.location.search);

        const COMPONENT_PATH = "components/" + URL_PARAMS.get("component") + ".vue";
        const PLUGIN_PATH = "components/" + URL_PARAMS.get("plugin") + ".vue";

        state.component = COMPONENT_PATH;
        state.plugin = PLUGIN_PATH;
      } catch (e) {
        // Geht eines nicht, wird nichts gesetzt
        console.log(e);
      }
    }

    return {
      state,
      getUserAndSetState,
      inscopeComponent,
      DEVMODE,
    };
  },
};
</script>
