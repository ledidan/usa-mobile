// BUTI DINERS, INC. All right Reserved ©

import { _roundNumber } from "utils";

////////////////////////////////////////////////////
// Private functions
///////////////////////////////////////////////////

const CalcTotalUnitPriceBeforeTaxForItem = ({ detailsOfItemInCart = {} }) => {
  const { itemIsOnSale = false, itemSaleRate = 0 } = detailsOfItemInCart;
  const { itemSimpleDescription } = detailsOfItemInCart;
  const itemPrice = parseFloat(itemSimpleDescription.itemPrice || 0);
  let totalUnitPriceBeforeTax =
    itemPrice +
    CalcTotalPriceForModifierGroups(detailsOfItemInCart.modifierGroups);
  const totalUnitPriceBeforeTaxWithoutSale = totalUnitPriceBeforeTax;
  if (itemIsOnSale) {
    totalUnitPriceBeforeTax =
      totalUnitPriceBeforeTax * (1 - parseFloat(itemSaleRate) / 100);
  }
  return {
    totalUnitPriceBeforeTaxWithoutSale: _roundNumber(
      totalUnitPriceBeforeTaxWithoutSale,
    ),
    totalUnitPriceBeforeTax: _roundNumber(totalUnitPriceBeforeTax),
  };
};

const CalcTotalPriceForModifierGroups = (modifierGroups = {}) => {
  const total = Object.keys(modifierGroups).reduce((sum, modifierGroupID) => {
    const { modifiers } = modifierGroups[modifierGroupID];
    return sum + CalcTotalPriceForModifiers(modifiers);
  }, 0);
  return _roundNumber(total);
};

const CalcTotalPriceForModifiers = (modifiers = {}) => {
  const total = Object.keys(modifiers).reduce((sum, modifierID) => {
    const { modifierPrice } = modifiers[modifierID];
    return sum + parseFloat(modifierPrice || 0);
  }, 0);
  return _roundNumber(total);
};

////////////////////////////////////////////////////
// Public functions
///////////////////////////////////////////////////

const _calcTotalPriceBeforeTaxForItem = ({ detailsOfItemInCart = {} }) => {
  const { totalUnitPriceBeforeTax, totalUnitPriceBeforeTaxWithoutSale } =
    CalcTotalUnitPriceBeforeTaxForItem({
      detailsOfItemInCart,
    });
  return {
    totalPriceBeforeTaxWithoutSale: _roundNumber(
      totalUnitPriceBeforeTaxWithoutSale * detailsOfItemInCart.quantity,
    ),
    totalPriceBeforeTax: _roundNumber(
      totalUnitPriceBeforeTax * detailsOfItemInCart.quantity,
    ),
  };
};

const CalcTotalPriceForModifierGroupsReceipt = additions => {
  const { additionsPrice = [] } = additions;
  const totalAdditionsPrice = additionsPrice.reduce(
    (sum, value) => parseFloat(value) + sum,
    0,
  );
  return _roundNumber(totalAdditionsPrice);
};

const CalcTotalUnitPriceBeforeTaxForItemReceipt = ({ itemCtnt = {} }) => {
  const { itemIsOnSale = false, itemSaleRate = 0, price, additions } = itemCtnt;
  const itemPrice = parseFloat(price.replace("$", "") || 0);
  let totalUnitPriceBeforeTax =
    itemPrice + CalcTotalPriceForModifierGroupsReceipt(additions);
  const totalUnitPriceBeforeTaxWithoutSale = totalUnitPriceBeforeTax;
  if (itemIsOnSale) {
    totalUnitPriceBeforeTax =
      totalUnitPriceBeforeTax * (1 - parseFloat(itemSaleRate) / 100);
  }
  return {
    totalUnitPriceBeforeTaxWithoutSale: _roundNumber(
      totalUnitPriceBeforeTaxWithoutSale,
    ),
    totalUnitPriceBeforeTax: _roundNumber(totalUnitPriceBeforeTax),
  };
};
const _calcTotalPriceBeforeTaxForItemReceipt = ({ itemCtnt = {} }) => {
  const { totalUnitPriceBeforeTax, totalUnitPriceBeforeTaxWithoutSale } =
    CalcTotalUnitPriceBeforeTaxForItemReceipt({
      itemCtnt,
    });

  return {
    totalPriceBeforeTaxWithoutSale: _roundNumber(
      totalUnitPriceBeforeTaxWithoutSale * itemCtnt.quantity,
    ),
    totalPriceBeforeTax: _roundNumber(
      totalUnitPriceBeforeTax * itemCtnt.quantity,
    ),
  };
};

const _calSubTotalOfOrder = ({ orderItems }) => {
  const subTotal = Object.entries(orderItems).reduce((result, entry) => {
    const { totalPriceBeforeTax } = _calcTotalPriceBeforeTaxForItem({
      detailsOfItemInCart: entry[1],
    });
    return result + totalPriceBeforeTax;
  }, 0);
  return _roundNumber(subTotal);
};

const _calcSubTotalPlusTax = ({ orderDetails }) => {
  const { feesForBUTI = {}, tipAmount = 0, totalPriceAfterTax } = orderDetails;
  const totalFeesForBUTI = parseFloat(
    Object.values(feesForBUTI).reduce((total, fee) => {
      return total + parseFloat(fee || 0);
    }, 0),
  );
  return _roundNumber(
    parseFloat(totalPriceAfterTax) - totalFeesForBUTI - parseFloat(tipAmount),
  );
};

const _calcTotalItemsCount = ({ orderItems = {} }) =>
  Object.keys(orderItems).reduce((sum, id) => {
    const { quantity = 1 } = orderItems[id];
    return sum + quantity;
  }, 0);

export default {
  _calSubTotalOfOrder,
  _calcSubTotalPlusTax,
  _calcTotalItemsCount,
  _calcTotalPriceBeforeTaxForItem,
  _calcTotalPriceBeforeTaxForItemReceipt,
};
