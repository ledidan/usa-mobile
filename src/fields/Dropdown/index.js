import * as React from 'react';
import PropTypes from 'prop-types';
import {View, TouchableOpacity, FlatList} from 'react-native';
import {Menu, withTheme, TextInput as PaperInput} from 'react-native-paper';

//field
import Input from '../Input';
const {TextInput} = Input;

//icon
import MaterialComIcon from 'react-native-vector-icons/MaterialCommunityIcons';

//style
import colors from 'styles/_variables';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
class Dropdown extends React.Component {
  state = {
    visible: false,
    label: '',
    inputLayout: {
      width: 0,
      height: 0,
      x: 0,
      y: 0,
    },
  };
  onOpenDDMenu = () => this.setState({visible: true});
  onCloseDDMenu = () =>
    this.setState({visible: false}, () => console.log('close'));
  onChangeLayout = layoutEvent => {
    this.setState({inputLayout: layoutEvent.nativeEvent.layout});
  };

  componentDidUpdate(prevProps, prevState) {
    const {data, value} = prevProps;
    if (this.props.data !== data || this.props.value !== value) {
      const item = this.props.data.find(
        item => item.value === this.props.value,
      );
      if (item) {
        this.setState({label: item.label});
      }
    }
  }

  renderItem = ({item}) => {
    const {theme} = this.props;
    return (
      <Menu.Item
        titleStyle={{
          color: this.props.value === item.value && theme.colors.primary,
          fontWeight: this.props.value === item.value ? 'bold' : 'normal',
          fontSize: responsiveFontSize(1.2),
        }}
        onPress={() => {
          this.props.onValueChange(item.value);
          this.onCloseDDMenu();
        }}
        title={item.custom || item.label}
        style={{
          maxWidth: this.state.inputLayout.width,
          backgroundColor:
            this.props.value === item.value && colors.primary_light,
          height: responsiveHeight(7),
          ...this.props.dropDownItemStyle,
        }}
      />
    );
  };
  render() {
    const {
      value,
      mode,
      label,
      data,
      inputStyle,
      onValueChange,
      placeholder,
      dropDownContainerMaxHeight,
      dropDownStyle,
      dropDownContainerStyle,
      dropDownItemStyle,
      theme,
      ...rest
    } = this.props;
    const {inputLayout} = this.state;
    return (
      <Menu
        theme={theme}
        visible={this.state.visible}
        onDismiss={this.onCloseDDMenu}
        contentStyle={[dropDownContainerStyle]}
        style={[
          {
            maxWidth: inputLayout?.width,
            width: inputLayout?.width,
            marginTop: inputLayout?.height,
          },
          dropDownStyle,
        ]}
        anchor={
          <TouchableOpacity
            onPress={this.onOpenDDMenu}
            onLayout={this.onChangeLayout}>
            <View pointerEvents={'none'}>
              <TextInput
                value={value && this.state.label}
                mode={mode}
                label={label || 'Select a value'}
                placeholder={placeholder}
                pointerEvents={'none'}
                right={
                  <PaperInput.Icon
                    name={({color}) => (
                      <MaterialComIcon
                        name="menu-down"
                        color={color}
                        size={this.props.rightIconSize || responsiveHeight(5)}
                      />
                    )}
                  />
                }
                theme
                containerStyle={inputStyle}
                {...rest}
              />
            </View>
          </TouchableOpacity>
        }>
        <FlatList
          keyExtractor={({ label }) => label}
          data={data}
          style={{
            maxHeight: dropDownContainerMaxHeight || responsiveHeight(20),
          }}
          renderItem={this.renderItem}
        />
      </Menu>
    );
  }
}
Dropdown.propTypes = {
  value: PropTypes.string.isRequired,
  mode: PropTypes.string,
  label: PropTypes.string,
  data: PropTypes.array.isRequired,
  inputStyle: PropTypes.shape(),
  onValueChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  dropDownContainerMaxHeight: PropTypes.shape(),
  dropDownStyle: PropTypes.shape(),
  dropDownContainerStyle: PropTypes.shape(),
  dropDownItemStyle: PropTypes.shape(),
};
Dropdown.defaultProps = {
  mode: 'flat',
  label: 'Select a value',
  onValueChange: () => {},
};
export default withTheme(Dropdown);
