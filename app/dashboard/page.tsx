"use client";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { generateClient } from "aws-amplify/api";
import { useRouter } from "next/navigation";
import { useVehicleStore } from "@/providers/vehicle-store-provider";
import { useEffect, useState } from "react";
import { type Vehicle } from "@/src/API";
import { listVehicles } from "@/src/graphql/queries";
import { Grid, Card, Text, Divider, Flex, Skeleton } from "@mantine/core";
import RecentsTable from "../ui/dashboard/table";
import SummaryCard from "../ui/dashboard/summary-card";
import { BarChart } from "@mantine/charts";

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

  // array holding months each vehicle was created
  const timeOfCreation = vehicles.map((vehicle) => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const monthIndex = new Date(vehicle.createdAt).getMonth();
    return {
      id: vehicle.id,
      month: months[monthIndex],
      year: new Date(vehicle.createdAt).getFullYear(),
    };
  });

  const vehicleCountByMonth = new Map();

  timeOfCreation.forEach((vehicle) => {
    const key = `${vehicle.month}-${vehicle.year}`;
    if (vehicleCountByMonth.has(key)) {
      vehicleCountByMonth.set(key, vehicleCountByMonth.get(key) + 1);
    } else {
      vehicleCountByMonth.set(key, 1);
    }
  });

  const vehicleCountArray = Array.from(vehicleCountByMonth.entries()).map(
    ([key, value]) => ({
      month: key.split("-")[0],
      year: key.split("-")[1],
      Cars: value,
    })
  );

  vehicleCountArray.push(
    { month: "July", year: "2023", Cars: 0 },
    { month: "August", year: "2023", Cars: 0 },
    { month: "September", year: "2023", Cars: 0 }
  );

  console.log(timeOfCreation);
  console.log(vehicleCountArray);

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
      <Flex justify="between" gap="lg" direction="column">
        <Text size="lg" fw={700}>
          Dashboard
        </Text>

        <Text fw={600} size="sm">
          Key Metrics
        </Text>
      </Flex>
      <Grid grow>
        <Grid.Col span={4}>
          <Skeleton visible={fetching}>
            <SummaryCard description="Total Vehicles" value={totalVehicles} />
          </Skeleton>
        </Grid.Col>
        <Grid.Col span={4}>
          <SummaryCard description="Last Login" value={0} />
        </Grid.Col>
      </Grid>
      <Divider my="lg" />
      <Text size="lg" fw={700}>
        Welcome to your dashboard {user?.username}
      </Text>
      <Grid grow>
        <Grid.Col span={6}>
          <Card withBorder>
            <Skeleton visible={fetching}>
              <BarChart
                h={400}
                data={vehicleCountArray}
                xAxisLabel="Month"
                yAxisLabel="Amount of Car Entries"
                series={[{ name: "Cars", color: "teal" }]}
                dataKey="month"
                tickLine="y"
              />
            </Skeleton>
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
          </Card>
        </Grid.Col>
      </Grid>
    </div>
  );
}
