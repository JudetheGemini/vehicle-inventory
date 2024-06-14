import { Table, Skeleton } from "@mantine/core";
import { type Vehicle } from "@/src/API";
import timeAgo from "@/utils/date";

interface Props {
  sortedVehicles: Vehicle[];
}

const RecentsTable: React.FC<Props> = ({ sortedVehicles }) => {
  return (
    <Table verticalSpacing="md">
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Car</Table.Th>
          <Table.Th>Time Period</Table.Th>
        </Table.Tr>
      </Table.Thead>

      <Table.Tbody>
        {sortedVehicles ? (
          sortedVehicles.map((vehicle) => (
            <Table.Tr key={vehicle.id}>
              <Table.Td>
                {vehicle.make} {vehicle.model}
              </Table.Td>
              <Table.Td>{timeAgo(vehicle.createdAt)}</Table.Td>
            </Table.Tr>
          ))
        ) : (
          <Skeleton height={150} />
        )}
      </Table.Tbody>
    </Table>
  );
};

export default RecentsTable;
