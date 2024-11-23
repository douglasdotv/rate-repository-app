import { NativeRouter } from 'react-router-native'
import { StatusBar } from 'expo-status-bar'
import { ApolloProvider } from '@apollo/client'
import { PaperProvider } from 'react-native-paper'
import createApolloClient from './src/utils/apolloClient'
import AuthStorage from './src/utils/authStorage'
import AuthStorageContext from './src/contexts/AuthStorageContext'
import Main from './src/components/Main'

const authStorage = new AuthStorage()
const apolloClient = createApolloClient(authStorage)

const App = () => {
  return (
    <>
      <NativeRouter
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <ApolloProvider client={apolloClient}>
          <AuthStorageContext.Provider value={authStorage}>
            <PaperProvider>
              <Main />
            </PaperProvider>
          </AuthStorageContext.Provider>
        </ApolloProvider>
      </NativeRouter>
      <StatusBar style="auto" />
    </>
  )
}

export default App
