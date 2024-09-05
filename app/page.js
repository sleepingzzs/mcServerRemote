"use client";
import { state } from "@/pages/api/status";
import { useState, useEffect } from "react";

export default function Home() {
	const [key, setKey] = useState("");
	const [data, setData] = useState([]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		const response = await fetch("/api/start", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ key }),
		});

		const data = await response.json();

		if (data.status) {
			alert("STARTING!");
		} else {
			alert("INCORRECT PIN");
		}
		state.status = true;
		for (let i = 0; i < 5; i++) {
			const sleep = async (ms) => new Promise((r) => setTimeout(r, ms));
			fetchStatus();
			console.log("heeeelloooooooooooooo" + " " + i);
			await sleep(15000);
		}
		document.getElementById("frm").reset();
	};

	async function fetchStatus() {
		const res = await fetch("/api/status");
		const data = await res.json();
		console.log(data);
		setData({
			server: data.server,
			status: data.status,
			players: data.players,
		});
	}

	useEffect(() => {
		fetchStatus();
		console.log(data);
	}, []);
	return (
		<div className='h-screen flex items-center justify-center overflow-hidden'>
			<div className='bg-[#191919] px-20 py-10 rounded-sm mx-auto flex gap-5 flex-col items-center shadow-2xl'>
				<h1 className='text-[38px] text-red-600'>
					{process.env.NEXT_PUBLIC_NAME} SMP
				</h1>
				<div className='border-2 border-red-600 rounded-sm w-[300px]'>
					<div className='flex flex-row'>
						<p className='text-white/70 border-red-600 border-r-2 w-[80px] p-2'>
							SERVER
						</p>
						<p className='p-2 text-white'>
							{data.server === "OFFLINE"
								? "OFFLINE 🔴"
								: "ONLINE 🟢"}
						</p>
					</div>
					<div className='flex flex-row'>
						<p className='text-white/70 border-red-600 border-r-2 w-[80px] p-2'>
							PLAYERS
						</p>
						<p className='p-2 text-white'>{data.players + " 👤"}</p>
					</div>
					<div className='flex flex-row'>
						<p className='text-white/70 border-red-600 border-r-2 w-[80px] p-2'>
							STATUS
						</p>
						<p className='p-2 text-white'>
							{data.status
								? "STARTED/STARTING 🏃"
								: "SLEEPING 💤"}
						</p>
					</div>
				</div>

				<form
					onSubmit={handleSubmit}
					id='frm'
					className='flex flex-col border-b-2 rounded-sm w-[300px] border-b-red-600'
				>
					<input
						type='text'
						id='key'
						name='key'
						placeholder='PIN'
						required
						className='outline-none border-b-2 p-2'
						autoComplete='off'
						autoFocus
						value={key}
						onChange={(e) => setKey(e.target.value)}
					/>
					<button
						type='submit'
						className='outline-none p-2 text-white border-x-2 border-x-red-600 hover:bg-red-600 hover:text-white'
					>
						START
					</button>
				</form>
			</div>
		</div>
	);
}
