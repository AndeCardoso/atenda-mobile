export enum Navigators {
  SIGNED_OFF_NAVIGATOR = "SignedOffNavigator",
  SIGNED_IN_NAVIGATOR = "SignedInNavigator",
}

export enum SignedOffScreens {
  AUTH = "Auth",
  COMPANY_REGISTER = "CompanyRegister",
  PASSWORD_RECOVER = "PasswordRecover",
  SEND_RECOVER_TOKEN = "SendRecoverToken",
}

export enum SignedInScreens {
  HOME = "Home",

  CUSTOMERS = "Customers",
  CUSTOMERS_REGISTER_FORM = "CustomerRegisterForm",
  CUSTOMERS_UPDATE_FORM = "CustomerUpdateForm",
  CUSTOMERS_DETAILS = "CustomerDetails",

  TECHNICIANS = "Technicians",
  TECHNICIANS_REGISTER_FORM = "TechnicianRegisterForm",
  TECHNICIANS_UPDATE_FORM = "TechnicianUpdateForm",
  TECHNICIANS_DETAILS = "TechnicianDetails",

  USERS = "Users",
  USERS_REGISTER_FORM = "UserRegisterForm",
  USERS_UPDATE_FORM = "UserUpdateForm",
  USERS_DETAILS = "UserDetails",

  EQUIPMENTS = "Equipments",
}

export enum SignedInNavigators {
  USERS = "UsersNavigator",
  TECHNICIANS = "TechniciansNavigator",
  CUSTOMERS = "CustomersNavigator",
  EQUIPMENTS = "EquipmentsNavigator",
}
