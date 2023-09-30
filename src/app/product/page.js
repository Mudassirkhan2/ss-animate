'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './page.module.scss';

export default function Product() {
	const [size, setSize] = useState(0);
	// const canvasRef = useRef(null);
	// const downloadButtonRef = useRef(null);
	// const mediaRecorderRef = useRef(null);
	// const chunksRef = useRef([]);

	// useEffect(() => {
	// 	const canvas = canvasRef.current;
	// 	const ctx = canvas.getContext('2d');
	// 	let x = 0;

	// 	function startRecording() {
	// 		const stream = canvas.captureStream();
	// 		mediaRecorderRef.current = new MediaRecorder(stream);

	// 		mediaRecorderRef.current.ondataavailable = (e) =>
	// 			chunksRef.current.push(e.data);

	// 		mediaRecorderRef.current.onstop = () => {
	// 			const blob = new Blob(chunksRef.current, { type: 'video/webm' });
	// 			const url = URL.createObjectURL(blob);

	// 			// Create an anchor element for downloading
	// 			const a = document.createElement('a');
	// 			a.href = url;
	// 			a.download = 'myvid.webm';
	// 			a.style.display = 'none';
	// 			document.body.appendChild(a);

	// 			// Trigger a click event on the anchor element to prompt the download
	// 			a.click();

	// 			// Clean up
	// 			document.body.removeChild(a);
	// 			URL.revokeObjectURL(url);
	// 		};

	// 		mediaRecorderRef.current.start();
	// 		setTimeout(() => mediaRecorderRef.current.stop(), 3000);
	// 	}

	// 	function anim() {
	// 		x = (x + 1) % canvas.width;
	// 		ctx.fillStyle = 'white';
	// 		ctx.fillRect(0, 0, canvas.width, canvas.height);
	// 		ctx.fillStyle = 'black';
	// 		ctx.fillRect(x - 20, 0, 40, 40);
	// 		requestAnimationFrame(anim);
	// 	}

	// 	// Attach a click event handler to the download button
	// 	const downloadButton = downloadButtonRef.current;
	// 	downloadButton.addEventListener('click', handleDownload);

	// 	// Function to start recording and stop it when the download button is clicked
	// 	function handleDownload() {
	// 		if (!mediaRecorderRef.current) {
	// 			startRecording();
	// 		} else {
	// 			mediaRecorderRef.current.stop();
	// 		}
	// 	}

	// 	anim();

	// 	// Clean up event listener when the component unmounts
	// 	return () => {
	// 		downloadButton.removeEventListener('click', handleDownload);
	// 	};
	// }, []);

	return (
		<main className={styles.main}>
			{/* <div className={styles.container}>
        <canvas ref={canvasRef} id='canvas'></canvas>
        <button ref={downloadButtonRef}>Download</button>
      </div> */}
			<div className={styles.wrapper}>
				<div className={styles.background}></div>
				<div className={styles.overlay}></div>
			</div>

			<div>
				<input
					type='range'
					min='1'
					max='100'
					value={size}
					className='slider'
					id='myRange'
					onChange={(e) => setSize(e.target.value)}
				/>
			</div>
		</main>
	);
}
