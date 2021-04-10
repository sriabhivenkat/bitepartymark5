// const getRestaurants = async ({ radius, count, loc }) => {
//   const client = algoliasearch(
//     "HKZL5TPBOR",
//     "4de96ea74e0d95a51d065d3f9c317fdb"
//   );
//   const index = client.initIndex("restaurants");
//   // const loc = await getUserLocation();
//   // console.log(loc);

//   const results = await index.search("", {
//     aroundLatLng: loc.join(","),
//     aroundRadius: Math.round(radius * 1609.34),
//     hitsPerPage: 30,
//   });

//   // console.log(results);

//   return results.hits
//     .map((hit) => ({
//       //   ...pick(hit, [
//       //     "name",
//       //     "url",
//       //     "rating",
//       //     "price",
//       //     "address",
//       //     "_geoloc",
//       //     "city",
//       //     "website",
//       //     "state",
//       //     "zip_code",
//       //     "cuisine",
//       //   ]),
//       ...hit,
//       matches: 0,
//       id: hit.objectID,
//     }))
//     .sort(() => 0.5 - Math.random())
//     .slice(0, Math.round(count));
// };

export const getNearby = async ({ radius, count, loc }) => {
  const res = await fetch(
    `https://api.yelp.com/v3/businesses/search?latitude=${loc[0]}&longitude=${
      loc[1]
    }&radius=${1609 * radius}&open_now=true&term=restaurants`,
    {
      headers: {
        Authorization:
          "Bearer rYPTZpiV02zpD3Oi9ZR860CPii9SWnI_Ld4dn3D9BTJIWx8eS27JP--ZncAZqmye7aCdkYrGllPTWG5QplokB3oaUralnRC9T4XWk7ddJfpTCpZFZo4AQBnk9F9tYHYx",
      },
    }
  );

  const data = await res.json();

  return data.businesses
    .sort(() => 0.5 - Math.random())
    .slice(0, Math.round(count));
};
