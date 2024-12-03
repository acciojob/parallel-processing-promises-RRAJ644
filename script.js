// Ensure that the script runs after the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  const output = document.getElementById("output");
  const btn = document.getElementById("download-images-button");

  // Check if elements exist before proceeding
  if (!output || !btn) {
    console.error("Required elements not found in the DOM");
    return;
  }

  const images = [
    { url: "https://picsum.photos/id/237/200/300" },
    { url: "https://picsum.photos/id/238/200/300" },
    { url: "https://picsum.photos/id/239/200/300" },
  ];

  // Function to download an image
  const downloadImage = (image) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = image.url;

      // On image load success
      img.onload = () => resolve(img);

      // On image load error
      img.onerror = () => reject(`Failed to load image's URL: ${image.url}`);
    });
  };

  // Adding event listener to the button
  btn.addEventListener("click", (e) => {
    e.preventDefault(); // Prevent any default action

    // Disable button to prevent multiple clicks
    btn.disabled = true;

    // Download all images in parallel using Promise.all
    Promise.all(images.map(downloadImage))
      .then((imgElements) => {
        output.innerHTML = ""; // Clear the output div before adding new images
        imgElements.forEach((img) => {
          output.appendChild(img); // Append each image to the output div
        });
      })
      .catch((error) => {
        output.innerHTML = `<p style="color: red;">${error}</p>`; // Show error message if any image fails to load
      })
      .finally(() => {
        btn.disabled = false; // Re-enable the button
      });
  });
});
