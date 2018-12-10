const images = {bg, space};

for (let i in images) {
  const img = new Image();
  img.src = images[i];
  images[i] = img;
}

export default images;
