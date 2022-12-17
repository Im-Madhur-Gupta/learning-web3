import { Card, CardBody, Text } from "@chakra-ui/react";

const CampaignCard = ({ address }) => {
  return (
    <Card style={{margin: "10px 0"}}>
      <CardBody>
        <Text>{address}</Text>
        <a href="">View Campaign</a>
      </CardBody>
    </Card>
  );
};

export default CampaignCard;
