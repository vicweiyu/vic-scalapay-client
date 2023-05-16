interface II18n {
  lang: 'en-AU' | 'en-GB' | 'en-US';
  messages: Map<string, string>;
  errors: Map<string, string>;
}

export const i18n_en_AU: II18n = {
  lang: 'en-AU',

  messages: new Map([
    // Common
    ['TOAST_TITLE_SUCCESS', 'Success'],
    ['TOAST_TITLE_INFO', 'Info'],
    ['TOAST_TITLE_WARNING', 'Warning'],
    ['TOAST_TITLE_ERROR', 'Error'],

    ['BUTTON_BACK', 'Back'],
    ['BUTTON_CONTINUE', 'Continue'],
    ['BUTTON_FINISH', 'Finish'],
    ['BUTTON_CLOSE', 'Close'],
    ['BUTTON_CANCEL', 'Cancel'],
    ['BUTTON_CONFIRM', 'Confirm'],
    ['BUTTON_OK', 'OK'],
    ['BUTTON_CLEAR', 'Clear'],
    ['BUTTON_SAVE', 'Save'],
    ['BUTTON_RETRY', 'Retry'],
    ['BUTTON_SUBMIT', 'Submit'],
    ['BUTTON_NEXT', 'Next'],
    ['BUTTON_ADD', 'Add'],

    // Login
    ['LOGIN_EMAIL_LABEL', 'Email Address *'],
    ['LOGIN_PASSWORD_LABEL', 'Password *'],
    ['LOGIN_BTN_LOGIN', 'Login'],
    ['LOGIN_SIGNUP_TEXT', `Don't have an account? Sign Up`],

    // Logout
    ['LOGOUT_TEXT', `You are safely logged out.`],
    ['LOGOUT_BTN_RELOGIN', 'Login Again'],

    // Registration
    ['REG_TITLE', 'Register a New Account'],
    ['REG_EMAIL_LABEL', 'Email Address *'],
    ['REG_PASSWORD_LABEL', 'Password *'],
    ['REG_BTN_REGISTER', 'Register'],
    ['REG_LOGIN_TEXT', 'Already have an account? Sign in'],
    ['REG_SUCC_CONTEXT', 'Congratulations! Your registration is successful. Click "Login Now" button to login.'],
    ['REG_SUCC_BTN_LOGIN', 'Login Now'],

    // Menu
    ['MENU_HOME', 'Home'],
    ['MENU_ORDER', 'Order'],
    ['MENU_LOGOUT', 'Logout'],

    // Home
    ['HOME_CONTENT', ''],

    // Order
    ['AMOUNT_AMOUNT_LABEL', 'Amount'],
    ['AMOUNT_CURRENCY_LABEL', 'Currency'],

    ['CONSUMER_PHONE_NUMBER_LABEL', 'Phone Number'],
    ['CONSUMER_GIVEN_NAMES_LABEL', 'First Name'],
    ['CONSUMER_SURNAME_LABEL', 'Last Name'],
    ['CONSUMER_EMAIL_LABEL', "Consumer's Email"],

    ['CONTACT_PHONENUMBER_LABEL', 'Phone Number'],
    ['CONTACT_COUNTRY_CODE_LABEL', 'Country Code'],
    ['CONTACT_NAME_LABEL', 'Name'],
    ['CONTACT_POSTCODE_LABEL', 'Postcode'],
    ['CONTACT_SUBURB_LABEL', 'Suburb'],
    ['CONTACT_LINE1_LABEL', 'Line1'],

    ['ITEM_GTIN_LABEL', 'Global Trade Item Number.'],
    ['ITEM_QUANTITY_LABEL', 'Quantity'],
    ['ITEM_NAME_LABEL', 'Name'],
    ['ITEM_CATEGORY_LABEL', 'Category'],
    ['ITEM_SUBCATEGORY_LABEL', 'Subcategory'],
    ['ITEM_SKU_LABEL', 'Stock Keeping Unit code'],
    ['ITEM_BRAND_LABEL', 'Brand'],

    ['DISCOUNT_ITEM_DISPLAYNAME_LABEL', 'Display Name'],

    ['ORDER_STEP_1', 'Consumer'],
    ['ORDER_STEP_2', 'Shipping'],
    ['ORDER_STEP_3', 'Billing'],
    ['ORDER_STEP_4', 'Items'],
    ['ORDER_STEP_5', 'Discounts & Amount'],
    ['ORDER_STEP_6', 'Product & Frequency'],

    ['ORDER_CONSUMER_TITLE', 'Consumer'],
    ['ORDER_BILLING_TITLE', 'Billing'],
    ['ORDER_SHIPPING_TITLE', 'Shipping'],
    ['ORDER_ITEMS_TITLE', 'Items'],
    ['ORDER_DISCOUNTS_ITLE', 'Discounts'],
    ['ORDER_SHIPPING_AMOUNT_TITLE', 'Shipping Amount'],
    ['ORDER_TAX_AMOUNT_TITLE', 'Tax Amount'],
    ['ORDER_PRODUCT_TITLE', 'Product'],
    ['ORDER_FREQUENCY_TITLE', 'Frequency'],
    ['ORDER_ITEMS_CONTENT_PART1', 'You have '],
    ['ORDER_ITEMS_CONTENT_PART2', ' items.'],
    ['ORDER_PRODUCT_PAY_IN_3', 'Receive your order now. Enjoy it and take your time to pay little by little.'],
    [
      'ORDER_PRODUCT_PAY_IN_4',
      'Pay in 4: Receive your order now. Enjoy it and take your time to pay little by little.',
    ],
    [
      'ORDER_PRODUCT_PAY_LATER',
      'Pay Later: Receive your order right away and pay it after 14 days. 0 interest. No explanation needed.',
    ],
    ['ORDER_FREQUENCY_NUMBER', 'Frequency Number'],
    ['ORDER_FREQUENCY_TYPE', 'Frequency Type'],

    ['ORDER_SUCCESS', 'Your order submitted successfully.'],
  ]),

  /**
   * F1000: General Exception
   * F1xxx: Technical Error
   *
   * F2xxx: Business Error - Client
   * F3xxx: Business Error - Server
   *
   * F4xxx: Third Party System Error
   */
  errors: new Map([
    // F1000: General Exception
    ['F1000', 'General Exception.'],

    // F1xxx: Technical Error
    ['F1001', 'Store has not been initialized.'],

    // F2xxx: Business Error - Client
    ['F2001', 'Email address is invalid.'],
    ['F2002', 'Password is invalid.'],
    ['F2003', 'Email address or password is incorrect.'], // TODO

    ['F2101', 'First Name is required.'],
    ['F2102', 'Last Name is required.'],
    ['F2103', 'Email address is invalid.'],

    ['F2104', 'Country Code is invalid.'],
    ['F2105', 'Name is invalid.'],
    ['F2106', 'Postcode is invalid.'],
    ['F2107', 'Line 1 is invalid.'],

    ['F2108', 'Quantity is invalid.'],
    ['F2109', 'Amount is invalid.'],
    ['F2110', 'Name is invalid.'],
    ['F2111', 'Category is invalid.'],
    ['F2112', 'Sku is invalid.'],

    // F3xxx: Business Error - Server

    // F4xxx: Third Party System Error
  ]),
};
