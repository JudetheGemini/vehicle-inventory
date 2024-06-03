"use client";
import { Tabs, rem } from "@mantine/core";

export default function ManageVehicleHome() {
  return (
    <Tabs defaultValue="create" color="teal">
      <Tabs.List>
        <Tabs.Tab value="create">Create Entry</Tabs.Tab>
        <Tabs.Tab value="update">Update Entry</Tabs.Tab>
        <Tabs.Tab value="delete">Delete Entry</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="create" pt={rem(10)}>
        Create Entry
      </Tabs.Panel>
      <Tabs.Panel value="update" pt={rem(10)}>
        Update Entry
      </Tabs.Panel>
      <Tabs.Panel value="delete" pt={rem(10)}>
        Delete Entry
      </Tabs.Panel>
    </Tabs>
  );
}
