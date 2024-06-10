"use client";
import { Tabs, rem, Loader, Paper, Text, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState, useRef } from "react";
import { generateClient } from "aws-amplify/api";
import toast, { Toaster } from "react-hot-toast";
import { useVehicleStore } from "@/providers/vehicle-store-provider";
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
const notify = (data: string) =>
  toast.custom((t) => (
    <div
      className={`${
        t.visible ? "animate-enter" : "animate-leave"
      } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
    >
      <div className="flex-1 w-0 p-4">
        <div className="flex items-start">
          <div className="ml-3 flex-1">
            <p className="text-sm font-medium text-gray-900">{data}</p>
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
  const [vehicleID, setVehicleID] = useState<DeleteVehicleInput>({ id: "" }); // state holding vehicle id for update and delete operations
  const [retrievedData, setRetrievedData] = useState<any>({});
  const [opened, { open, close }] = useDisclosure(false);
  const updateRef = useRef(null);
  const deleteRef = useRef(null);
  const { setTotalVehicles, totalVehicles } = useVehicleStore((state) => state);

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
      notify("Vehicle Entry Created");
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
  async function fetchAndSaveVehicle(id: string) {
    try {
      const vehicleData = await fetchVehicleByID(id);
      const vehicle = vehicleData?.data?.getVehicle;
      if (vehicle == null) {
        setRetrievedData(null);
        setIsLoading(false);
        return;
      }
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
    } catch (error) {
      console.log("error fetching vehicles");
    }
  }

  async function clearState() {
    setVehicleID({ id: "" });
    setRetrievedData({});
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
      notify("Entry Successfully Updated");
      if (updateRef.current) {
        updateRef.current.value = "";
      }
      setIsLoading(false);
      setRetrievedData({});
    } catch (error) {
      console.log("Error creating entry", error);
    }
  }

  async function deleteVehicleFromDB(id: DeleteVehicleInput) {
    try {
      setIsLoading(true); // set loading state
      if (!id) {
        setIsLoading(false);
        toast.error("Please enter vehicle ID");
        return;
      }
      await client.graphql({
        query: deleteVehicle,
        variables: { input: id },
      });
      notify("Entry successfully deleted");
      if (deleteRef.current) {
        deleteRef.current.value = "";
      }
      setIsLoading(false);
      setVehicleID({ id: "" });
      setRetrievedData({});
    } catch (error) {
      console.log("Error creating entry", error);
    }
  }

  return (
    <Tabs defaultValue="create" color="teal">
      <Tabs.List>
        <Tabs.Tab value="create">Create Entry</Tabs.Tab>
        <Tabs.Tab value="update" onClick={clearState}>
          Update Entry
        </Tabs.Tab>
        <Tabs.Tab value="delete" onClick={clearState}>
          Delete Entry
        </Tabs.Tab>
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
              ref={updateRef}
              onChange={(e) =>
                setVehicleID({ ...vehicleID, id: e.target.value })
              }
              placeholder="Vehicle ID"
            />
          </label>
          {!retrievedData?.id && (
            <button
              className="bg-teal-700 text-white flex justify-center items-center gap-3 rounded-sm p-2 max-w-32"
              onClick={() => fetchAndSaveVehicle(vehicleID?.id)}
            >
              Submit
              {isLoading && <Loader color="rgba(255, 255, 255, 1)" size={15} />}
            </button>
          )}

          <Toaster position="top-right" />
        </div>
        {retrievedData === null ? (
          <div className="mt-8 flex flex-col gap-6 justify-center">
            <p className="text-center font-bold text-xl">No entry found</p>
            <p className="text-center text-gray-500 text-sm">
              ID may be wrong or entry no longer exists
            </p>
          </div>
        ) : null}
        {retrievedData?.id && (
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
              ref={deleteRef}
              onChange={(e) =>
                setVehicleID({ ...vehicleID, id: e.target.value })
              }
              placeholder="Vehicle ID"
            />
          </label>

          <button
            className="bg-teal-700 text-white flex justify-center items-center gap-3 rounded-sm p-2 max-w-32"
            onClick={() => fetchAndSaveVehicle(vehicleID?.id)}
          >
            Submit
            {isLoading && <Loader color="rgba(255, 255, 255, 1)" size={15} />}
          </button>
          <Toaster position="top-right" />
        </div>
        {retrievedData === null ? (
          <div className="mt-4 flex justify-center">
            <p className="text-center font-bold text-xl">No entry found</p>
          </div>
        ) : null}
        {retrievedData?.id && (
          <Paper
            shadow="xs"
            p="xl"
            mt="lg"
            className="flex flex-col gap-10 space-y-4 relative"
          >
            <Text size="lg" fw={600} className="text-base font-bold">
              Vehicle Details
            </Text>
            <Text size="md" fw={500} className="text-base font-semibold">
              ID: {retrievedData?.id}
            </Text>
            <Text size="md" fw={500} className="text-base font-semibold">
              Make: {retrievedData?.make}
            </Text>
            <Text size="md" fw={500} className="text-base font-semibold">
              Model: {retrievedData?.model}
            </Text>
            <Text size="md" fw={500} className="text-base font-semibold">
              Year: {retrievedData?.year}
            </Text>
            <Text size="md" fw={500} className="text-base font-semibold">
              Color: {retrievedData?.color}
            </Text>
            <Modal opened={opened} onClose={close}>
              <div className="flex flex-col gap-4 items-center">
                <p className="font-semibold text-base">
                  Are you sure you want to delete this entry?
                </p>
                <button
                  className="bg-teal-700 text-white p-2 rounded-sm"
                  onClick={() => {
                    deleteVehicleFromDB(vehicleID);
                    close;
                  }}
                >
                  Delete
                </button>
              </div>
            </Modal>
            <button
              onClick={open}
              className="bg-teal-700 absolute right-10 bottom-10 text-white p-2 rounded-sm"
            >
              Proceed to delete
            </button>
          </Paper>
        )}
      </Tabs.Panel>
    </Tabs>
  );
}
