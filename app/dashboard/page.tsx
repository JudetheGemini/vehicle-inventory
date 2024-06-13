"use client";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { generateClient } from "aws-amplify/api";
import { useRouter } from "next/navigation";
import { useLoginStore } from "@/utils/zustand";
import { useVehicleStore } from "@/providers/vehicle-store-provider";
import { useEffect, useState } from "react";
import { Suspense } from "react";
import { type Vehicle } from "@/src/API";
import { listVehicles } from "@/src/graphql/queries";
import { Grid, Card, Text, Divider, Flex, Skeleton } from "@mantine/core";
import RecentsTable from "../ui/dashboard/table";
import SummaryCard from "../ui/dashboard/summary-card";

const client = generateClient();

export default function Dashboard() {
  const router = useRouter(); // for client-side navigation
  const { user, signOut } = useAuthenticator((context) => [context.user]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [fetching, setFetching] = useState(true);
  const { setTotalVehicles, totalVehicles } = useVehicleStore((state) => state);
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
      setFetching(false);
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
          <Skeleton visible={fetching}>
            <SummaryCard description="Total Vehicles" value={totalVehicles} />
          </Skeleton>
        </Grid.Col>
        <Grid.Col span={3}>
          <SummaryCard description="Last Activity" value={0} />
        </Grid.Col>
        <Grid.Col span={3}>
          <SummaryCard description="Total Users" value={0} />
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

            <Skeleton visible={fetching}>
              {vehicles.length === 0 && <Text>No vehicles found</Text>}
              {vehicles.length > 0 && (
                <RecentsTable sortedVehicles={slicedSortedCars} />
              )}
            </Skeleton>

            {/* <RecentsTable sortedVehicles={slicedSortedCars} /> */}
          </Card>
        </Grid.Col>
      </Grid>
      <div className="absolute bottom-10 right-10 w-full flex justify-end items-center"></div>
    </div>
  );
}
