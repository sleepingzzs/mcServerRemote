import { state } from "./status";
const apiKey = process.env.NEXT_PUBLIC_KEY;

export default function handler(req, res) {
	const key = req.query.key || req.body.key;

	if (key === apiKey) {
		state.status = true;
		res.status(200).json({ status: true, message: "Starting" });

		setTimeout(() => {
			state.status = false;
		}, 45000);
	} else {
		res.status(403).json({ status: false, message: "Invalid key" });
	}
}
