export { matchers } from './client-matchers.js';

export const components = [
	() => import("..\\..\\src\\routes\\__layout.svelte"),
	() => import("..\\runtime\\components\\error.svelte"),
	() => import("..\\..\\src\\routes\\404.svelte"),
	() => import("..\\..\\src\\routes\\addCompany.svelte"),
	() => import("..\\..\\src\\routes\\connections.svelte"),
	() => import("..\\..\\src\\routes\\dashboard.svelte"),
	() => import("..\\..\\src\\routes\\index.svelte"),
	() => import("..\\..\\src\\routes\\intro.svelte"),
	() => import("..\\..\\src\\routes\\leftSide.svelte"),
	() => import("..\\..\\src\\routes\\profile.svelte"),
	() => import("..\\..\\src\\routes\\settings.svelte"),
	() => import("..\\..\\src\\routes\\skeleton.svelte"),
	() => import("..\\..\\src\\routes\\startups.svelte"),
	() => import("..\\..\\src\\routes\\welcome.svelte")
];

export const dictionary = {
	"": [[0, 6], [1]],
	"404": [[0, 2], [1]],
	"addCompany": [[0, 3], [1]],
	"connections": [[0, 4], [1]],
	"dashboard": [[0, 5], [1]],
	"intro": [[0, 7], [1]],
	"leftSide": [[0, 8], [1]],
	"profile": [[0, 9], [1]],
	"settings": [[0, 10], [1]],
	"skeleton": [[0, 11], [1]],
	"startups": [[0, 12], [1]],
	"welcome": [[0, 13], [1]]
};