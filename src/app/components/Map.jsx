import React, { useEffect } from 'react';

const loadScript = (url, onLoad) => {
  const script = document.createElement('script');
  script.src = url;
  script.async = true;
  script.onload = onLoad;
  script.onerror = () => console.error(`Failed to load script: ${url}`);
  document.body.appendChild(script);
};

const MapComponent = () => {
  useEffect(() => {
    const initializeMap = () => {
      if (window.longdo) {
        const map = new window.longdo.Map({
          placeholder: document.getElementById('map')
        });
        map.Layers.setBase(window.longdo.Layers.NORMAL);
        map.location({ lon: 100.77828594038752, lat: 13.730118176357248 }, true);//13.730118176357248, 100.77828594038752
        new window.longdo.Marker({
          lon: 100.523186,
          lat: 13.736717,
          title: 'Hello Longdo Map!',
          detail: 'This is a marker on Longdo Map.'
        });
        console.log('Map initialized');
      } else {
        console.error('Longdo maps object is not available');
      }
    };

    if (window.longdo) {
      initializeMap();
    } else {
      loadScript('https://api.longdo.com/map/?key=08e50ffafabd848d6d37751de92e28a5', initializeMap); //
    }
  }, []);

  return (
    <div className='flex justify-center'>
      <div id="map" className='p-4 rounded-lg shadow-inner border-solid border-2 border-gray-200  max-w-full' style={{ width: '60%', height: '300px'}}></div>
    </div>
  );
};

export default MapComponent;
