// /const fetcher = async ({
// 	url,
// 	method,
// 	body,
// 	json = true,
// }: {
// 	url: string;
// 	method: string;
// 	json: boolean;
// 	body: any;
// }) => {
// 	const res = await fetch(url, {
// 		method,
// 		body: body && JSON.stringify(body),
// 		headers: {
// 			Accept: "application/json",
// 			"Content-Type": "application/json",
// 		},
// 	});
// 	console.log(res, "response");
// 	if (!res.ok) throw new Error("API Error");
// 	if (json) {
// 		const data = await res.json();
// 		console.log(data, "data");
// 		return data.data;
// 	}
// };
export const register = async (user: {
	email: string;
	password: string;
	firstName: string;
	lastName: string;
}) => {
	const res = await fetch("/api/register", {
		method: "POST",
		body: JSON.stringify(user),
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
	});
	const data = await res.json();
	return data;

	// return fetcher({
	// 	url: "/api/register",
	// 	method: "POST",
	// 	body: user,
	// 	json: false,
	// });
};
export const signin = async (user: { email: string; password: string }) => {
	const res = await fetch("/api/signin", {
		method: "POST",
		body: JSON.stringify(user),
		headers: {
			"Content-Type": "application/json",
		},
	});
	const data = await res.json();
	return data;
	// return fetcher({
	// 	url: "/api/signin",
	// 	method: "POST",
	// 	body: user,
	// 	json: false,
	// });
};
export const createProject = async (name: string) => {
	const res = await fetch("/api/project", {
		method: "POST",
		body: JSON.stringify(name),
		headers: {
			"Content-Type": "application/json",
		},
	});
	const data = await res.json();
	return data;
};
