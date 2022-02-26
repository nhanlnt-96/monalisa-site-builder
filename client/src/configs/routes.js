import AdminPage from "../pages/admin/AdminPage";
import Homepage from "../pages/homepage/Homepage";
import LoginPage from "../pages/login/LoginPage";
import AdminHomepage from "pages/adminHomepage/AdminHomepage";
import BannerEditor from "pages/bannerEditor/BannerEditor";
import PageNotFound from "pages/pageNotFound/PageNotFound";
import InvestmentEditor from "pages/investmentEditor/InvestmentEditor";
import HowWorkEditor from "pages/howWorkEditor/HowWorkEditor";
import RoadmapEditor from "pages/roadmapEditor/RoadmapEditor";
import FaqEditor from "pages/faqEditor/FAQEditor";
import TeamEditor from "pages/teamEditor/TeamEditor";
import CollectionsEditor from "pages/collectionsEditor/CollectionsEditor";

export const mainRoutes = [
  {
    path: "/",
    module: <Homepage/>,
  },
  {
    path: "/login",
    module: <LoginPage/>,
  },
  {
    path: "*",
    module: <PageNotFound/>,
  },
];

export const adminRoutes = {
  path: "/admin",
  module: <AdminPage/>,
  isPrivate: true,
  children: [
    {
      module: <AdminHomepage/>,
    },
    {
      path: "banner",
      module: <BannerEditor/>,
      isShow: true
    },
    // {
    //   path: "about",
    //   module: ,
    // },
    {
      path: "investment",
      module: <InvestmentEditor/>,
    },
    {
      path: "how-it-works",
      module: <HowWorkEditor/>
    },
    {
      path: "roadmap",
      module: <RoadmapEditor/>
    },
    {
      path: "faq",
      module: <FaqEditor/>
    },
    {
      path: "team",
      module: <TeamEditor/>
    },
    {
      path: "collections",
      module: <CollectionsEditor/>
    }
  ]
};