"use client";
import { withAuthenticator, useAuthenticator } from "@aws-amplify/ui-react";
import { useRouter } from "next/navigation";
import { getCurrentUser } from "aws-amplify/auth";
import { Grid, Card, Text, Divider, Flex, Button, Modal } from "@mantine/core";

export default function Dashboard() {
  const router = useRouter(); // for client-side navigation
  const { user, signOut } = useAuthenticator((context) => [context.user]);

  const handleLogout = () => {
    signOut();
    router.push("/");
  };

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
              10
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
      <div className="absolute bottom-10 right-10 w-full flex justify-end items-center">
        <Button variant="filled">Quick Action</Button>
      </div>
    </div>
  );
}
