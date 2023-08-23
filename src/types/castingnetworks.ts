export interface MediaResponseItemContent {
  __typename: string;
  id: number;
  guid: string;
  mediaId: number;
  fileKey: string;
  name: string;
  url: string;
  thumbnail: null;
}

export interface MediaResponseItem {
  __typename: string;
  id: number;
  isAdditional: boolean;
  media: MediaResponseItemContent;
}

export interface ProfileMainOrganization {
  id: number;
  name: string;
}

export interface AuditionRole {
  name: string;
  role: string;
}

export interface AuditionProject {
  name: string;
  castingCompany: string;
}

export interface CNAuditionObj {
  id: string;
  repliedAt: string;
  project: AuditionProject;
  role: AuditionRole;
  profile: ProfileMainOrganization;
  mediaList: MediaResponseItem[];
}

export interface CNAuditionsContainer {
  page: number;
  totalCount: number;
  totalPages: number;
  data: CNAuditionObj[];
}

export interface CNResponseData {
  auditions: CNAuditionsContainer;
}

export interface CNResponseObj {
  message: string;
  data: CNResponseData;
}
