import App from "./App.svelte";
import { Chart } from "chart.js";

const app = new App({
	target: document.getElementById("app")
});

Chart.defaults.font.family = getComputedStyle(document.documentElement).getPropertyValue("--font");

export default app;
