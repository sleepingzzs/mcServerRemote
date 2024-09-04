const ip = process.env.NEXT_PUBLIC_IP;
const port = process.env.NEXT_PUBLIC_PORT;
let status = false;
let players = 0;
let server = "Offline";

const ping = async () => {
	const res = await fetch(`https://api.mcsrvstat.us/3/${ip}`);
	const data = await res.json();
	try {
		return { a: data.online, b: data.players.online };
	} catch (err) {
		return { a: data.online, b: 0 };
	}
};

export const state = {
	status: status,
	players: players,
	server: server,
};

export default async function handler(req, res) {
	const data = await ping();
	res.status(200).json({
		status: state.status,
		server: (await ping()).a ? "ONLINE" : "OFFLINE",
		players: (await ping()).b,
	});
}
