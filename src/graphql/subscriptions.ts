/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreateVehicle = /* GraphQL */ `subscription OnCreateVehicle($filter: ModelSubscriptionVehicleFilterInput) {
  onCreateVehicle(filter: $filter) {
    id
    make
    model
    year
    color
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateVehicleSubscriptionVariables,
  APITypes.OnCreateVehicleSubscription
>;
export const onUpdateVehicle = /* GraphQL */ `subscription OnUpdateVehicle($filter: ModelSubscriptionVehicleFilterInput) {
  onUpdateVehicle(filter: $filter) {
    id
    make
    model
    year
    color
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateVehicleSubscriptionVariables,
  APITypes.OnUpdateVehicleSubscription
>;
export const onDeleteVehicle = /* GraphQL */ `subscription OnDeleteVehicle($filter: ModelSubscriptionVehicleFilterInput) {
  onDeleteVehicle(filter: $filter) {
    id
    make
    model
    year
    color
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteVehicleSubscriptionVariables,
  APITypes.OnDeleteVehicleSubscription
>;
