import AdminPage from "pages/admin/AdminPage";
import Homepage from "pages/homepage/Homepage";
import LoginPage from "pages/login/LoginPage";
import AdminHomepage from "pages/adminHomepage/AdminHomepage";
import BannerEditor from "pages/bannerEditor/BannerEditor";
import PageNotFound from "pages/pageNotFound/PageNotFound";
import RoadmapEditor from "pages/roadmapEditor/RoadmapEditor";
import FaqEditor from "pages/faqEditor/FAQEditor";
import TeamEditor from "pages/teamEditor/TeamEditor";
import CollectionsEditor from "pages/collectionsEditor/CollectionsEditor";
import AboutEditor from "pages/aboutEditor/AboutEditor";
import SpotEditor from "pages/spotEditor/SpotEditor";
import SpecsEditor from "pages/specsEditor/SpecsEditor";

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
    },
    {
      path: "about",
      module: <AboutEditor/>,
    },
    {
      path: "roadmap",
      module: <RoadmapEditor/>
    },
    {
      path: "spot",
      module: <SpotEditor/>
    },
    {
      path: "collections",
      module: <CollectionsEditor/>
    },
    {
      path: "the-specs",
      module: <SpecsEditor/>
    }
    // {
    //   path: "faq",
    //   module: <FaqEditor/>
    // },
    // {
    //   path: "team",
    //   module: <TeamEditor/>
    // },
  ]
};