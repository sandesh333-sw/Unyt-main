export async function geocodeLocation(location){
    try {
        const response = await fetch(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(location)}.json?access_token=${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}&limit=1`
        );

        const data = await response.json();

        if (data.features && data.features.length > 0){
            return {
                type: 'Point',
                coordinates: data.features[0].geometry.coordinates, // [lng, lat]
            };
        }

        return {
            type: 'Point',
            coordinates: [0,0],
        };


    } catch (error) {
        console.error('Geocoding error:', error);
        return {
            type: 'Point',
            coordinates: [0,0],
        };
    }
}