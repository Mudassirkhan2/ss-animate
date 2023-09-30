'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './page.module.scss';
import Image from 'next/image';

export default function Product() {
	const [size, setSize] = useState(400);
	const [sizeImage, setSizesizeImage] = useState(200);

	// const canvasRef = useRef(null);
	// const downloadButtonRef = useRef(null);
	// const mediaRecorderRef = useRef(null);
	// const chunksRef = useRef([]);
	// useEffect(() => {
	// 	if (fileinput) {
	// 		setImgUrl(fileinput);
	// 	}
	// }, [fileinput]);
	const [dataURL, setDataURL] = useState(null);

	const handleFileChange = async (e) => {
		const file = e.target.files[0];
		if (file) {
			try {
				const dataURL = await readFileAsDataURL(file);
				console.log(dataURL)
				setDataURL(dataURL);
			} catch (error) {
				console.error("An error occurred:", error);
			}
		}
	};

	const readFileAsDataURL = (file) => {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();

			reader.onload = (event) => {
				resolve(event.target.result);
			};

			reader.onerror = (event) => {
				reject(event.target.error);
			};

			reader.readAsDataURL(file);
		});
	};
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
			<div>
				<input type="file"
					accept="image/*"
					onChange={handleFileChange} />
			</div>
			{
				dataURL &&
				<div className={styles.wrapper} style={{ width: size + 'px', height: size + 'px' }}>
					<div className={styles.background} ></div>
					<div className={styles.overlay} style={{ width: sizeImage + 'px', height: sizeImage + 'px' }}>
						<Image className={styles.overlay} src={dataURL} alt="Picture of the author" width={sizeImage} height={sizeImage} />
					</div>

				</div>
			}

			<div className={styles.sliderContainer}>
				<div className={styles.sliderContainerInside}>
					<label for='myRange'>Size</label>
					<input
						type='range'
						min='400'
						max='800'
						value={size}
						className='slider'
						id='myRange'
						onChange={(e) => setSize(e.target.value)}
					/>
				</div>
				<div className={styles.sliderContainerInside}>
					<label for='myRangeImg'>Image Size</label>
					<input
						type='range'
						min='200'
						max='400'
						value={sizeImage}
						className='slider'
						id='myRangeImg'
						onChange={(e) => setSizesizeImage(e.target.value)}
					/>
				</div>
			</div>
		</main>
	);
}
