'use client'

import { useEffect, useRef } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN

const MapView = ({ coordinates, location }) => {
  const mapContainer = useRef(null)
  const map = useRef(null)

  useEffect(() => {
    if (map.current) return

    const [lng, lat] = coordinates

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [lng, lat],
      zoom: 12
    })

    // Add marker
    new mapboxgl.Marker({ color: '#1f2937' })
      .setLngLat([lng, lat])
      .setPopup(
        new mapboxgl.Popup({ offset: 25 })
          .setHTML(`<p class="font-semibold">${location}</p>`)
      )
      .addTo(map.current)

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right')

  }, [coordinates, location])

  return (
    <div 
      ref={mapContainer} 
      className='w-full h-96 rounded-lg border border-gray-200'
    />
  )
}

export default MapView