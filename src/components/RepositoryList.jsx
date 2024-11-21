import React, { useState } from 'react'
import {
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Pressable,
  View,
} from 'react-native'
import { useNavigate } from 'react-router-native'
import { Menu, Button, Searchbar } from 'react-native-paper'
import { useDebounce } from 'use-debounce'
import useRepositories from '../hooks/useRepositories'
import RepositoryItem from './RepositoryItem'
import ItemSeparator from './ItemSeparator'
import Text from './Text'
import theme from '../theme'

const styles = StyleSheet.create({
  error: {
    color: theme.colors.error,
  },
  searchBar: {
    padding: 8,
    backgroundColor: theme.colors.backgroundPrimary,
  },
  menuContainer: {
    padding: 8,
    backgroundColor: theme.colors.backgroundPrimary,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.textSecondary,
    marginBottom: 8,
  },
})

const RepositoryListHeader = ({
  selectedOrder,
  setSelectedOrder,
  searchKeyword,
  setSearchKeyword,
}) => {
  const [visible, setVisible] = useState(false)

  const openMenu = () => setVisible(true)
  const closeMenu = () => setVisible(false)

  const handleSelection = (value) => {
    setSelectedOrder(value)
    closeMenu()
  }

  const getOrderLabel = () => {
    switch (selectedOrder) {
      case 'highest':
        return 'Highest rated repositories'
      case 'lowest':
        return 'Lowest rated repositories'
      default:
        return 'Latest repositories'
    }
  }

  return (
    <View>
      <View style={styles.searchBar}>
        <Searchbar
          placeholder="Search"
          value={searchKeyword}
          onChangeText={setSearchKeyword}
        />
      </View>
      <View style={styles.menuContainer}>
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={
            <Button mode="outlined" onPress={openMenu}>
              {getOrderLabel()}
            </Button>
          }
        >
          <Menu.Item
            onPress={() => handleSelection('latest')}
            title="Latest repositories"
          />
          <Menu.Item
            onPress={() => handleSelection('highest')}
            title="Highest rated repositories"
          />
          <Menu.Item
            onPress={() => handleSelection('lowest')}
            title="Lowest rated repositories"
          />
        </Menu>
      </View>
    </View>
  )
}

export class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    const { selectedOrder, setSelectedOrder, searchKeyword, setSearchKeyword } =
      this.props

    return (
      <RepositoryListHeader
        selectedOrder={selectedOrder}
        setSelectedOrder={setSelectedOrder}
        searchKeyword={searchKeyword}
        setSearchKeyword={setSearchKeyword}
      />
    )
  }

  render() {
    const { repositories, onPressItem } = this.props

    return (
      <FlatList
        data={repositories}
        renderItem={({ item }) => (
          <Pressable onPress={() => onPressItem(item.id)}>
            <RepositoryItem repository={item} />
          </Pressable>
        )}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={ItemSeparator}
        ListHeaderComponent={this.renderHeader}
      />
    )
  }
}

const RepositoryList = () => {
  const navigate = useNavigate()
  const [selectedOrder, setSelectedOrder] = useState('latest')
  const [searchKeyword, setSearchKeyword] = useState('')
  const [debouncedSearchKeyword] = useDebounce(searchKeyword, 500)

  const getOrderVariables = () => {
    const orders = {
      latest: { orderBy: 'CREATED_AT', orderDirection: 'DESC' },
      highest: { orderBy: 'RATING_AVERAGE', orderDirection: 'DESC' },
      lowest: { orderBy: 'RATING_AVERAGE', orderDirection: 'ASC' },
    }
    return orders[selectedOrder] || orders.latest
  }

  const variables = {
    ...getOrderVariables(),
    searchKeyword: debouncedSearchKeyword,
  }

  const { loading, error, repositories } = useRepositories(variables)

  if (loading) {
    return <ActivityIndicator />
  }

  if (error) {
    return <Text style={styles.error}>{error.message}</Text>
  }

  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : []

  const handleItemPress = (id) => navigate(`/repository/${id}`)

  return (
    <RepositoryListContainer
      repositories={repositoryNodes}
      onPressItem={handleItemPress}
      selectedOrder={selectedOrder}
      setSelectedOrder={setSelectedOrder}
      searchKeyword={searchKeyword}
      setSearchKeyword={setSearchKeyword}
    />
  )
}

export default RepositoryList
