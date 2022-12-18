import { useRouter } from "next/router";
import { useRef } from "react";
import { Button, Flex, Heading, Input } from "@chakra-ui/react";
import getCampaignContract from "../../../../utils/getCampaignContract";

const CreateRequest = () => {
    const router = useRouter();
    const { address: contractAddress } = router.query;

    const descriptionInputRef = useRef();
    const valueInputRef = useRef();
    const recipientInputRef = useRef();

    const addRequestHandler = async () => {
        try {
            const campaignFactory = await getCampaignContract(contractAddress);

            const enteredDesc = descriptionInputRef.current.value;
            const enteredValue = valueInputRef.current.value;
            const enteredRecipientAddress = recipientInputRef.current.value;

            if (!enteredDesc || !enteredValue || !enteredRecipientAddress) {
                return alert("Invalid field data entered");
            }

            console.log("Loading...");
            await campaignFactory.createRequest(enteredDesc, enteredValue, enteredRecipientAddress);
            console.log("Request Created");
        }
        catch (err) {
            console.log(err.message)
        }
    };
    return (
        <Flex direction="column" padding={10}>
            <Heading margin="20px 0">Create a request</Heading>
            <Input width="40%" marginY={5} placeholder="enter description" ref={descriptionInputRef} />
            <Input width="40%" marginY={5} placeholder="enter value" ref={valueInputRef} />
            <Input width="40%" marginY={5} placeholder="enter recipient address" ref={recipientInputRef} />
            <Button width="20%" marginTop="20px" onClick={addRequestHandler}>
                Add Request
            </Button>
        </Flex>
    );
};

export default CreateRequest;
