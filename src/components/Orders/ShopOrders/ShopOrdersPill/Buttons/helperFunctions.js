// BUTI DINERS, INC. All right Reserved ©

// ------------------------------------------
// Returns the info of change status button
const _getChangeStatusButton = ({
  checkIcon,
  likeIcon,
  onCloseActiveOrder,
  onConfirmCloseOrder,
  onShowEstimatePrepTimeModal,
  orderCurrentStatus,
  orderDeliveryTypeID,
}) => {
  switch (orderCurrentStatus) {
    case "active":
      return {
        buttonAction: onShowEstimatePrepTimeModal,
        icon: checkIcon,
        loadingText: "Confirming",
        name: "Confirm the order",
        nextStatus: "confirmed",
        text: "Accept",
      };
    case "confirmed":
      return {
        buttonAction:
          orderDeliveryTypeID === "inStore"
            ? onCloseActiveOrder
            : onConfirmCloseOrder,
        icon: likeIcon,
        loadingText: "Closing",
        name: "Close the order",
        nextStatus: "closed",
        text: "Done",
      };
    default:
      return { name: "", text: "" };
  }
};

export { _getChangeStatusButton };
