import React, {Component} from 'react';
import {Text, View, FlatList} from 'react-native';
import {Title} from 'react-native-paper';
import PropTypes from 'prop-types';

//field
import {PageMsg} from 'fields';

//style
import CommonStyle from '../style';
import styleVar from 'styles/_variables';
import MenusManagement from 'components/MenusManagement';

export class ListOfMenuItems extends Component {
  renderItem = data => {
    const itemID = data.item;
    return (
      <View style={[CommonStyle.elementContainer]}>
        <MenusManagement.Item
          {...this.props.itemProps}
          itemHelperButton={this.props.itemHelperButton}
          itemID={itemID}
          itemInfo={this.props.items[itemID]}
        />
      </View>
    );
  };
  render() {
    const {items = {}, sortedItemIDs} = this.props;
    if (Object.keys(items).length === 0)
      return (
        <PageMsg>
          <Title style={CommonStyle.emptyListMessage}>
            {this.props.emptyListMessage}
          </Title>
        </PageMsg>
      );
    return (
      <FlatList
        showsVerticalScrollIndicator={false}
        initialNumToRender={25}
        data={sortedItemIDs}
        keyExtractor={(itemID, index) => `${itemID}-${index}`}
        renderItem={this.renderItem}
        numColumns={styleVar.isSmallScreen ? 1 : 2}
        contentContainerStyle={[
          CommonStyle.listContainer,
          this.props.listContainerStyle,
        ]}
      />
    );
  }
}

export default ListOfMenuItems;
