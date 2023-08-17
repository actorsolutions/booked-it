import { getCastingNetworksSubmissions } from "@/controllers";
import CN_SUPPORT from "@/support/casting_networks_support";

describe("Casting Networks import or 'scraper' tests", () => {
  it("should return an array of CN audition data", () => {
    const expected = [
      {
        id: "3cbf4040-f870-409b-b0a6-50c480dd5c69",
        repliedAt: "2023-08-16T03:09:02.000Z",
        project: {
          name: "Hisense – The Game Show",
          castingCompany: '"Damian Bao Casting"',
        },
        role: {
          name: "Contestant #4 - The Jeopardy Expert",
          description:
            "Contestant #4 spends their whole life studying game shows and quiz bowls. They most likely would be able to correctly guess the answers on Jeopardy.  Think Ken Jennings types.\n",
        },
        profile: {
          profileMainOrganization: {
            id: 5449,
            name: "Dream Team Talent",
          },
        },
        mediaList: [
          {
            __typename: "MediaResponseItem",
            id: 1685338370,
            isAdditional: false,
            media: {
              __typename: "WfMedia",
              id: 1685338370,
              guid: "f87e7ccc-3be1-11ee-bf14-c535c6b8cec0",
              mediaId: 1685338370,
              fileKey: "f87e7ccc-3be1-11ee-bf14-c535c6b8cec0",
              name: "ZachDeNardi_Scene2",
              url: "https://media.castingnetworks.com/cn-hot/video/upload/f87e7ccc-3be1-11ee-bf14-c535c6b8cec0.mp4",
              thumbnail: null,
            },
          },
          {
            __typename: "MediaResponseItem",
            id: 1685338369,
            isAdditional: false,
            media: {
              __typename: "WfMedia",
              id: 1685338369,
              guid: "f87e67d2-3be1-11ee-bf14-c535c6b8cec0",
              mediaId: 1685338369,
              fileKey: "f87e67d2-3be1-11ee-bf14-c535c6b8cec0",
              name: "ZachDeNardi_Scene1",
              url: "https://media.castingnetworks.com/cn-hot/video/upload/f87e67d2-3be1-11ee-bf14-c535c6b8cec0.mp4",
              thumbnail: null,
            },
          },
        ],
      },
      {
        id: "760f788c-354c-4bf9-b0f5-98bbcd14a86d",
        repliedAt: "2023-07-31T02:53:04.000Z",
        project: {
          name: "Woodoku",
          castingCompany: '"Michael Sanford Casting (LA)"',
        },
        role: {
          name: "Mathematician #1",
          description:
            "Male, 35-45, open to all ethnicities. Real to character looking (could also be attractive but not a model type). Clean cut, NASA-types but not in lab coats. They're more modern scientists/ mathematicians like the NASA types in the film \"Hidden Figures\" . In the scene they're working away diligently on a complex math problem.",
        },
        profile: {
          profileMainOrganization: {
            id: 5449,
            name: "Dream Team Talent",
          },
        },
        mediaList: [
          {
            __typename: "MediaResponseItem",
            id: 1684400344,
            isAdditional: false,
            media: {
              __typename: "WfMedia",
              id: 1684400344,
              guid: "db047c10-2f4c-11ee-8da9-5d42ff20e406",
              mediaId: 1684400344,
              fileKey: "db047c10-2f4c-11ee-8da9-5d42ff20e406",
              name: "ZachDeNardi_Slate",
              url: "https://media.castingnetworks.com/cn-hot/video/upload/db047c10-2f4c-11ee-8da9-5d42ff20e406.mp4",
              thumbnail: null,
            },
          },
          {
            __typename: "MediaResponseItem",
            id: 1684400343,
            isAdditional: false,
            media: {
              __typename: "WfMedia",
              id: 1684400343,
              guid: "db043f52-2f4c-11ee-8da9-5d42ff20e406",
              mediaId: 1684400343,
              fileKey: "db043f52-2f4c-11ee-8da9-5d42ff20e406",
              name: "ZachDeNardi_Excited",
              url: "https://media.castingnetworks.com/cn-hot/video/upload/db043f52-2f4c-11ee-8da9-5d42ff20e406.mp4",
              thumbnail: null,
            },
          },
          {
            __typename: "MediaResponseItem",
            id: 1684400345,
            isAdditional: false,
            media: {
              __typename: "WfMedia",
              id: 1684400345,
              guid: "db04a9b0-2f4c-11ee-8da9-5d42ff20e406",
              mediaId: 1684400345,
              fileKey: "db04a9b0-2f4c-11ee-8da9-5d42ff20e406",
              name: "ZachDeNardi_Subtle",
              url: "https://media.castingnetworks.com/cn-hot/video/upload/db04a9b0-2f4c-11ee-8da9-5d42ff20e406.mp4",
              thumbnail: null,
            },
          },
        ],
      },
      {
        id: "7a1ae5de-3a6e-4749-935c-00cb34ea6e71",
        repliedAt: "2023-07-26T03:11:27.000Z",
        project: {
          name: "KODAK non union",
          castingCompany: "broad-cast",
        },
        role: {
          name: "dad - MUSIC",
          description:
            "MUST MUST BE ABLE TO PLAY THE GUITAR (at least intermediate). \n\nDad types. ",
        },
        profile: {
          profileMainOrganization: {
            id: 9279,
            name: "MGMT Artists",
          },
        },
        mediaList: [
          {
            __typename: "MediaResponseItem",
            id: 1684173080,
            isAdditional: false,
            media: {
              __typename: "WfMedia",
              id: 1684173080,
              guid: "3a28c952-2b61-11ee-abbe-a92e1af3a3c8",
              mediaId: 1684173080,
              fileKey: "3a28c952-2b61-11ee-abbe-a92e1af3a3c8",
              name: "ZachDeNardi_Slate",
              url: "https://media.castingnetworks.com/cn-hot/video/upload/3a28c952-2b61-11ee-abbe-a92e1af3a3c8.mp4",
              thumbnail: null,
            },
          },
          {
            __typename: "MediaResponseItem",
            id: 1684173078,
            isAdditional: false,
            media: {
              __typename: "WfMedia",
              id: 1684173078,
              guid: "3a2883a2-2b61-11ee-abbe-a92e1af3a3c8",
              mediaId: 1684173078,
              fileKey: "3a2883a2-2b61-11ee-abbe-a92e1af3a3c8",
              name: "ZachDeNardi_Sc2_CanvasOnWall",
              url: "https://media.castingnetworks.com/cn-hot/video/upload/3a2883a2-2b61-11ee-abbe-a92e1af3a3c8.mp4",
              thumbnail: null,
            },
          },
          {
            __typename: "MediaResponseItem",
            id: 1684173079,
            isAdditional: false,
            media: {
              __typename: "WfMedia",
              id: 1684173079,
              guid: "3a28c3f8-2b61-11ee-abbe-a92e1af3a3c8",
              mediaId: 1684173079,
              fileKey: "3a28c3f8-2b61-11ee-abbe-a92e1af3a3c8",
              name: "ZachDeNardi_Sc3_GuitarJamming",
              url: "https://media.castingnetworks.com/cn-hot/video/upload/3a28c3f8-2b61-11ee-abbe-a92e1af3a3c8.mp4",
              thumbnail: null,
            },
          },
          {
            __typename: "MediaResponseItem",
            id: 1684173077,
            isAdditional: false,
            media: {
              __typename: "WfMedia",
              id: 1684173077,
              guid: "3a287290-2b61-11ee-abbe-a92e1af3a3c8",
              mediaId: 1684173077,
              fileKey: "3a287290-2b61-11ee-abbe-a92e1af3a3c8",
              name: "ZachDeNardi_Sc1_Photo",
              url: "https://media.castingnetworks.com/cn-hot/video/upload/3a287290-2b61-11ee-abbe-a92e1af3a3c8.mp4",
              thumbnail: null,
            },
          },
        ],
      },
    ];

    const auditions = getCastingNetworksSubmissions();
  });
});
