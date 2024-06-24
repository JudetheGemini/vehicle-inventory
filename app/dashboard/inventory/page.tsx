"use client";
import { generateClient } from "aws-amplify/api";
import { listVehicles } from "@/src/graphql/queries";
import { useState, useEffect } from "react";
import { Table, Skeleton } from "@mantine/core";
import { type Vehicle } from "@/src/API";
import Link from "next/link";
const client = generateClient();

export default function InventoryHome() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [fetching, setFetching] = useState(true);

  async function fetchVehicles() {
    try {
      const vehicleData = await client.graphql({
        query: listVehicles,
      });
      const vehicles = vehicleData.data.listVehicles.items;
      setVehicles(vehicles);
      setFetching(false);
    } catch (error) {
      console.log("error fetching vehicles");
    }
  }

  useEffect(() => {
    fetchVehicles();
  }, []);

  const rows = vehicles.map((vehicle) => (
    <Table.Tr key={vehicle.id}>
      <Table.Td className="text-xs md:text-sm font-medium md:font-normal">
        {vehicle.id}
      </Table.Td>
      <Table.Td className="text-xs md:text-sm font-medium md:font-normal">
        {vehicle.make}
      </Table.Td>
      <Table.Td className="text-xs md:text-sm font-medium md:font-normal">
        {vehicle.model}
      </Table.Td>
      <Table.Td className="text-xs md:text-sm font-medium md:font-normal">
        {vehicle.year}
      </Table.Td>
      <Table.Td className="text-xs md:text-sm font-medium md:font-normal">
        {vehicle.color}
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <div className="flex flex-col items-center py-6 px-4 md:px-6">
      <Skeleton visible={fetching}>
        <Table verticalSpacing="md" captionSide="top">
          <Table.Caption className="font-medium">
            Inventory showing Vehicle Assets
          </Table.Caption>
          <Table.Caption>
            This table is read-only. To perform update or delete operations,
            copy vehicle ID and please navigate to the{" "}
            <Link href="/dashboard/vehicle" className="text-blue-600">
              Manage Vehicles
            </Link>{" "}
            page
          </Table.Caption>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>ID</Table.Th>
              <Table.Th>Make</Table.Th>
              <Table.Th>Model</Table.Th>
              <Table.Th>Year</Table.Th>
              <Table.Th>Color</Table.Th>
            </Table.Tr>
          </Table.Thead>

          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Skeleton>
    </div>
  );
}
