"use client";
import { Tabs, rem, Loader, Paper, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import { generateClient } from "aws-amplify/api";
import toast, { Toaster } from "react-hot-toast";
import { pick } from "lodash";
import {
  createVehicle,
  updateVehicle,
  deleteVehicle,
} from "@/src/graphql/mutations";
import { getVehicle } from "@/src/graphql/queries";
import {
  type CreateVehicleInput,
  type UpdateVehicleInput,
  type DeleteVehicleInput,
  type Vehicle,
} from "@/src/API";
import _ from "lodash";

// Initial state of the form to create new entry
const initialState: CreateVehicleInput = {
  make: "",
  model: "",
  year: 1999,
  color: "",
};

// Retrieved state of the form to update entry
const retrievedState: UpdateVehicleInput = {
  id: "",
  make: "",
  model: "",
  year: 1999,
  color: "",
};
const client = generateClient();

// Toast Notifier
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
  const [isLoading, setIsLoading] = useState<Boolean>(false); // loading state for submissions
  const [formState, setFormState] = useState<CreateVehicleInput>(initialState); // initial state for create form
  const [entry, setEntry] = useState<Vehicle[] | CreateVehicleInput[]>([]); // state holding the vehicle data to be created
  const [vehicleID, setVehicleID] = useState({ id: "" }); // state holding vehicle id for update and delete operations
  const [retrievedData, setRetrievedData] = useState<any>({});

  // function to create a new vehicle entry
  async function addVehicle() {
    try {
      setIsLoading(true);
      if (
        !formState.make ||
        !formState.year ||
        !formState.color ||
        !formState.model
      ) {
        setIsLoading(false);
        toast.error("Please fill in all fields");
        return;
      }

      const data = { ...formState };
      setEntry([...entry, data]);

      await client.graphql({
        query: createVehicle,
        variables: { input: data },
      });
      setFormState(initialState);
      notify();
      setIsLoading(false);
    } catch (error) {
      console.log("Error creating entry", error);
    }
  }

  // function to fetch vehicle by ID
  async function fetchVehicleByID(id: string) {
    try {
      setIsLoading(true);
      const vehicleData = await client.graphql({
        query: getVehicle,
        variables: { id: id },
      });
      return vehicleData;
      setIsLoading(false);
    } catch (error) {
      console.log("error fetching vehicles");
    }
  }

  // function to fetch a single vehicle from its ID
  async function fetchAndUpdateVehicle(id: string) {
    try {
      const vehicleData = await fetchVehicleByID(id);
      const vehicle = vehicleData?.data?.getVehicle;
      const selectedVehicleData = _.pick(vehicle, [
        "id",
        "make",
        "model",
        "year",
        "color",
      ]);
      console.log(vehicle);
      setRetrievedData({ ...selectedVehicleData });
      console.log(retrievedData);
      setIsLoading(false);
    } catch (error) {
      console.log("error fetching vehicles");
    }
  }

  // function to fetch and delete a single vehicle from its ID
  async function fetchAndDeleteVehicle(id: string) {
    try {
      const vehicleData = await fetchVehicleByID(id);
      const vehicle = vehicleData?.data?.getVehicle;
      const selectedVehicleData = _.pick(vehicle, [
        "id",
        "make",
        "model",
        "year",
        "color",
      ]);
      setRetrievedData({ ...selectedVehicleData });
      console.log(retrievedData);
      setIsLoading(false);
      setVehicleID({ id: "" });
    } catch (error) {
      console.log("error fetching vehicles");
    }
  }

  // function to update a single vehicle from its ID
  async function updateEntry() {
    try {
      setIsLoading(true); // set loading state
      Object.assign(retrievedState, retrievedData); // transfer state object to update object
      if (
        !retrievedState.make &&
        !retrievedState.year &&
        !retrievedState.color &&
        !retrievedState.model
      ) {
        setIsLoading(false);
        toast.error("At least one entry is required");
        return;
      }

      const data = { ...retrievedState }; // spread update object into data variable
      await client.graphql({
        query: updateVehicle,
        variables: { input: data },
      });
      setRetrievedData({});
      toast.success("Entry Successfully Updated");
      setIsLoading(false);
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
            className="bg-teal-700 text-white flex justify-center items-center gap-3 rounded-sm p-2 max-w-32"
            onClick={addVehicle}
          >
            Submit
            {isLoading && <Loader color="rgba(255, 255, 255, 1)" size={15} />}
          </button>
          <Toaster position="top-right" />
        </div>
      </Tabs.Panel>
      <Tabs.Panel value="update" pt={rem(10)}>
        <div className="flex flex-col gap-4 justify-center">
          <label className="flex flex-col gap-2">
            <span className="text-sm font-bold">Enter Vehicle ID</span>
            <input
              className="border border-gray-400 h-10 p-4 rounded-sm text-black text-base"
              type="text"
              onChange={(e) =>
                setVehicleID({ ...vehicleID, id: e.target.value })
              }
              placeholder="Vehicle ID"
            />
          </label>

          <button
            className="bg-teal-700 text-white flex justify-center items-center gap-3 rounded-sm p-2 max-w-32"
            onClick={() => fetchAndUpdateVehicle(vehicleID?.id)}
          >
            Submit
            {isLoading && <Loader color="rgba(255, 255, 255, 1)" size={15} />}
          </button>
        </div>
        {retrievedData.id && (
          <div className="flex flex-col gap-4 justify-center mt-6">
            <label className="flex flex-col">
              <span className="text-sm font-bold">Make</span>
              <input
                className="border border-gray-400 h-10 p-4 rounded-sm text-black text-base"
                type="text"
                value={retrievedData?.make}
                onChange={(e) =>
                  setRetrievedData({ ...retrievedData, make: e.target.value })
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
                  setRetrievedData({ ...retrievedData, model: e.target.value })
                }
                value={retrievedData?.model}
                placeholder="(E.g Hilux, Camry)"
              />
            </label>
            <label className="flex flex-col">
              <span className="text-sm font-bold">Year</span>
              <input
                className="border border-gray-400 h-10 p-4 rounded-sm text-black text-base"
                type="text"
                onChange={(e) =>
                  setRetrievedData({
                    ...retrievedData,
                    year: parseInt(e.target.value),
                  })
                }
                readOnly={false}
                value={retrievedData?.year}
                placeholder="Year"
              />
            </label>
            <label className="flex flex-col">
              <span className="text-sm font-bold">Color</span>
              <input
                className="border border-gray-400 h-10 p-4 rounded-sm text-black text-base"
                type="text"
                onChange={(e) =>
                  setRetrievedData({ ...retrievedData, color: e.target.value })
                }
                value={retrievedData?.color}
                placeholder="Color"
              />
            </label>

            <button
              className="bg-teal-700 text-white flex justify-center items-center gap-3 rounded-sm p-2 max-w-32"
              onClick={updateEntry}
            >
              Update Entry
              {isLoading && <Loader color="rgba(255, 255, 255, 1)" size={15} />}
            </button>
            <Toaster position="top-right" />
          </div>
        )}
      </Tabs.Panel>
      <Tabs.Panel value="delete" pt={rem(10)}>
        <div className="flex flex-col gap-4 justify-center">
          <label className="flex flex-col gap-2">
            <span className="text-sm font-bold">Enter Vehicle ID</span>
            <input
              className="border border-gray-400 h-10 p-4 rounded-sm text-black text-base"
              type="text"
              onChange={(e) =>
                setVehicleID({ ...vehicleID, id: e.target.value })
              }
              placeholder="Vehicle ID"
            />
          </label>

          <button
            className="bg-teal-700 text-white flex justify-center items-center gap-3 rounded-sm p-2 max-w-32"
            onClick={() => fetchAndDeleteVehicle(vehicleID?.id)}
          >
            Submit
            {isLoading && <Loader color="rgba(255, 255, 255, 1)" size={15} />}
          </button>
        </div>
        <Paper shadow="xs" p="xl" mt="lg">
          <Text>Paper is the most basic ui component</Text>
          <Text>
            Use it to create cards, dropdowns, modals and other components that
            require background with shadow
          </Text>
        </Paper>
      </Tabs.Panel>
    </Tabs>
  );
}
