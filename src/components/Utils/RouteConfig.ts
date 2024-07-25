interface RouteConfig {
    route: string;
    key: string;
}

const routeConfig: { [key:string] : RouteConfig} = {
    Advertisement: {
        route:"Advertisement",
        key:"advertisements",
    },
    ConstituentDocument: {
        route: "ConstituentDocument",
        key: "constituentDocuments",
      },   
      CouncilMember: {
        route: "CouncilMember",
        key: "councilMembers",
      },
      CouncilMemberUniversityPosition: {
        route: "CouncilMemberUniversityPosition",
        key: "councilMemberUniversityPosition",
      },
      CouncilPosition: {
        route: "CouncilPosition",
        key: "councilPositions",
      },
      Council: {
        route: "Council",
        key: "councils",
      },
      InformationDocument: {
        route: "InformationDocument",
        key: "informationDocuments",
      },
      InformationDocumentType: {
        route: "InformationDocumentType",
        key: "informationDocumentType",
      },
      News: {
        route: "News",
        key: "news",
      },
      University: {
        route: "University",
        key: "universities",
      },
      WorkPlan: {
        route: "WorkPlan",
        key: "workPlan",
      }
}

export default routeConfig;