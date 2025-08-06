const _filterDuplicatePrinter = ({
  addedPrinters = {},
  address = "",
  printerName = "",
  connectType,
}) => {
  let isDuplicate = false;
  //Only validate the selected printer with printers that has them same selected connectType
  Object.values(addedPrinters).forEach(printer => {
    if (printer.connectType === connectType) {
      if (connectType === "lan") {
        if (
          printer.ipAddress === address &&
          printer.printerName.toLowerCase() === printerName.toLowerCase()
        ) {
          isDuplicate = true;
          return;
        }
      } else {
        if (
          printer.macAddress === address &&
          printer.printerName.toLowerCase() === printerName.toLowerCase()
        ) {
          isDuplicate = true;
          return;
        }
      }
    }
  });
  return isDuplicate;
};
const _filterDuplicateIP = ({
  addedPrinters = {},
  address = "",
  connectType,
}) => {
  let isDuplicate = false;
  //Only validate the selected printer with printers that has them same selected connectType
  Object.values(addedPrinters).forEach(printer => {
    if (printer.connectType === connectType) {
      if (connectType === "lan") {
        if (printer.ipAddress === address) {
          isDuplicate = true;
          return;
        }
      }
    }
  });
  return isDuplicate;
};
export { _filterDuplicatePrinter, _filterDuplicateIP };
