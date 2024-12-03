//your JS code here. If required.
const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

const downloadImage = (image) => {
	return new Promise((resolve, reject) => {
		const img = new Image()
		img.src=image.url

		img.onload = () => resolve(img)
		img.onerror = () => reject(`Failed to load image's URL: ${image.url}`);
	})
}

btn.addEventListener('click', (e)=> {
	e.preventDefault()
	btn.disabled = true;

	Promise.all(images.map(downloadImg)).then((imgElements) => {
		output.innerHTML = "";
		imgElements.forEach((img) => {
			output.appendChild(img);
		});
	}).catch((error) => {
		output.innerHTML = `<p style="color: red;">${error}</p>`;
	}).finally (()=> {
		btn.disabled = false;
	})
})
