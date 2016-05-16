const defaultCount = 20;
const naplesPosition = { lat: 40.8537158, lng: 14.1729673 };

export default (count = defaultCount, basePosition = naplesPosition) => [...Array(count)].fill(0)
  .map((__, index) => {
    const lat = basePosition.lat + 0.01 * index * Math.sin(30 * Math.PI * index / 180) *
      Math.cos(50 * Math.PI * index / 180) + Math.sin(5 * index / 180);
    const lng = basePosition.lng + 0.01 * index * Math.cos(70 + 23 * Math.PI * index / 180) *
      Math.cos(50 * Math.PI * index / 180) + Math.sin(5 * index / 180);

    return {
      id: `__fake__${index}`,
      position: {
        lat,
        lng,
      },
    };
  });
