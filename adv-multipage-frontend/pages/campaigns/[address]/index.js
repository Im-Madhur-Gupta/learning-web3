import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import getCampaignContract from "../../../utils/getCampaignContract";
import { Box, Flex, Heading, Link, Text } from "@chakra-ui/react";
import ContributeForm from "../../../components/ContributeForm";
import NextLink from "next/link";

let campaignFactory = null;

const Campaign = () => {
    const router = useRouter();
    const { address: contractAddress } = router.query;

    const [summary, setSummary] = useState({
        minContri: -1,
        balance: -1,
        requestCount: -1,
        approverCount: -1,
        managerAddress: ""
    });

    const contributeHandler = async (enteredVal) => {
        if (campaignFactory) {
            const transaction = await campaignFactory.contribute({ value: enteredVal });
            await transaction.wait();
            window.location.reload();
        }
    }

    useEffect(() => {
        if (contractAddress) {
            try {
                const main = async () => {
                    campaignFactory = await getCampaignContract(contractAddress);
                    const fetchedSummary = await campaignFactory.getSummary();
                    setSummary({
                        minContri: fetchedSummary[0].toNumber(),
                        balance: fetchedSummary[1].toNumber(),
                        requestCount: fetchedSummary[2].toNumber(),
                        approverCount: fetchedSummary[3].toNumber(),
                        managerAddress: fetchedSummary[4]
                    })
                }
                main();
            }
            catch (err) {
                console.log(err);
            }
        }
    }, [contractAddress])
    return (
        <>
            <Flex padding="40px">
                <Box width="60%">
                    <Heading margin="20px 0">Contract Details</Heading>
                    <Text>Contract Address - {contractAddress}</Text>
                    <Text>Manager Address - {summary.managerAddress}</Text>
                    <Text>Minimum Contrbution - {summary.minContri}</Text>
                    <Text>Balance - {summary.balance}</Text>
                    <Text>Requests - {summary.requestCount}</Text>
                    <Text>Approvers - {summary.approverCount}</Text>
                </Box>
                <ContributeForm minContri={summary.minContri} onContribute={contributeHandler} />
            </Flex>
            <Text fontSize={20} backgroundColor="red.100" width="fit-content" borderRadius={10} padding="10px 30px" marginTop={20} marginLeft={10}>
                <Link as={NextLink} href={`/campaigns/${contractAddress}/requests`} _hover={{ textDecoration: "none" }}>
                    View Requests
                </Link>
            </Text>
        </>
    );
}

export default Campaign;