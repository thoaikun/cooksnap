import { IProfile } from "@/Model/profile";
import { RootState } from ".";

export const profileSelector = (state: RootState): IProfile => state.profileStore;