// BUTI DINERS, INC. All right Reserved ©
/* eslint-disable */

// Regular expressions can be found here: http://regexlib.com/Search.aspx?k=phone

const DATE_OF_BIRTH = /^(((0)[0-9])|((1)[0-2]))(\/)([0-2][0-9]|(3)[0-1])(\/)\d{4}$/;
const US_PHONE_NUMBER = /^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})$/;
const EMAIL = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
const POSTAL_CODE = /^[0-9]{5}([- /]?[0-9]{4})?$/;
const US_STATES = /^((A[LKSZR])|(C[AOT])|(D[EC])|(F[ML])|(G[AU])|(HI)|(I[DLNA])|(K[SY])|(LA)|(M[EHDAINSOT])|(N[EVHJMYCD])|(MP)|(O[HKR])|(P[WAR])|(RI)|(S[CD])|(T[NX])|(UT)|(V[TIA])|(W[AVIY]))$/;
const LAST_FOUR_DIGITS_OF_SSN = /^[0-9]{4}$/;
const NINE_DIGITS_OF_US_SSN = /^[0-9]{9}$/;
const WEBSITE = /(https?:\/\/)?(www\.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)|(https?:\/\/)?(www\.)?(?!ww)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;

const REGEX = {
  DATE_OF_BIRTH,
  EMAIL,
  LAST_FOUR_DIGITS_OF_SSN,
  NINE_DIGITS_OF_US_SSN,
  POSTAL_CODE,
  US_PHONE_NUMBER,
  US_STATES,
  WEBSITE,
};

export default REGEX;
