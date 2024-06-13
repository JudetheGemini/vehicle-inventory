"use client";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { generateClient } from "aws-amplify/api";
import { useRouter } from "next/navigation";
import { useLoginStore } from "@/utils/zustand";
import { useVehicleStore } from "@/providers/vehicle-store-provider";
import { useEffect, useState } from "react";
import { type Vehicle } from "@/src/API";
import { listVehicles } from "@/src/graphql/queries";

import {
  Grid,
  Card,
  Text,
  Divider,
  Flex,
  Button,
  Modal,
  Table,
} from "@mantine/core";

const client = generateClient();

export default function Dashboard() {
  const router = useRouter(); // for client-side navigation
  const { user, signOut } = useAuthenticator((context) => [context.user]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const { setTotalVehicles, totalVehicles } = useVehicleStore((state) => state);
  const testStoreData = useLoginStore((state) => state.test);
  const sortedCars = [...vehicles].sort((a, b) => {
    return Date.parse(b.createdAt) - Date.parse(a.createdAt);
  });

  const slicedSortedCars = sortedCars.slice(0, 5);

  const handleLogout = () => {
    signOut();
    router.push("/");
  };

  type EffectCallback = () => Promise<void>;

  const fetchVehicles: EffectCallback = async () => {
    try {
      const vehicleData = await client.graphql({
        query: listVehicles,
      });
      const vehicles = vehicleData.data.listVehicles.items;
      setVehicles(vehicles);
      setTotalVehicles(vehicles.length);
    } catch (error) {
      console.log("error fetching vehicles");
    }
  };
  useEffect(() => {
    fetchVehicles();
  }, []);

  return (
    <div className="gap-2 flex flex-col">
      <Flex justify="center" gap="lg" direction="column">
        <Text size="lg" fw={700}>
          Dashboard
        </Text>

        <Text fw={600} size="sm">
          Key Metrics
        </Text>
      </Flex>
      <Grid grow>
        <Grid.Col span={3}>
          <Card withBorder>
            <Text fw={700} fs="12">
              Total Vehicles
            </Text>
            <Divider my="md" />
            <Text fw={700} fs="24">
              {totalVehicles}
            </Text>
          </Card>
        </Grid.Col>
        <Grid.Col span={3}>
          <Card withBorder>
            <Text fw={700} fs="12">
              Last Activity
            </Text>
            <Divider my="md" />
            <Text fw={700} fs="24">
              10
            </Text>
          </Card>
        </Grid.Col>
        <Grid.Col span={3}>
          <Card withBorder>
            <Text fw={700} fs="12">
              Total Users
            </Text>
            <Divider my="md" />
            <Text fw={700} fs="24">
              10
            </Text>
          </Card>
        </Grid.Col>
      </Grid>
      <Divider my="lg" />
      <Text size="lg" fw={700}>
        Welcome to your dashboard {user?.username}
      </Text>
      <Grid grow>
        <Grid.Col span={6}>
          <Card withBorder>
            <Text fw={700} fs="12">
              Total Vehicles
            </Text>
            <Divider my="md" />
            <Text fw={700} fs="24">
              {totalVehicles}
            </Text>
          </Card>
        </Grid.Col>
        <Grid.Col span={6}>
          <Card withBorder>
            <Text fw={700} fs="12">
              Recent Additions
            </Text>
            <Divider my="md" />
            {/* <Text fw={700} fs="24">
              <ul>
                {sortedCars.map((vehicle) => (
                  <li className="list-disc" key={vehicle.id}>
                    <Text fw={500}>
                      {vehicle.make} {vehicle.model} -{" "}
                      {new Date(vehicle.createdAt).toDateString()}
                    </Text>
                  </li>
                ))}
              </ul>
            </Text> */}
            <Table verticalSpacing="md">
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Car</Table.Th>
                  <Table.Th>Added On</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {slicedSortedCars.map((vehicle) => (
                  <Table.Tr key={vehicle.id}>
                    <Table.Td>
                      {vehicle.make} {vehicle.model}
                    </Table.Td>
                    <Table.Td>
                      {new Date(vehicle.createdAt).toDateString()}
                    </Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </Card>
        </Grid.Col>
      </Grid>
      <div className="absolute bottom-10 right-10 w-full flex justify-end items-center"></div>
    </div>
  );
}
