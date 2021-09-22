import App from "./App.svelte";
import { Chart } from "chart.js";

const app = new App({
	target: document.getElementById("app")
});

Chart.defaults.font.family = getComputedStyle(document.documentElement).getPropertyValue("--font");

function updateChartTheme() {
	const documentStyle = getComputedStyle(document.documentElement);
	Chart.defaults.color = documentStyle.getPropertyValue("--col-text");
	Chart.defaults.borderColor = `rgb(${documentStyle.getPropertyValue("--col-bg1")})`;
	Object.values(Chart.instances).forEach(chart => chart.update());
}

const colorSchemeQueryList = window.matchMedia("(prefers-color-scheme: dark)");
updateChartTheme(colorSchemeQueryList);
colorSchemeQueryList.addEventListener("change", updateChartTheme);

export default app;
