import { useRef, useState } from 'react';
import { useRouter } from 'next/router'
import useFactoryStore from '../../store/useFactoryStore';
import { Button, Flex, Heading, Input, Spinner } from '@chakra-ui/react'

const CreateCampaign = () => {
    const router = useRouter();
    const factoryContract = useFactoryStore(state => state.factoryContract);
    const minContriInputRef = useRef();

    const [isLoading, setIsLoading] = useState(false);

    const createCampaignHandler = async () => {
        setIsLoading(true);
        try {
            const transaction = await factoryContract.createCampaign(+minContriInputRef.current.value);
            await transaction.wait();
            router.push("/");
        }
        catch (err) {
            alert(err.reason);
        }
        setIsLoading(false);
    }

    return (
        <Flex direction="column" width="60%" margin="0 auto" height="60vh" align="center" justify="space-evenly">
            <Heading>
                Create a Campaign
            </Heading>
            <Input ref={minContriInputRef} placeholder='min contribution (wei)' />
            {
                isLoading ? <Spinner /> :
                    <Button onClick={createCampaignHandler} width="50%">Create</Button>
            }
        </Flex>
    )
}

export default CreateCampaign;