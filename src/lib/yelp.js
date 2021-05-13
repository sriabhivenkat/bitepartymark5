import Geolocation from "@react-native-community/geolocation";

export const getNearby = async ({ radius, count, loc, filters, price }) => {
  console.log({ price: price.join(",") });
  const res = await fetch(
    `https://api.yelp.com/v3/businesses/search?latitude=${loc[0]}&longitude=${
      loc[1]
    }&radius=${Math.round(
      1609 * radius
    )}&open_now=true&term=restaurants&categories=${filters.join(
      ","
    )}&price=${price.join(",")}`,
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

export const reverseGeocode = async ({ latitude, longitude }) => {
  const address = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude}&${longitude}&&key=AIzaSyBA1ZXfKjDXPiHrT3L2Hnut3ez38_Ww4S8`
  );

  const results = await address.json();
  console.log({ results });

  return results;
};

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
