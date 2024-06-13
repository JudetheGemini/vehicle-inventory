import { Card, Text, Divider } from "@mantine/core";
import React from "react";

interface Props {
  description: string;
  value: number;
}

const SummaryCard: React.FC<Props> = ({ description, value }) => {
  return (
    <Card withBorder>
      <Text fw={700} fs="12">
        {description}
      </Text>
      <Divider my="md" />
      <Text fw={700} fs="24">
        {value}
      </Text>
    </Card>
  );
};

export default SummaryCard;
