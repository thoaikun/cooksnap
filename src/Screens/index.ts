import { LocalizationKey, i18n } from '@/Localization';

export enum RootScreens {
  MAIN = "Main",
  WELCOME = "Welcome",
  LOGIN = "Login",
  SIGN_UP = "Register",
  FORGOT_PASSWORD = "ForgotPassword",
  SNAP = "Snap",
  FAVORITE_DETAIL = "FavoriteDetail", 
  DISH_DETAIL = "DishDetail",
  BREAKFAST = i18n.t(LocalizationKey.BREAKFAST),
  LUNCH = i18n.t(LocalizationKey.LUNCH),
  SNACK = i18n.t(LocalizationKey.SNACK),
}

export enum MainScreens {
  HOME = "Home",
  PROFILE = "Profile",
  FAVORITE = "Favorite",
  SEARCH = "Search",
  SNAP_PLACEHOLDER = "SnapPlaceholder",
}
