import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as immutable from 'object-path-immutable';
import {View, TouchableOpacity, Text} from 'react-native';
import {responsiveWidth} from 'react-native-responsive-dimensions';
import MaterialCommIcon from 'react-native-vector-icons/MaterialCommunityIcons';
// Lib
import {Functions, Services} from 'lib';
import {ActivityIndicator, Title} from 'react-native-paper';

//Style
import styleVar from 'styles/_variables';
import Style from './style';

//component
import {MenusListOfElements} from 'components';

//field
import {PageMsg} from 'fields';

const {SortMenuItems} = Functions.FoodMenuFuncs;
const {Merchants} = Services;
const {GetShopAllItems} = Merchants.GetRequests;

export class AllItems extends Component {
  state = {allItems: {}, isRefreshing: false};
  componentDidMount = () => this.onGetAllItems();

  componentWillUnmount = () => {
    this.setState({isGettingItems: false});
    this.setState = () => {
      return;
    };
  };

  onGetAllItems = async () => {
    this.setState({isGettingItems: true});
    const {allItems} = await GetShopAllItems({shopID: this.props.shopID});
    this.setState({allItems, isGettingItems: false});
  };

  onHideCreateItemModal = () => this.setState({showCreateItemModal: false});

  onShowCreateItemModal = () => this.setState({showCreateItemModal: true});

  onUpdateItemsAfterCreateNew = ({itemID, itemInfo}) =>
    this.setState({
      allItems: immutable.set(this.state.allItems, itemID, itemInfo),
    });

  renderAllItems = () => (
    <MenusListOfElements.ListOfMenuItems
      itemProps={{isInEditMode: true}}
      items={this.state.allItems}
      sortedItemIDs={SortMenuItems(this.state.allItems)}
    />
  );

  renderCreateModal = () => <View>Modals.MenuItemModal</View>;
  renderRefreshButton = () => {
    return (
      <View style={Style.elementContainer}>
        <TouchableOpacity
          style={Style.expandRefreshButton}
          onPress={this.onGetAllItems}>
          <MaterialCommIcon
            name="refresh"
            size={responsiveWidth(1.6)}
            style={Style.btnIcon}
          />
          <Text style={Style.btnLabel}>Refresh</Text>
        </TouchableOpacity>
      </View>
    );
  };
  renderContent = () => {
    const {allItems} = this.state;
    const itemCount = Object.keys(allItems).length;
    return (
      <View style={Style.container}>
        <View style={Style.headingGroup}>
          <Title style={Style.heading}>{`${itemCount} Items`}</Title>
          {this.renderRefreshButton()}
        </View>
        {this.state.showCreateItemModal && this.renderCreateModal()}
        {this.renderAllItems()}
      </View>
    );
  };

  render() {
    if (this.state.isGettingItems)
      return (
        <PageMsg>
          <ActivityIndicator
            size={styleVar.isSmallScreen ? 'small' : 'large'}
            color={styleVar.skipli_red_color}
          />
        </PageMsg>
      );
    return this.renderContent();
  }
}

AllItems.propTypes = {
  shopID: PropTypes.string.isRequired,
};

export default AllItems;
