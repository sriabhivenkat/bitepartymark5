import Geolocation from "@react-native-community/geolocation";
import { useEffect } from "react";
import Geocoder from "react-native-geocoding";

export const getNearby = async ({ radius, count, loc, filters, price, time, showOpen, restrictions }) => {
  // console.log({ price: price.join(",") });
  price = price.length > 0 ? price : [1, 2, 3, 4];
  console.log('foop',parseInt((time.getTime() / 1000).toFixed(0)))
    console.log('boop',showOpen)
  console.log( `https://api.yelp.com/v3/businesses/search?latitude=${loc[0]}&longitude=${
      loc[1]
    }&radius=${Math.round(
      1609 * radius
    )}&term=restaurants ${filters.join(' ')}&categories=${restrictions.join(
      ","
    )}&price=${price.join(",")} ${showOpen ? '&open_at' + parseInt((time.getTime() / 1000).toFixed(0)) : ''}`)
  const res = await fetch(
    `https://api.yelp.com/v3/businesses/search?latitude=${loc[0]}&longitude=${
      loc[1]
    }&radius=${Math.round(
      1609 * radius
    )}&term=restaurants ${filters.join(' ')}&categories=${restrictions.join(
      ","
    )}&price=${price.join(",")} ${showOpen ? '&open_at=' + parseInt((time.getTime() / 1000).toFixed(0)) : ''}`,
    {
      headers: {
        Authorization:
          "Bearer rYPTZpiV02zpD3Oi9ZR860CPii9SWnI_Ld4dn3D9BTJIWx8eS27JP--ZncAZqmye7aCdkYrGllPTWG5QplokB3oaUralnRC9T4XWk7ddJfpTCpZFZo4AQBnk9F9tYHYx",
      },
    }
  );

  const data = await res.json();

  console.log({ data });

  return data.businesses
    .sort(() => 0.5 - Math.random())
    .slice(0, Math.round(count))
    .map((item) => ({ ...item, matches: 0 }));
};

  export const timeToDestination = async(currentLat, currentLong, destLat, destLong) => {
    const query = await fetch(
      `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${
        currentLat
      },${
        currentLong
      }&destinations=${
        destLat
      }%2C${
        destLong
      }&key=AIzaSyBudsRFHgcT7lqUV3xQ9oiM0MquRynmGzI`
    );
    const data = await query.json()
    console.log(data.rows[0].elements[0].duration.text)
    return [data.rows[0].elements[0].duration.text, data.rows[0].elements[0].distance.text];
  }


export const getUserLocation = () =>
  // Promisify Geolocation.getCurrentPosition since it relies on outdated callbacks
  new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        // resolve([30.626549768953662, -96.35597622531617]);
        resolve([latitude, longitude]);
      },
      (error) => {
        reject(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 5,
      }
    );
  });
