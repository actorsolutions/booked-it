// /api/Audition controllers
export {
  getAuditions,
  addAudition,
  getAudition,
  updateAudition,
  deleteAudition,
  addAuditions,
} from "./auditions";
export { registerOrSignInUser } from "./users";
export {
  getActorAccessSubmissions,
  checkAALogin,
} from "./scrapers/actorsaccess";
export { getCastingNetworksSubmissions } from "./scrapers/castingnetworks";
