// BUTI DINERS, INC. All right Reserved ©

const _findSelectedCheckboxOptionIDs = (selectedOptions = {}) =>
  Object.keys(selectedOptions).reduce(
    (result, optionID) =>
      selectedOptions[optionID] === "checked"
        ? result.concat(optionID)
        : result,
    [],
  );

const _findSelectedRadioOptionID = (selectedOptions = {}) =>
  Object.keys(selectedOptions).find(
    optionID => selectedOptions[optionID] === "checked",
  );

export { _findSelectedCheckboxOptionIDs, _findSelectedRadioOptionID };
