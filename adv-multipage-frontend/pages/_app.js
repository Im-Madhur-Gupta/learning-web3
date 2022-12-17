import { useEffect } from 'react';
import { ChakraProvider, Text } from '@chakra-ui/react'
import useFactoryStore from "../store/useFactoryStore"
import getFactoryContract from '../utils/getFactoryContract'
import '../styles/globals.css'
import Link from 'next/link';

export default function App({ Component, pageProps }) {
  const setFactoryContract = useFactoryStore(state => state.setFactoryContract);
  useEffect(() => {
    const main = async () => {
      const factoryContract = await getFactoryContract();
      console.log("contract address: ", factoryContract.address);
      setFactoryContract(factoryContract);
    }
    main();
  }, []);
  return (<ChakraProvider>
    <>
      <Text padding="20px 50px" backgroundColor="red.100" fontSize="1.5rem" fontWeight="bold"><Link href="/">Campaings</Link></Text>
      <Component {...pageProps} />
    </>
  </ChakraProvider>)
}
