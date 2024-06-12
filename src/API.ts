/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateVehicleInput = {
  id?: string | null,
  make: string,
  model: string,
  year: number,
  color: string,
};

export type ModelVehicleConditionInput = {
  make?: ModelStringInput | null,
  model?: ModelStringInput | null,
  year?: ModelIntInput | null,
  color?: ModelStringInput | null,
  and?: Array< ModelVehicleConditionInput | null > | null,
  or?: Array< ModelVehicleConditionInput | null > | null,
  not?: ModelVehicleConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type Vehicle = {
  __typename: "Vehicle",
  id: string,
  make: string,
  model: string,
  year: number,
  color: string,
  createdAt: string,
  updatedAt: string,
};

export type UpdateVehicleInput = {
  id: string,
  make?: string | null,
  model?: string | null,
  year?: number | null,
  color?: string | null,
};

export type DeleteVehicleInput = {
  id: string,
};

export type ModelVehicleFilterInput = {
  id?: ModelIDInput | null,
  make?: ModelStringInput | null,
  model?: ModelStringInput | null,
  year?: ModelIntInput | null,
  color?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelVehicleFilterInput | null > | null,
  or?: Array< ModelVehicleFilterInput | null > | null,
  not?: ModelVehicleFilterInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type ModelVehicleConnection = {
  __typename: "ModelVehicleConnection",
  items:  Array<Vehicle | null >,
  nextToken?: string | null,
};

export type ModelSubscriptionVehicleFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  make?: ModelSubscriptionStringInput | null,
  model?: ModelSubscriptionStringInput | null,
  year?: ModelSubscriptionIntInput | null,
  color?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionVehicleFilterInput | null > | null,
  or?: Array< ModelSubscriptionVehicleFilterInput | null > | null,
};

export type ModelSubscriptionIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  in?: Array< number | null > | null,
  notIn?: Array< number | null > | null,
};

export type CreateVehicleMutationVariables = {
  input: CreateVehicleInput,
  condition?: ModelVehicleConditionInput | null,
};

export type CreateVehicleMutation = {
  createVehicle?:  {
    __typename: "Vehicle",
    id: string,
    make: string,
    model: string,
    year: number,
    color: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateVehicleMutationVariables = {
  input: UpdateVehicleInput,
  condition?: ModelVehicleConditionInput | null,
};

export type UpdateVehicleMutation = {
  updateVehicle?:  {
    __typename: "Vehicle",
    id: string,
    make: string,
    model: string,
    year: number,
    color: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteVehicleMutationVariables = {
  input: DeleteVehicleInput,
  condition?: ModelVehicleConditionInput | null,
};

export type DeleteVehicleMutation = {
  deleteVehicle?:  {
    __typename: "Vehicle",
    id: string,
    make: string,
    model: string,
    year: number,
    color: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type GetVehicleQueryVariables = {
  id: string,
};

export type GetVehicleQuery = {
  getVehicle?:  {
    __typename: "Vehicle",
    id: string,
    make: string,
    model: string,
    year: number,
    color: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListVehiclesQueryVariables = {
  filter?: ModelVehicleFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListVehiclesQuery = {
  listVehicles?:  {
    __typename: "ModelVehicleConnection",
    items:  Array< {
      __typename: "Vehicle",
      id: string,
      make: string,
      model: string,
      year: number,
      color: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnCreateVehicleSubscriptionVariables = {
  filter?: ModelSubscriptionVehicleFilterInput | null,
};

export type OnCreateVehicleSubscription = {
  onCreateVehicle?:  {
    __typename: "Vehicle",
    id: string,
    make: string,
    model: string,
    year: number,
    color: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateVehicleSubscriptionVariables = {
  filter?: ModelSubscriptionVehicleFilterInput | null,
};

export type OnUpdateVehicleSubscription = {
  onUpdateVehicle?:  {
    __typename: "Vehicle",
    id: string,
    make: string,
    model: string,
    year: number,
    color: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteVehicleSubscriptionVariables = {
  filter?: ModelSubscriptionVehicleFilterInput | null,
};

export type OnDeleteVehicleSubscription = {
  onDeleteVehicle?:  {
    __typename: "Vehicle",
    id: string,
    make: string,
    model: string,
    year: number,
    color: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};
