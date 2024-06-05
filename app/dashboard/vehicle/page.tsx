"use client";
import { Tabs, rem } from "@mantine/core";
import { useEffect, useState } from "react";
import { generateClient } from "aws-amplify/api";
import toast, { Toaster } from "react-hot-toast";
import {
  createVehicle,
  updateVehicle,
  deleteVehicle,
} from "@/src/graphql/mutations";
import {
  type CreateVehicleInput,
  type UpdateVehicleInput,
  type DeleteVehicleInput,
  type Vehicle,
} from "@/src/API";

// Initial state of the form to create new entry
const initialState: CreateVehicleInput = {
  make: "",
  model: "",
  year: 1999,
  color: "",
};
const client = generateClient();

const notify = () =>
  toast.custom((t) => (
    <div
      className={`${
        t.visible ? "animate-enter" : "animate-leave"
      } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
    >
      <div className="flex-1 w-0 p-4">
        <div className="flex items-start">
          <div className="ml-3 flex-1">
            <p className="text-sm font-medium text-gray-900">
              Vehicle Entry Created
            </p>
          </div>
        </div>
      </div>
      <div className="flex border-l border-gray-200">
        <button
          onClick={() => toast.dismiss(t.id)}
          className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Close
        </button>
      </div>
    </div>
  ));

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

      await client.graphql({
        query: createVehicle,
        variables: { input: data },
      });
      setFormState(initialState);
      notify();
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

      <Tabs.Panel value="create" className="px-2 md:px-16" pt={rem(16)}>
        <div className="flex flex-col gap-4 justify-center">
          <label className="flex flex-col">
            <span className="text-sm font-bold">Make</span>
            <input
              className="border border-gray-400 h-10 p-4 rounded-sm text-black text-base"
              type="text"
              value={formState.make}
              onChange={(e) =>
                setFormState({ ...formState, make: e.target.value })
              }
              placeholder="(E.g Honda, Toyota)"
            />
          </label>

          <label className="flex flex-col">
            <span className="text-sm font-bold">Model</span>
            <input
              className="border border-gray-400 h-10 p-4 rounded-sm text-black text-base"
              type="text"
              onChange={(e) =>
                setFormState({ ...formState, model: e.target.value })
              }
              value={formState.model}
              placeholder="(E.g Hilux, Camry)"
            />
          </label>
          <label className="flex flex-col">
            <span className="text-sm font-bold">Year</span>
            <input
              className="border border-gray-400 h-10 p-4 rounded-sm text-black text-base"
              type="text"
              onChange={(e) =>
                setFormState({ ...formState, year: parseInt(e.target.value) })
              }
              value={formState.year}
              placeholder="Year"
            />
          </label>
          <label className="flex flex-col">
            <span className="text-sm font-bold">Color</span>
            <input
              className="border border-gray-400 h-10 p-4 rounded-sm text-black text-base"
              type="text"
              onChange={(e) =>
                setFormState({ ...formState, color: e.target.value })
              }
              value={formState.color}
              placeholder="Color"
            />
          </label>

          <button
            className="bg-teal-700 text-white rounded-sm p-2 max-w-32"
            onClick={addVehicle}
          >
            Submit
          </button>
          <Toaster position="top-right" />
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
