"use client";
import { generateClient } from "aws-amplify/api";
import { listVehicles } from "@/src/graphql/queries";
import { useState, useEffect } from "react";
import { Table } from "@mantine/core";
import { type Vehicle } from "@/src/API";

const client = generateClient();
export default function InventoryHome() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  async function fetchVehicles() {
    try {
      const vehicleData = await client.graphql({
        query: listVehicles,
      });
      const vehicles = vehicleData.data.listVehicles.items;
      setVehicles(vehicles);
    } catch (error) {
      console.log("error fetching vehicles");
    }
  }

  useEffect(() => {
    fetchVehicles();
  }, []);

  const rows = vehicles.map((vehicle) => (
    <Table.Tr key={vehicle.id}>
      <Table.Td>{vehicle.make}</Table.Td>
      <Table.Td>{vehicle.model}</Table.Td>
      <Table.Td>{vehicle.year}</Table.Td>
      <Table.Td>{vehicle.color}</Table.Td>
    </Table.Tr>
  ));

  return (
    <div>
      <h1>Inventory Home {vehicles.length} Vehicles</h1>
      {/* {vehicles.map((vehicle, index) => (
        <ul key={vehicle.id ? vehicle.id : index}>
          <li>
            <p>{vehicle.make}</p>
          </li>
        </ul>
      ))} */}
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Make</Table.Th>
            <Table.Th>Model</Table.Th>
            <Table.Th>Year</Table.Th>
            <Table.Th>Color</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </div>
  );
}
