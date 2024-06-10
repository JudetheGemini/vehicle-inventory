export default async function fetchVehicles() {
  try {
    const vehicleData = await client.graphql({
      query: listVehicles,
    });
    const vehicles = vehicleData.data.listVehicles.items;
    setVehicles(vehicles);
    updateState();
  } catch (error) {
    console.log("error fetching vehicles");
  }
}
