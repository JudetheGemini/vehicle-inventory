"use client";
import { Tabs, rem } from "@mantine/core";
import { useEffect, useState } from "react";
import { generateClient } from "aws-amplify/api";
import { createVehicle } from "@/src/graphql/mutations";
import { type CreateVehicleInput, type Vehicle } from "@/src/API";

const initialState: CreateVehicleInput = {
  make: "",
  model: "",
  year: 0,
  color: "",
};
const client = generateClient();

export default function ManageVehicleHome() {
  const [formState, setFormState] = useState<CreateVehicleInput>(initialState);
  const [entry, setEntry] = useState<Vehicle[] | CreateVehicleInput[]>([]);

  // function to create a new vehicle entry
  async function addVehicle() {
    try {
      if (
        !formState.make ||
        !formState.year ||
        !formState.color ||
        !formState.model
      )
        return;
      const data = { ...formState };
      setEntry([...entry, data]);
      setFormState(initialState);
      await client.graphql({
        query: createVehicle,
        variables: { input: data },
      });
    } catch (error) {
      console.log("Error creating entry", error);
    }
  }
  return (
    <Tabs defaultValue="create" color="teal">
      <Tabs.List>
        <Tabs.Tab value="create">Create Entry</Tabs.Tab>
        <Tabs.Tab value="update">Update Entry</Tabs.Tab>
        <Tabs.Tab value="delete">Delete Entry</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="create" pt={rem(10)}>
        Create Entry
        <div className="flex flex-col gap-4 justify-center">
          <input
            className="border border-gray-800 rounded-md text-lg"
            type="text"
            value={formState.make}
            onChange={(e) =>
              setFormState({ ...formState, make: e.target.value })
            }
            placeholder="Make"
          />

          <input
            className="border border-gray-800 rounded-md text-lg"
            type="text"
            onChange={(e) =>
              setFormState({ ...formState, model: e.target.value })
            }
            value={formState.model}
            placeholder="Model"
          />
          <input
            className="border border-gray-800 rounded-md text-lg"
            type="text"
            onChange={(e) =>
              setFormState({ ...formState, year: parseInt(e.target.value) })
            }
            value={formState.year}
            placeholder="Year"
          />
          <input
            className="border border-gray-800 rounded-md text-lg"
            type="text"
            onChange={(e) =>
              setFormState({ ...formState, color: e.target.value })
            }
            value={formState.color}
            placeholder="Color"
          />
          <button onClick={addVehicle}>Submit</button>
        </div>
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
