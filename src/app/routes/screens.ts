export enum Navigators {
  SIGNED_OFF_NAVIGATOR = "SignedOffNavigator",
  SIGNED_IN_NAVIGATOR = "SignedInNavigator",
  TAB_NAVIGATOR = "TabNavigator",
}

export enum SignedOffScreens {
  AUTH = "Auth",
  USER_REGISTER = "UserRegister",
  PASSWORD_RECOVER = "PasswordRecover",
  SEND_RECOVER_TOKEN = "SendRecoverToken",
}

export enum SignedInScreens {
  HOME = "Home",
  TECHNICIANS = "Technicians",
  TECHNICIANS_REGISTER_FORM = "TechnicianRegisterForm",
  TECHNICIANS_UPDATE_FORM = "TechnicianUpdateForm",
  TECHNICIANS_DETAILS = "TechnicianDetails",
  CUSTOMERS = "Customers",
  EQUIPMENTS = "Equipments",
}

export enum SignedInNavigators {
  TECHNICIANS = "TechniciansNavigator",
  CUSTOMERS = "CustomersNavigator",
  EQUIPMENTS = "EquipmentsNavigator",
}
