"use client";
import { generateClient } from "aws-amplify/api";
import { Suspense } from "react";
import { listVehicles } from "@/src/graphql/queries";
import { useState, useEffect } from "react";
import { Table, Skeleton } from "@mantine/core";
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
      <Table.Td>{vehicle.id}</Table.Td>
      <Table.Td>{vehicle.make}</Table.Td>
      <Table.Td>{vehicle.model}</Table.Td>
      <Table.Td>{vehicle.year}</Table.Td>
      <Table.Td>{vehicle.color}</Table.Td>
    </Table.Tr>
  ));

  return (
    <div className="flex flex-col items-center py-6 px-4 md:px-6">
      {/* <h1>Inventory Home {vehicles.length} Vehicles</h1> */}
      <Table horizontalSpacing="sm" verticalSpacing="md" captionSide="top">
        <Table.Caption>Inventory showing Vehicle Assets</Table.Caption>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Vehicle ID</Table.Th>
            <Table.Th>Make</Table.Th>
            <Table.Th>Model</Table.Th>
            <Table.Th>Year</Table.Th>
            <Table.Th>Color</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Suspense fallback={<Skeleton height={8} mt={6} />}>
          {" "}
          <Table.Tbody>{rows}</Table.Tbody>
        </Suspense>
      </Table>
    </div>
  );
}
