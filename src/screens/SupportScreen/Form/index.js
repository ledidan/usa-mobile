import React from 'react';
import {View, Text} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {TextInput as PaperInput, Headline, Button} from 'react-native-paper';

//icon
import MaterialComIcon from 'react-native-vector-icons/MaterialCommunityIcons';

//field
import {DateRangePicker, TimePicker, Dropdown, Input} from 'fields';
const {TextInput} = Input;
// Components
import {InfoCard} from 'components';
//style
import colors from 'styles/_variables';
import Style from '../style';
import {responsiveWidth} from 'react-native-responsive-dimensions';
const ISSUES = [
  {value: 'Manage orders', label: 'Manage Orders'},
  {value: 'Connect with printers', label: 'Connect with printers'},
  {value: 'Payment', label: 'Payment'},
  {value: 'Refund', label: 'Refund'},
  {value: 'Others', label: 'Others'},
];

const Form = props => {
  const {
    isReport,
    timeZone,
    name,
    issue,
    openDD,
    phoneNumber,
    desc,
    onSelectDate = () => {},
    onSelectTime = () => {},
    onChangePhoneNumber = () => {},
    onChangeDesc = () => {},
    onSelectIssue = () => {},
    onSendRequestToSkipli = () => {},
  } = props;
  const iconSize = responsiveWidth(2.5);
  const renderDDIssues = () => {
    return (
      <Dropdown
        label="You have issue with..."
        data={ISSUES}
        mode="outlined"
        value={issue}
        visible={openDD}
        onValueChange={onSelectIssue}
        inputStyle={Style.textInput}
        dropDownStyle={{marginTop: '3%', borderRadius: 0, width: '100%'}}
        outlineColor={colors.grey_medium}
      />
    );
  };
  return (
    <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
      <InfoCard
        cardConfig={{
          title: isReport ? "Report an Issue" : "Request a Meeting",
          subtitle: isReport
            ? "Briefly describe the issue you're experiencing"
            : "Let us know when you're available",
        }}
        useCustomContent={true}>
        <View 
          style={{ paddingBottom: "10%", width: "100%" }}>
          {!isReport && (
            <React.Fragment>
              <TextInput
                mode="outlined"
                label="Your Store"
                disabled
                value={name}
                containerStyle={[Style.textInput]}
                right={
                  <PaperInput.Icon
                    name={({color}) => (
                      <MaterialComIcon
                        name="store-outline"
                        color={color}
                        size={iconSize}
                      />
                    )}
                  />
                }
              />
              <TextInput
                mode="outlined"
                label="Timezone"
                disabled
                value={timeZone}
                containerStyle={[Style.textInput]}
                right={
                  <PaperInput.Icon
                    name={({color}) => (
                      <MaterialComIcon
                        name="web-clock"
                        color={color}
                        size={iconSize}
                      />
                    )}
                  />
                }
              />
              <DateRangePicker
                mode="single"
                onChange={onSelectDate}
                inputStyle={[Style.textInput, { borderColor: colors.info }]}
                rightIconSize={iconSize}
                outlineColor={colors.grey_medium}
              />
              <TimePicker
                onChange={onSelectTime}
                inputStyle={[Style.textInput, { borderColor: colors.info }]}
                outlineColor={colors.grey_medium}
              />
            </React.Fragment>
          )}
          <TextInput
            mode="outlined"
            label="Phone number"
            keyboardType="phone-pad"
            value={phoneNumber}
            onChangeText={onChangePhoneNumber}
            containerStyle={[Style.textInput]}
            numberOfLines={10}
            outlineColor={colors.grey_medium}
            right={
              <PaperInput.Icon
                name={({ color }) => (
                  <MaterialComIcon name="phone" color={color} size={iconSize} />
                )}
              />
            }
          />
          {renderDDIssues()}
          <TextInput
            mode="outlined"
            type="textarea"
            numberOfLines={7}
            multiline={true}
            label="Description"
            value={desc}
            onChangeText={onChangeDesc}
            containerStyle={[Style.textInput, Style.descBox]}
            outlineColor={colors.grey_medium}
          />
          <View style={Style.issueButtonContainer}>
            <Button
              icon="arrow-right"
              mode="contained"
              style={Style.issueBtn}
              labelStyle={Style.btnLabel}
              contentStyle={{flexDirection: 'row-reverse' }}
              onPress={onSendRequestToSkipli}>
              Submit
            </Button>
          </View>
        </View>
      </InfoCard>
    </KeyboardAwareScrollView>
  );
};

export default Form;
