import NextLink from "next/link";
import { Card, CardBody, Text, Link } from "@chakra-ui/react";

const CampaignCard = ({ address }) => {
  return (
    <Card style={{ margin: "10px 0" }}>
      <CardBody>
        <Text>{address}</Text>
        <Link as={NextLink} href={`/campaigns/${address}`}>
          View Campaign
        </Link>
      </CardBody>
    </Card>
  );
};

export default CampaignCard;
