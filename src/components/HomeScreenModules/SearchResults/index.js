// BUTI DINERS, INC. All right Reserved ©

import React from 'react';
import PropTypes from 'prop-types';
const {LocalStorage} = Functions;

import {View, Text, Keyboard, TouchableOpacity, ScrollView} from 'react-native';
import {
  ActivityIndicator,
  TouchableRipple,
  RadioButton,
  IconButton,
} from 'react-native-paper';

import Notice from './Notice';
import {AuthInterfaceConsumer, withContext} from 'context';

//Utils
import {_formatPhoneNumber} from 'utils';

//Icon
import {SendEmailIcon, PhoneIcon} from 'assets/Icons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

//Lib
import {Services, Functions} from 'lib';

//Styles
import colors from 'styles/_variables';
import Style from './styles';

//field
import {Input} from 'fields';
const {TextInput} = Input;

import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import AsyncStorage from '@react-native-async-storage/async-storage';
// Sentry
import * as Sentry from '@sentry/react-native';

class SearchResults extends React.Component {
  state = {searchResults: {}, searchingForShop: true};
  _isMounted = false;
  componentDidMount = async () => {
    this._isMounted = true;
    this.onSearchShop();

    const personnelID = await LocalStorage.getItemFromStorage('personnelID');
    if (personnelID) {
      const address = (await LocalStorage.getItemFromStorage('address')) ?? '';
      const name = (await LocalStorage.getItemFromStorage('name')) ?? '';
      const shopID = (await LocalStorage.getItemFromStorage('shopID')) ?? '';
      this.onSelectShop(shopID, name, address);
    }
  };

  componentWillUnmount() {
    // tells the component that component is now unmounted
    this._isMounted = false;
  }

  onSearchShop = async () => {
    if (this._isMounted) {
      Keyboard.dismiss();
      const {BUTI, Merchants} = Services;
      const {SearchShopsForMerchantDashboard} = BUTI.GetRequests;
      const {GetShopBasicInfo} = Merchants.GetRequests;
      const {shopName, shopID, searchBy} = this.props;
      if (shopName || shopID) {
        this.setState({searchingForShop: true, networkError: false});
        try {
          let results = {};
          if (searchBy === 'name') {
            const {matched_shops = {}} = await SearchShopsForMerchantDashboard({
              shopName,
            });
            results = matched_shops;
          } else {
            const {shopBasicInfo = {}} = await GetShopBasicInfo({
              shopID,
            });
            results = shopBasicInfo;
          }
          this.setState({searchResults: results});
        } catch (error) {
          Sentry.captureException(error, {
            extra: {
              message: "Error in SearchResults.onSearchShop",
              shopName,
              shopID,
            },
          });
          let err = String(error).toLowerCase();
          if (err.includes('network') || err.includes('timeout')) {
            this.setState({networkError: true});
          }
        } finally {
          this.setState({searchingForShop: false});
        }
      } else {
        this.setState({searchResults: {}});
      }
    }
  };

  onSelectShop = async (shopID, name, address) => {
    const {onLoadPersonnelInfo} = this.props.context;
    const personnelID = await LocalStorage.getItemFromStorage('personnelID');
    if (this._isMounted) {
      const {navigation} = this.props;
      const {LocalStorage} = Functions;
      LocalStorage.saveItemIntoStorage('shopID', shopID)
        .then(() => {
          if (personnelID) {
            onLoadPersonnelInfo(shopID);
          } else {
            navigation.navigate('PersonnelPin', {shopID, name, address});
          }
        })
        .catch(err => console.log(err));
    }
  };

  renderLoading = () => {
    if (this._isMounted) {
      return (
        <ActivityIndicator
          animating={true}
          color={colors.primary}
          size={colors.isSmallScreen ? 'small' : 'large'}
          style={{marginVertical: 30}}
        />
      );
    }
  };
  renderSearchInput = () => {
    if (this._isMounted) {
      const {searchBy, onChangeSearchType, onChangeSearchQuery} = this.props;
      const {searchingForShop} = this.state;
      return (
        <View style={Style.searchInput}>
          {this.renderTextInput(
            searchBy,
            onChangeSearchType,
            onChangeSearchQuery,
          )}
          <IconButton
            mode="contained"
            onPress={this.onSearchShop}
            disabled={false}
            color="white"
            icon={({color}) => (
              <MaterialIcon
                name="search"
                size={responsiveWidth(2.5)}
                color={color}
              />
            )}
            style={Style.glassIcon}
          />
        </View>
      );
    }
  };
  renderTextInput = (searchBy, onChangeSearchType, onChangeSearchQuery) => {
    if (this._isMounted) {
      return (
        <View style={Style.inputFieldContainer}>
          <TextInput
            onChangeText={onChangeSearchQuery}
            label={searchBy === 'name' ? 'Store Name' : 'Store ID'}
            mode="outlined"
            autoCapitalize="words"
            onSubmitEditing={this.onSearchShop}
          />
          <RadioButton.Group
            onValueChange={queryType => {
              this.setState({searchResults: {}});
              onChangeSearchType(queryType);
            }}
            value={searchBy}>
            <View style={Style.radioBtnContainer}>
              <Text style={{fontSize: responsiveFontSize(1)}}>
                Search Store By:{' '}
              </Text>
              <View style={Style.radioBtn}>
                <RadioButton value="name" color={colors.primary} />
                <Text style={Style.radioBtnLabel}>Name</Text>
              </View>
              <View style={Style.radioBtn}>
                <RadioButton value="id" color={colors.primary} />
                <Text style={Style.radioBtnLabel}>ID</Text>
              </View>
            </View>
          </RadioButton.Group>
        </View>
      );
    }
  };
  renderSearchResults = () => {
    if (this._isMounted) {
      const {searchResults = {}, networkError = false} = this.state;
      const {searchBy} = this.props;
      if (networkError == true) {
        return (
          <View style={Style.loading}>
            <Text
              style={{fontSize: responsiveFontSize(1), textAlign: 'center'}}>
              Can't retrieve your store information.{'\n'} Check your network
              connection
            </Text>
          </View>
        );
      }
      if (Object.keys(searchResults).length === 0)
        return (
          <View style={Style.loading}>
            <Text style={{fontSize: responsiveFontSize(1)}}>0 Results</Text>
          </View>
        );
      if (searchBy === 'name' && Object.keys(searchResults).length > 3) {
        return (
          <View style={Style.loading}>
            <Text style={Style.tooManyResults}>
              We found many shops that match your search. Please type the exact
              name of your shop for better result.
            </Text>
          </View>
        );
      }
      return <View>{this.renderShops(searchResults)}</View>;
    }
  };
  renderShops = (searchResults = {}) => {
    if (this._isMounted) {
      const {searchBy} = this.props;
      if (searchBy === 'name') {
        return Object.keys(searchResults).map(shopID => {
          const {address = '', name = ''} = searchResults[shopID];

          return this.renderItem(shopID, address, name);
        });
      } else if (searchBy === 'id') {
        const {address = '', name = '', id = ''} = searchResults;
        return this.renderItem(id, address, name);
      }
    }
  };
  renderItem = (shopID, address, name) => {
    if (this._isMounted) {
      if (shopID && address && name)
        return (
          <View key={shopID}>
            <TouchableOpacity
              onPress={() => this.onSelectShop(shopID, name, address)}
              style={Style.shop}>
              <View style={Style.shopInfo}>
                <Text style={Style.name}>{name}</Text>
                <Text style={Style.address}>{address}</Text>
              </View>
              <View style={Style.select}>
                <Text style={Style.selectText}>Select</Text>
                <MaterialIcon
                  name="arrow-forward"
                  size={responsiveWidth(2)}
                  color="black"
                  style={Style.selectIcon}
                />
              </View>
            </TouchableOpacity>
          </View>
        );
    }
  };

  render() {
    const {HelpActions} = Functions;
    return (
      <ScrollView contentContainerStyle={{flexGrow: 1}} collapsable>
        <TouchableRipple onPress={this.props.onBackToMainScreen}>
          <View style={Style.backButtonContainer}>
            <MaterialIcon
              name="arrow-back"
              size={responsiveWidth(2)}
              color="black"
            />
            <Text style={Style.backButtonText}>Back</Text>
          </View>
        </TouchableRipple>
        {this.renderSearchInput()}
        {this.state.searchingForShop
          ? this.renderLoading()
          : this.renderSearchResults()}
        <View style={Style.needHelp}>
          <Text style={Style.needHelpText}>Need help?</Text>
          <Notice />
          <View style={Style.skipliContact}>
            <TouchableOpacity onPress={() => HelpActions('6789996082')}>
              <View style={[Style.skipliContact]}>
                <PhoneIcon
                  width={responsiveWidth(2)}
                  height={responsiveHeight(2)}
                  fill="black"
                />
                <Text style={Style.contactBtnText}>(678) 999-6082</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => HelpActions('accounts@skiplinow.com')}>
              <View style={[Style.skipliContact]}>
                <SendEmailIcon
                  width={responsiveWidth(2)}
                  height={responsiveHeight(2)}
                  fill="black"
                />
                <Text style={Style.contactBtnText}>accounts@skiplinow.com</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }
}

SearchResults.propTypes = {
  //shopID: PropTypes.string.isRequired,
  shopName: PropTypes.string.isRequired,
  searchBy: PropTypes.string.isRequired,
  onChangeSearchQuery: PropTypes.func.isRequired,
  onChangeSearchType: PropTypes.func.isRequired,
  onBackToMainScreen: PropTypes.func.isRequired,
};
export default withContext(AuthInterfaceConsumer)(SearchResults);
