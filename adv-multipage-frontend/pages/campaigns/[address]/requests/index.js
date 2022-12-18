import { useEffect, useState } from "react";
import NextLink from "next/link"
import { useRouter } from "next/router";
import { Box, Button, Flex, Link, Text } from "@chakra-ui/react"
import getCampaignContract from "../../../../utils/getCampaignContract";

const ViewRequests = () => {
    const router = useRouter();
    const { address: contractAddress } = router.query;

    const [requests, setRequests] = useState(null);

    useEffect(() => {
        const main = async () => {
            try {
                const campaignFactory = await getCampaignContract(contractAddress);

                const noOfRequests = (await campaignFactory.getRequestsCount()).toNumber();

                const fetchedRequests = [];

                for (let i = 0; i < noOfRequests; i++) {
                    const { description,
                        value,
                        recipient,
                        complete,
                        approvalCount } = await campaignFactory.requests(i);

                    fetchedRequests.push({
                        description,
                        value: value.toNumber(),
                        recipient,
                        complete,
                        approvalCount: approvalCount.toNumber(),
                    })
                }

                setRequests(fetchedRequests);
            }
            catch (err) {
                console.log(err.message)
            }
        };
        main();
    }, []);

    const approveRequestHandler = async (index) => {
        try {
            const campaignFactory = await getCampaignContract(contractAddress);
            campaignFactory.approveRequest(index);
        }
        catch (err) {
            alert(err.message)
        }
    };

    const finalizeRequestHandler = async (index) => {
        try {
            const campaignFactory = await getCampaignContract(contractAddress);
            campaignFactory.finalizeRequest(index);
        }
        catch (err) {
            alert(err.message)
        }
    }

    return (
        <Box>
            <>
                {
                    requests?.map(({
                        description,
                        value,
                        recipient,
                        complete,
                        approvalCount,
                    }, index) => <Box border="2px solid grey" margin="40px" padding="20px" key={index}>
                            <Text>Description - {description}</Text>
                            <Text>Value - {value}</Text>
                            <Text>Recipient - {recipient}</Text>
                            <Text>Complete - {complete ? "true" : "false"}</Text>
                            <Text>Approval Count - {approvalCount}</Text>
                            <Button margin={5} colorScheme="green" onClick={() => approveRequestHandler(index)}>Approve</Button>
                            <Button margin={5} colorScheme="linkedin" onClick={() => finalizeRequestHandler(index)}>Finalize</Button>
                        </Box>)
                }
            </>
            <Text fontSize={20} backgroundColor="red.100" width="fit-content" borderRadius={10} padding="10px 30px" marginTop={20} marginLeft={10}>
                <Link as={NextLink} href={`/campaigns/${contractAddress}/requests/new`} _hover={{ textDecoration: "none" }}>
                    Add Request
                </Link>
            </Text>
        </Box>
    )
}

export default ViewRequests;