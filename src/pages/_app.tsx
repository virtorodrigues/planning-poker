import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from '../styles/theme'
import { UserProvider } from '../core/contexts/user'
import { TaskTitleProvider } from '../core/contexts/taskTitle'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <UserProvider>
        <TaskTitleProvider>
          <Component {...pageProps} />
        </TaskTitleProvider>
      </UserProvider>
    </ChakraProvider>
  )
}

export default MyApp
