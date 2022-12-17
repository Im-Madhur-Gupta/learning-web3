import { useRef } from "react";
import { Box, Button, Heading, Input } from "@chakra-ui/react";

const ContributeForm = ({ minContri, onContribute }) => {
  const contributionInputRef = useRef();
  const contributeHandler = async () => {
    const enteredVal = contributionInputRef.current.value;
    if (enteredVal < minContri) {
      return alert("Invalid contribution amount entered");
    }
    await onContribute(enteredVal);
  };
  return (
    <Box>
      <Heading margin="20px 0">Contribute to the campaign</Heading>
      <Input placeholder="enter amount" ref={contributionInputRef} />
      <Button marginTop="20px" onClick={contributeHandler}>
        Contribute
      </Button>
    </Box>
  );
};

export default ContributeForm;
